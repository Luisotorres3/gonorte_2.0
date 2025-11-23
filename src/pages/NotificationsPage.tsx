import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { collection, getDocs, updateDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { 
  FaBell, 
  FaCheck, 
  FaTrash, 
  FaArrowLeft,
  FaEnvelope,
  FaExclamationTriangle,
  FaInfoCircle,
  FaCheckCircle,
  FaClock
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: any;
  actionUrl?: string;
  actionText?: string;
}

const NotificationsPage: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  useEffect(() => {
    fetchNotifications();
  }, [currentUser]);

  const fetchNotifications = async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const notificationsRef = collection(db, 'notifications');
      const q = query(
        notificationsRef, 
        where('userId', '==', currentUser.uid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const notificationsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Notification));
      
      setNotifications(notificationsData);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError(t('notifications.errorFetching', 'Error al cargar las notificaciones'));
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const notificationRef = doc(db, 'notifications', notificationId);
      await updateDoc(notificationRef, {
        read: true,
        updatedAt: serverTimestamp()
      });
      await fetchNotifications();
    } catch (err) {
      console.error('Error marking notification as read:', err);
      setError(t('notifications.errorMarkingRead', 'Error al marcar como leída'));
    } finally {
      setLoading(false);
    }
  };

  const markAllAsRead = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const unreadNotifications = notifications.filter(n => !n.read);
      const updatePromises = unreadNotifications.map(notification => {
        const notificationRef = doc(db, 'notifications', notification.id);
        return updateDoc(notificationRef, {
          read: true,
          updatedAt: serverTimestamp()
        });
      });
      
      await Promise.all(updatePromises);
      await fetchNotifications();
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
      setError(t('notifications.errorMarkingAllRead', 'Error al marcar todas como leídas'));
    } finally {
      setLoading(false);
    }
  };

  const deleteNotification = async (notificationId: string) => {
    if (!confirm(t('notifications.confirmDelete', '¿Estás seguro de que quieres eliminar esta notificación?'))) {
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      await deleteDoc(doc(db, 'notifications', notificationId));
      await fetchNotifications();
    } catch (err) {
      console.error('Error deleting notification:', err);
      setError(t('notifications.errorDeleting', 'Error al eliminar la notificación'));
    } finally {
      setLoading(false);
    }
  };

  const clearAllRead = async () => {
    if (!confirm(t('notifications.confirmClearAll', '¿Estás seguro de que quieres eliminar todas las notificaciones leídas?'))) {
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const readNotifications = notifications.filter(n => n.read);
      const deletePromises = readNotifications.map(notification => {
        return deleteDoc(doc(db, 'notifications', notification.id));
      });
      
      await Promise.all(deletePromises);
      await fetchNotifications();
    } catch (err) {
      console.error('Error clearing read notifications:', err);
      setError(t('notifications.errorClearing', 'Error al eliminar las notificaciones leídas'));
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <FaExclamationTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <FaTimes className="w-5 h-5 text-red-500" />;
      case 'info':
      default:
        return <FaInfoCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'error':
        return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      case 'info':
      default:
        return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  const formatDateTime = (timestamp: any) => {
    if (!timestamp) return 'Fecha no disponible';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return t('notifications.justNow', 'Justo ahora');
    } else if (diffInHours < 24) {
      return t('notifications.hoursAgo', 'Hace {{hours}} horas', { hours: diffInHours });
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return t('notifications.daysAgo', 'Hace {{days}} días', { days: diffInDays });
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const readCount = notifications.filter(n => n.read).length;

  if (loading && notifications.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 transition-colors duration-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">{t('loading', 'Cargando...')}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 transition-colors duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <FaBell className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-default-light dark:text-text-default-dark">
                  {t('notifications.title', 'Notificaciones')}
                </h1>
                <p className="text-lg text-text-muted-light dark:text-text-muted-dark">
                  {t('notifications.subtitle', 'Mantente al día con tus alertas y mensajes')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
                >
                  <FaCheck className="mr-2" />
                  {t('notifications.markAllRead', 'Marcar Todo como Leído')}
                </button>
              )}
              
              {readCount > 0 && (
                <button
                  onClick={clearAllRead}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-text-default-light dark:text-text-default-dark font-medium rounded-xl transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
                >
                  <FaTrash className="mr-2" />
                  {t('notifications.clearRead', 'Limpiar Leídas')}
                </button>
              )}
              
              <Link
                to="/dashboard/client"
                className="px-4 py-2 bg-white dark:bg-slate-800 text-text-default-light dark:text-text-default-dark font-medium rounded-xl transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
              >
                <FaArrowLeft className="mr-2" />
                {t('common.back', 'Volver')}
              </Link>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 text-sm text-semantic-error-light dark:text-semantic-error-dark bg-semantic-error-light/20 dark:bg-semantic-error-dark/20 rounded-xl border border-semantic-error-light/30 dark:border-semantic-error-dark/30">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl transition-colors duration-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
                  {t('notifications.stats.total', 'Total')}
                </p>
                <p className="text-2xl font-bold text-text-default-light dark:text-text-default-dark">
                  {notifications.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <FaBell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl transition-colors duration-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
                  {t('notifications.stats.unread', 'No Leídas')}
                </p>
                <p className="text-2xl font-bold text-text-default-light dark:text-text-default-dark">
                  {unreadCount}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                <FaEnvelope className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl transition-colors duration-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
                  {t('notifications.stats.read', 'Leídas')}
                </p>
                <p className="text-2xl font-bold text-text-default-light dark:text-text-default-dark">
                  {readCount}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <FaCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 rounded-xl p-1 shadow-lg">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
                filter === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'text-text-muted-light dark:text-text-muted-dark hover:text-text-default-light dark:hover:text-text-default-dark'
              }`}
            >
              {t('notifications.filter.all', 'Todas')} ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
                filter === 'unread'
                  ? 'bg-blue-500 text-white'
                  : 'text-text-muted-light dark:text-text-muted-dark hover:text-text-default-light dark:hover:text-text-default-dark'
              }`}
            >
              {t('notifications.filter.unread', 'No Leídas')} ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
                filter === 'read'
                  ? 'bg-blue-500 text-white'
                  : 'text-text-muted-light dark:text-text-muted-dark hover:text-text-default-light dark:hover:text-text-default-dark'
              }`}
            >
              {t('notifications.filter.read', 'Leídas')} ({readCount})
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaBell className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-medium text-text-default-light dark:text-text-default-dark mb-2">
                {filter === 'all' 
                  ? t('notifications.noNotifications', 'No hay notificaciones')
                  : filter === 'unread'
                  ? t('notifications.noUnread', 'No hay notificaciones sin leer')
                  : t('notifications.noRead', 'No hay notificaciones leídas')
                }
              </h3>
              <p className="text-text-muted-light dark:text-text-muted-dark">
                {filter === 'all' 
                  ? t('notifications.noNotificationsDescription', 'Las notificaciones aparecerán aquí cuando las recibas')
                  : filter === 'unread'
                  ? t('notifications.noUnreadDescription', '¡Excelente! Estás al día con todas tus notificaciones')
                  : t('notifications.noReadDescription', 'Las notificaciones leídas aparecerán aquí')
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-6 rounded-xl border-l-4 transition-all duration-300 ${
                    notification.read 
                      ? 'bg-white dark:bg-slate-700 border-l-gray-300 dark:border-l-gray-600' 
                      : getTypeColor(notification.type)
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="flex-shrink-0 mt-1">
                        {getTypeIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className={`text-lg font-semibold ${
                            notification.read 
                              ? 'text-text-muted-light dark:text-text-muted-dark' 
                              : 'text-text-default-light dark:text-text-default-dark'
                          }`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                        
                        <p className={`text-sm mb-3 ${
                          notification.read 
                            ? 'text-text-muted-light dark:text-text-muted-dark' 
                            : 'text-text-default-light dark:text-text-default-dark'
                        }`}>
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center space-x-4">
                          <span className="text-xs text-text-muted-light dark:text-text-muted-dark flex items-center">
                            <FaClock className="w-3 h-3 mr-1" />
                            {formatDateTime(notification.createdAt)}
                          </span>
                          
                          {notification.actionUrl && notification.actionText && (
                            <Link
                              to={notification.actionUrl}
                              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              {notification.actionText}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                          title={t('notifications.markAsRead', 'Marcar como leída')}
                        >
                          <FaCheck className="w-4 h-4" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title={t('notifications.delete', 'Eliminar')}
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage; 