import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaUser, 
  FaArrowLeft,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCheck,
  FaCalendarDay,
  FaCalendarWeek,
  FaCalendar
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Appointment {
  id: string;
  title: string;
  description?: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  startTime: any;
  endTime: any;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'consultation' | 'training' | 'follow-up' | 'assessment';
  createdBy: string;
  createdAt: any;
  updatedAt: any;
}

interface Client {
  uid: string;
  displayName: string;
  email: string;
  assignedPlanId?: string;
}

const CoachSchedulePage: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [selectedView, setSelectedView] = useState<'day' | 'week' | 'month'>('week');
  
  // Form state
  const [appointmentTitle, setAppointmentTitle] = useState('');
  const [appointmentDescription, setAppointmentDescription] = useState('');
  const [selectedClientId, setSelectedClientId] = useState('');
  const [appointmentType, setAppointmentType] = useState<'consultation' | 'training' | 'follow-up' | 'assessment'>('training');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentStartTime, setAppointmentStartTime] = useState('');
  const [appointmentDuration, setAppointmentDuration] = useState(60);

  useEffect(() => {
    fetchAppointments();
    fetchClients();
  }, [currentUser]);

  const fetchAppointments = async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const appointmentsRef = collection(db, 'appointments');
      const q = query(
        appointmentsRef, 
        where('createdBy', '==', currentUser.uid),
        orderBy('startTime', 'asc')
      );
      const querySnapshot = await getDocs(q);
      
      const appointmentsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Appointment));
      
      setAppointments(appointmentsData);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError(t('coachSchedule.errorFetching', 'Error al cargar las citas'));
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('role', '==', 'client'), orderBy('displayName'));
      const querySnapshot = await getDocs(q);
      
      const clientsData = querySnapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      } as Client));
      
      setClients(clientsData);
    } catch (err) {
      console.error('Error fetching clients:', err);
    }
  };

  const handleCreateAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !selectedClientId) return;

    setLoading(true);
    setError(null);
    
    try {
      const selectedClient = clients.find(c => c.uid === selectedClientId);
      if (!selectedClient) throw new Error('Cliente no encontrado');

      const startDateTime = new Date(`${appointmentDate}T${appointmentStartTime}`);

      const appointmentData = {
        title: appointmentTitle,
        description: appointmentDescription,
        clientId: selectedClientId,
        clientName: selectedClient.displayName || 'Sin nombre',
        clientEmail: selectedClient.email || '',
        startTime: serverTimestamp(),
        endTime: serverTimestamp(),
        status: 'scheduled' as const,
        type: appointmentType,
        createdBy: currentUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await addDoc(collection(db, 'appointments'), appointmentData);
      
      // Reset form
      setAppointmentTitle('');
      setAppointmentDescription('');
      setSelectedClientId('');
      setAppointmentType('training');
      setAppointmentDate('');
      setAppointmentStartTime('');
      setAppointmentDuration(60);
      setShowCreateModal(false);
      
      // Refresh appointments
      await fetchAppointments();
    } catch (err) {
      console.error('Error creating appointment:', err);
      setError(t('coachSchedule.errorCreating', 'Error al crear la cita'));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAppointment) return;

    setLoading(true);
    setError(null);
    
    try {
      const selectedClient = clients.find(c => c.uid === selectedClientId);
      if (!selectedClient) throw new Error('Cliente no encontrado');

      const startDateTime = new Date(`${appointmentDate}T${appointmentStartTime}`);

      const appointmentRef = doc(db, 'appointments', editingAppointment.id);
      await updateDoc(appointmentRef, {
        title: appointmentTitle,
        description: appointmentDescription,
        clientId: selectedClientId,
        clientName: selectedClient.displayName || 'Sin nombre',
        clientEmail: selectedClient.email || '',
        startTime: serverTimestamp(),
        endTime: serverTimestamp(),
        type: appointmentType,
        updatedAt: serverTimestamp()
      });
      
      // Reset form
      setEditingAppointment(null);
      setAppointmentTitle('');
      setAppointmentDescription('');
      setSelectedClientId('');
      setAppointmentType('training');
      setAppointmentDate('');
      setAppointmentStartTime('');
      setAppointmentDuration(60);
      
      // Refresh appointments
      await fetchAppointments();
    } catch (err) {
      console.error('Error updating appointment:', err);
      setError(t('coachSchedule.errorUpdating', 'Error al actualizar la cita'));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAppointment = async (appointmentId: string) => {
    if (!confirm(t('coachSchedule.confirmDelete', '¿Estás seguro de que quieres eliminar esta cita?'))) {
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      await deleteDoc(doc(db, 'appointments', appointmentId));
      await fetchAppointments();
    } catch (err) {
      console.error('Error deleting appointment:', err);
      setError(t('coachSchedule.errorDeleting', 'Error al eliminar la cita'));
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appointmentId: string, newStatus: 'scheduled' | 'completed' | 'cancelled') => {
    setLoading(true);
    setError(null);
    
    try {
      const appointmentRef = doc(db, 'appointments', appointmentId);
      await updateDoc(appointmentRef, {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
      await fetchAppointments();
    } catch (err) {
      console.error('Error updating appointment status:', err);
      setError(t('coachSchedule.errorUpdatingStatus', 'Error al actualizar el estado de la cita'));
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setAppointmentTitle(appointment.title);
    setAppointmentDescription(appointment.description || '');
    setSelectedClientId(appointment.clientId);
    setAppointmentType(appointment.type);
    
    const startDate = appointment.startTime.toDate();
    setAppointmentDate(startDate.toISOString().split('T')[0]);
    setAppointmentStartTime(startDate.toTimeString().slice(0, 5));
    
    const duration = Math.round((appointment.endTime.toDate().getTime() - startDate.getTime()) / 60000);
    setAppointmentDuration(duration);
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setEditingAppointment(null);
    setAppointmentTitle('');
    setAppointmentDescription('');
    setSelectedClientId('');
    setAppointmentType('training');
    setAppointmentDate('');
    setAppointmentStartTime('');
    setAppointmentDuration(60);
    setError(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'consultation':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'training':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300';
      case 'follow-up':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'assessment':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const formatDateTime = (timestamp: any) => {
    if (!timestamp) return 'Fecha no disponible';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getUpcomingAppointments = () => {
    const now = new Date();
    return appointments.filter(appointment => {
      const appointmentDate = appointment.startTime.toDate();
      return appointmentDate >= now && appointment.status === 'scheduled';
    }).slice(0, 5);
  };

  if (loading && appointments.length === 0) {
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
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <FaCalendarAlt className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-default-light dark:text-text-default-dark">
                  {t('coachSchedule.title', 'Calendario de Citas')}
                </h1>
                <p className="text-lg text-text-muted-light dark:text-text-muted-dark">
                  {t('coachSchedule.subtitle', 'Gestiona horarios y citas con tus clientes')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium rounded-xl transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
              >
                <FaPlus className="mr-2" />
                {t('coachSchedule.createAppointment', 'Nueva Cita')}
              </button>
              
              <Link
                to="/dashboard/coach"
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

        {/* View Toggle */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 rounded-xl p-1 shadow-lg">
            <button
              onClick={() => setSelectedView('day')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
                selectedView === 'day'
                  ? 'bg-teal-500 text-white'
                  : 'text-text-muted-light dark:text-text-muted-dark hover:text-text-default-light dark:hover:text-text-default-dark'
              }`}
            >
              <FaCalendarDay className="mr-2" />
              {t('coachSchedule.view.day', 'Día')}
            </button>
            <button
              onClick={() => setSelectedView('week')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
                selectedView === 'week'
                  ? 'bg-teal-500 text-white'
                  : 'text-text-muted-light dark:text-text-muted-dark hover:text-text-default-light dark:hover:text-text-default-dark'
              }`}
            >
              <FaCalendarWeek className="mr-2" />
              {t('coachSchedule.view.week', 'Semana')}
            </button>
            <button
              onClick={() => setSelectedView('month')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
                selectedView === 'month'
                  ? 'bg-teal-500 text-white'
                  : 'text-text-muted-light dark:text-text-muted-dark hover:text-text-default-light dark:hover:text-text-default-dark'
              }`}
            >
              <FaCalendar className="mr-2" />
              {t('coachSchedule.view.month', 'Mes')}
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl transition-colors duration-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
                  {t('coachSchedule.stats.total', 'Total Citas')}
                </p>
                <p className="text-2xl font-bold text-text-default-light dark:text-text-default-dark">
                  {appointments.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <FaCalendarAlt className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl transition-colors duration-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
                  {t('coachSchedule.stats.scheduled', 'Programadas')}
                </p>
                <p className="text-2xl font-bold text-text-default-light dark:text-text-default-dark">
                  {appointments.filter(a => a.status === 'scheduled').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <FaClock className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl transition-colors duration-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
                  {t('coachSchedule.stats.completed', 'Completadas')}
                </p>
                <p className="text-2xl font-bold text-text-default-light dark:text-text-default-dark">
                  {appointments.filter(a => a.status === 'completed').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <FaCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl transition-colors duration-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
                  {t('coachSchedule.stats.clients', 'Clientes Únicos')}
                </p>
                <p className="text-2xl font-bold text-text-default-light dark:text-text-default-dark">
                  {new Set(appointments.map(a => a.clientId)).size}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                <FaUser className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-text-default-light dark:text-text-default-dark mb-6">
            {t('coachSchedule.upcoming', 'Próximas Citas')}
          </h2>
          
          {getUpcomingAppointments().length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCalendarAlt className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-text-muted-light dark:text-text-muted-dark">
                {t('coachSchedule.noUpcoming', 'No hay citas programadas próximamente')}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {getUpcomingAppointments().map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center">
                      <FaUser className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-text-default-light dark:text-text-default-dark">
                        {appointment.title}
                      </h3>
                      <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                        {appointment.clientName} • {formatDateTime(appointment.startTime)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(appointment.type)}`}>
                      {t(`coachSchedule.type.${appointment.type}`, appointment.type)}
                    </span>
                    <button
                      onClick={() => handleStatusChange(appointment.id, 'completed')}
                      className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                      title={t('coachSchedule.markCompleted', 'Marcar como completada')}
                    >
                      <FaCheck className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* All Appointments */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-text-default-light dark:text-text-default-dark mb-6">
            {t('coachSchedule.allAppointments', 'Todas las Citas')}
          </h2>
          
          {appointments.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCalendarAlt className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-medium text-text-default-light dark:text-text-default-dark mb-2">
                {t('coachSchedule.noAppointments', 'No hay citas programadas')}
              </h3>
              <p className="text-text-muted-light dark:text-text-muted-dark mb-6">
                {t('coachSchedule.noAppointmentsDescription', 'Crea tu primera cita para comenzar')}
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium rounded-xl transition-all duration-300"
              >
                <FaPlus className="mr-2" />
                {t('coachSchedule.createFirstAppointment', 'Crear Primera Cita')}
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-600">
                <thead className="bg-gray-50 dark:bg-slate-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">
                      {t('coachSchedule.table.title', 'Título')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">
                      {t('coachSchedule.table.client', 'Cliente')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">
                      {t('coachSchedule.table.date', 'Fecha')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">
                      {t('coachSchedule.table.type', 'Tipo')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">
                      {t('coachSchedule.table.status', 'Estado')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">
                      {t('coachSchedule.table.actions', 'Acciones')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-600">
                  {appointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-text-default-light dark:text-text-default-dark">
                            {appointment.title}
                          </div>
                          {appointment.description && (
                            <div className="text-sm text-text-muted-light dark:text-text-muted-dark">
                              {appointment.description}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-text-default-light dark:text-text-default-dark">
                            {appointment.clientName}
                          </div>
                          <div className="text-sm text-text-muted-light dark:text-text-muted-dark">
                            {appointment.clientEmail}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-default-light dark:text-text-default-dark">
                        {formatDateTime(appointment.startTime)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(appointment.type)}`}>
                          {t(`coachSchedule.type.${appointment.type}`, appointment.type)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {t(`coachSchedule.status.${appointment.status}`, appointment.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => openEditModal(appointment)}
                          className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-1 rounded transition-colors"
                          title={t('coachSchedule.edit', 'Editar')}
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAppointment(appointment.id)}
                          className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded transition-colors"
                          title={t('coachSchedule.delete', 'Eliminar')}
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                        {appointment.status === 'scheduled' && (
                          <button
                            onClick={() => handleStatusChange(appointment.id, 'completed')}
                            className="text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 p-1 rounded transition-colors"
                            title={t('coachSchedule.markCompleted', 'Marcar como completada')}
                          >
                            <FaCheck className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Create/Edit Modal */}
        {(showCreateModal || editingAppointment) && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 dark:bg-black/80 z-50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl m-4">
              <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold text-text-default-light dark:text-text-default-dark">
                  {editingAppointment ? t('coachSchedule.editAppointment', 'Editar Cita') : t('coachSchedule.createAppointment', 'Nueva Cita')}
                </h2>
              </div>

              <form onSubmit={editingAppointment ? handleUpdateAppointment : handleCreateAppointment} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                      {t('coachSchedule.form.title', 'Título de la Cita')}
                    </label>
                    <input
                      type="text"
                      value={appointmentTitle}
                      onChange={(e) => setAppointmentTitle(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                      placeholder={t('coachSchedule.form.titlePlaceholder', 'Ej: Entrenamiento de Fuerza')}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                      {t('coachSchedule.form.type', 'Tipo de Cita')}
                    </label>
                    <select
                      value={appointmentType}
                      onChange={(e) => setAppointmentType(e.target.value as any)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-text-default-light dark:text-text-default-dark focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                    >
                      <option value="consultation">{t('coachSchedule.type.consultation', 'Consulta')}</option>
                      <option value="training">{t('coachSchedule.type.training', 'Entrenamiento')}</option>
                      <option value="follow-up">{t('coachSchedule.type.follow-up', 'Seguimiento')}</option>
                      <option value="assessment">{t('coachSchedule.type.assessment', 'Evaluación')}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                    {t('coachSchedule.form.description', 'Descripción (Opcional)')}
                  </label>
                  <textarea
                    value={appointmentDescription}
                    onChange={(e) => setAppointmentDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder={t('coachSchedule.form.descriptionPlaceholder', 'Detalles adicionales sobre la cita')}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                      {t('coachSchedule.form.client', 'Cliente')}
                    </label>
                    <select
                      value={selectedClientId}
                      onChange={(e) => setSelectedClientId(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-text-default-light dark:text-text-default-dark focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                      required
                    >
                      <option value="">{t('coachSchedule.form.selectClient', 'Seleccionar Cliente')}</option>
                      {clients.map((client) => (
                        <option key={client.uid} value={client.uid}>
                          {client.displayName || 'Sin nombre'} ({client.email})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                      {t('coachSchedule.form.date', 'Fecha')}
                    </label>
                    <input
                      type="date"
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-text-default-light dark:text-text-default-dark focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                      {t('coachSchedule.form.time', 'Hora')}
                    </label>
                    <input
                      type="time"
                      value={appointmentStartTime}
                      onChange={(e) => setAppointmentStartTime(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-text-default-light dark:text-text-default-dark focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                    {t('coachSchedule.form.duration', 'Duración (minutos)')}
                  </label>
                  <select
                    value={appointmentDuration}
                    onChange={(e) => setAppointmentDuration(parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-text-default-light dark:text-text-default-dark focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                  >
                    <option value={30}>30 {t('coachSchedule.form.minutes', 'minutos')}</option>
                    <option value={45}>45 {t('coachSchedule.form.minutes', 'minutos')}</option>
                    <option value={60}>60 {t('coachSchedule.form.minutes', 'minutos')}</option>
                    <option value={90}>90 {t('coachSchedule.form.minutes', 'minutos')}</option>
                    <option value={120}>120 {t('coachSchedule.form.minutes', 'minutos')}</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-text-default-light dark:text-text-default-dark font-medium rounded-xl transition-all duration-300"
                  >
                    {t('common.cancel', 'Cancelar')}
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium rounded-xl transition-all duration-300 flex items-center disabled:opacity-50"
                  >
                    {loading ? t('common.saving', 'Guardando...') : (editingAppointment ? t('common.save', 'Guardar') : t('common.create', 'Crear'))}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoachSchedulePage; 