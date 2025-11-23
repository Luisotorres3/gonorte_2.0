import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { 
  FaDumbbell, 
  FaUsers, 
  FaChartLine, 
  FaTrophy, 
  FaFire, 
  FaArrowLeft,
  FaCalendarAlt,
  FaCheck,
  FaTimes,
  FaUserCheck,
  FaUserClock
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface ClientProgress {
  uid: string;
  displayName: string;
  email: string;
  assignedPlanId: string;
  planName: string;
  totalSessions: number;
  totalExercisesCompleted: number;
  averageCompletion: number;
  lastSessionDate: any;
  streakDays: number;
  isActive: boolean;
}

interface PlanStats {
  planId: string;
  planName: string;
  assignedCount: number;
  activeCount: number;
  averageCompletion: number;
}

const CoachAnalyticsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'es';
  const { currentUser, userRole } = useAuth();
  
  const [clients, setClients] = useState<ClientProgress[]>([]);
  const [plans, setPlans] = useState<Record<string, any>>({});
  const [planStats, setPlanStats] = useState<PlanStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'all'>('month');

  useEffect(() => {
    fetchAnalytics();
  }, [currentUser, selectedTimeframe]);

  const fetchAnalytics = async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Fetch all clients
      const usersRef = collection(db, 'users');
      const clientsQuery = query(usersRef, where('role', '==', 'client'), orderBy('displayName'));
      const clientsSnapshot = await getDocs(clientsQuery);
      
      // Fetch all plans
      const plansRef = collection(db, 'trainingPlans');
      const plansSnapshot = await getDocs(plansRef);
      
      const plansData: Record<string, any> = {};
      plansSnapshot.docs.forEach(doc => {
        plansData[doc.id] = { id: doc.id, ...doc.data() };
      });
      setPlans(plansData);
      
      // Process client data
      const clientsData: ClientProgress[] = [];
      const planStatsMap: Record<string, PlanStats> = {};
      
      for (const clientDoc of clientsSnapshot.docs) {
        const clientData = clientDoc.data();
        const clientProgress = await calculateClientProgress(clientDoc.id, clientData, plansData);
        clientsData.push(clientProgress);
        
        // Update plan stats
        if (clientData.assignedPlanId) {
          const planId = clientData.assignedPlanId;
          if (!planStatsMap[planId]) {
            planStatsMap[planId] = {
              planId,
              planName: plansData[planId]?.name || planId,
              assignedCount: 0,
              activeCount: 0,
              averageCompletion: 0,
              totalCompletion: 0
            };
          }
          
          planStatsMap[planId].assignedCount++;
          if (clientProgress.isActive) {
            planStatsMap[planId].activeCount++;
          }
          planStatsMap[planId].totalCompletion += clientProgress.averageCompletion;
        }
      }
      
      // Calculate average completion for plans
      Object.values(planStatsMap).forEach(plan => {
        if (plan.assignedCount > 0) {
          plan.averageCompletion = Math.round(plan.totalCompletion / plan.assignedCount);
        }
        delete plan.totalCompletion;
      });
      
      setClients(clientsData);
      setPlanStats(Object.values(planStatsMap));
      
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError(t('coachAnalytics.errorFetching', 'Error al cargar las analíticas'));
    } finally {
      setLoading(false);
    }
  };

  const calculateClientProgress = async (clientId: string, clientData: any, plansData: Record<string, any>): Promise<ClientProgress> => {
    const trainingProgress = clientData.trainingProgress || {};
    const sessions = Object.values(trainingProgress);
    
    // Filter sessions by timeframe
    const now = new Date();
    const filteredSessions = sessions.filter((session: any) => {
      const sessionDate = session.date.toDate();
      switch (selectedTimeframe) {
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return sessionDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return sessionDate >= monthAgo;
        default:
          return true;
      }
    });
    
    const totalSessions = filteredSessions.length;
    const totalExercisesCompleted = filteredSessions.reduce((total: number, session: any) => 
      total + session.completedExercises.length, 0
    );
    
    let averageCompletion = 0;
    if (totalSessions > 0 && clientData.assignedPlanId) {
      const plan = plansData[clientData.assignedPlanId];
      if (plan && plan.exercises.length > 0) {
        const totalPossible = totalSessions * plan.exercises.length;
        averageCompletion = Math.round((totalExercisesCompleted / totalPossible) * 100);
      }
    }
    
    const lastSessionDate = filteredSessions.length > 0 
      ? filteredSessions[0].date 
      : null;
    
    const streakDays = calculateStreakDays(sessions);
    const isActive = lastSessionDate && 
      (now.getTime() - lastSessionDate.toDate().getTime()) < 7 * 24 * 60 * 60 * 1000; // Active if session in last 7 days
    
    return {
      uid: clientId,
      displayName: clientData.displayName || 'Sin nombre',
      email: clientData.email || '',
      assignedPlanId: clientData.assignedPlanId || '',
      planName: clientData.assignedPlanId ? (plansData[clientData.assignedPlanId]?.name || clientData.assignedPlanId) : 'Sin plan',
      totalSessions,
      totalExercisesCompleted,
      averageCompletion,
      lastSessionDate,
      streakDays,
      isActive
    };
  };

  const calculateStreakDays = (sessions: any[]): number => {
    if (sessions.length === 0) return 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let streak = 0;
    let currentDate = new Date(today);
    
    while (true) {
      const hasSessionOnDate = sessions.some((session: any) => {
        const sessionDate = session.date.toDate();
        sessionDate.setHours(0, 0, 0, 0);
        return sessionDate.getTime() === currentDate.getTime();
      });
      
      if (hasSessionOnDate) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    return streak;
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Nunca';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getOverallStats = () => {
    const totalClients = clients.length;
    const activeClients = clients.filter(c => c.isActive).length;
    const totalSessions = clients.reduce((sum, c) => sum + c.totalSessions, 0);
    const averageCompletion = totalClients > 0 
      ? Math.round(clients.reduce((sum, c) => sum + c.averageCompletion, 0) / totalClients)
      : 0;
    
    return { totalClients, activeClients, totalSessions, averageCompletion };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 transition-colors duration-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">{t('loading', 'Cargando...')}</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 transition-colors duration-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaTimes className="w-12 h-12 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-3xl font-bold text-text-default-light dark:text-text-default-dark mb-4">
              {t('coachAnalytics.errorTitle', 'Error al cargar las analíticas')}
            </h1>
            <p className="text-lg text-text-muted-light dark:text-text-muted-dark mb-8">
              {error}
            </p>
            <button
              onClick={fetchAnalytics}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium rounded-xl transition-all duration-300"
            >
              <FaChartLine className="mr-2" />
              {t('common.retry', 'Reintentar')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stats = getOverallStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 transition-colors duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <FaChartLine className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-default-light dark:text-text-default-dark">
                  {t('coachAnalytics.title', 'Analíticas de Clientes')}
                </h1>
                <p className="text-lg text-text-muted-light dark:text-text-muted-dark">
                  {t('coachAnalytics.subtitle', 'Progreso y estadísticas de tus clientes')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value as any)}
                className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl text-text-default-light dark:text-text-default-dark focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 transition-all duration-300"
              >
                <option value="week">{t('coachAnalytics.timeframe.week', 'Esta Semana')}</option>
                <option value="month">{t('coachAnalytics.timeframe.month', 'Este Mes')}</option>
                <option value="all">{t('coachAnalytics.timeframe.all', 'Todo el Tiempo')}</option>
              </select>
              
              <Link
                to={`/${currentLang}/${t('routes.dashboard')}/coach`}
                className="px-4 py-2 bg-white dark:bg-slate-800 text-text-default-light dark:text-text-default-dark font-medium rounded-xl transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
              >
                <FaArrowLeft className="mr-2" />
                {t('common.back', 'Volver')}
              </Link>
            </div>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl transition-colors duration-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
                  {t('coachAnalytics.stats.totalClients', 'Total Clientes')}
                </p>
                <p className="text-2xl font-bold text-text-default-light dark:text-text-default-dark">
                  {stats.totalClients}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <FaUsers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl transition-colors duration-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
                  {t('coachAnalytics.stats.activeClients', 'Clientes Activos')}
                </p>
                <p className="text-2xl font-bold text-text-default-light dark:text-text-default-dark">
                  {stats.activeClients}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <FaUserCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl transition-colors duration-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
                  {t('coachAnalytics.stats.totalSessions', 'Sesiones Totales')}
                </p>
                <p className="text-2xl font-bold text-text-default-light dark:text-text-default-dark">
                  {stats.totalSessions}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <FaDumbbell className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl transition-colors duration-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
                  {t('coachAnalytics.stats.averageCompletion', 'Promedio Completado')}
                </p>
                <p className="text-2xl font-bold text-text-default-light dark:text-text-default-dark">
                  {stats.averageCompletion}%
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                <FaTrophy className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Plan Statistics */}
        {planStats.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-text-default-light dark:text-text-default-dark mb-6">
              {t('coachAnalytics.planStats.title', 'Estadísticas por Plan')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {planStats.map((plan) => (
                <div key={plan.planId} className="border border-gray-200 dark:border-slate-600 rounded-xl p-4">
                  <h3 className="font-semibold text-text-default-light dark:text-text-default-dark mb-3">
                    {plan.planName}
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted-light dark:text-text-muted-dark">
                        {t('coachAnalytics.planStats.assigned', 'Asignado')}:
                      </span>
                      <span className="font-medium text-text-default-light dark:text-text-default-dark">
                        {plan.assignedCount}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted-light dark:text-text-muted-dark">
                        {t('coachAnalytics.planStats.active', 'Activos')}:
                      </span>
                      <span className="font-medium text-text-default-light dark:text-text-default-dark">
                        {plan.activeCount}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted-light dark:text-text-muted-dark">
                        {t('coachAnalytics.planStats.avgCompletion', 'Promedio')}:
                      </span>
                      <span className="font-medium text-text-default-light dark:text-text-default-dark">
                        {plan.averageCompletion}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Client Progress Table */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-text-default-light dark:text-text-default-dark mb-6">
            {t('coachAnalytics.clientProgress.title', 'Progreso de Clientes')}
          </h2>
          
          {clients.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUsers className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-medium text-text-default-light dark:text-text-default-dark mb-2">
                {t('coachAnalytics.noClients', 'No hay clientes registrados')}
              </h3>
              <p className="text-text-muted-light dark:text-text-muted-dark">
                {t('coachAnalytics.noClientsDescription', 'Los clientes aparecerán aquí cuando se registren')}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-600">
                <thead className="bg-gray-50 dark:bg-slate-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">
                      {t('coachAnalytics.table.client', 'Cliente')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">
                      {t('coachAnalytics.table.plan', 'Plan')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">
                      {t('coachAnalytics.table.sessions', 'Sesiones')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">
                      {t('coachAnalytics.table.completion', 'Completado')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">
                      {t('coachAnalytics.table.streak', 'Racha')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">
                      {t('coachAnalytics.table.lastSession', 'Última Sesión')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">
                      {t('coachAnalytics.table.status', 'Estado')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-600">
                  {clients.map((client) => (
                    <tr key={client.uid} className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-text-default-light dark:text-text-default-dark">
                            {client.displayName}
                          </div>
                          <div className="text-sm text-text-muted-light dark:text-text-muted-dark">
                            {client.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-default-light dark:text-text-default-dark">
                        {client.planName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-default-light dark:text-text-default-dark">
                        {client.totalSessions}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          client.averageCompletion >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                          client.averageCompletion >= 60 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        }`}>
                          {client.averageCompletion}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-default-light dark:text-text-default-dark">
                        <div className="flex items-center">
                          <FaFire className="w-4 h-4 text-orange-500 mr-1" />
                          {client.streakDays} {t('coachAnalytics.table.days', 'días')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted-light dark:text-text-muted-dark">
                        {formatDate(client.lastSessionDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          client.isActive 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                        }`}>
                          {client.isActive ? (
                            <>
                              <FaUserCheck className="w-3 h-3 mr-1" />
                              {t('coachAnalytics.table.active', 'Activo')}
                            </>
                          ) : (
                            <>
                              <FaUserClock className="w-3 h-3 mr-1" />
                              {t('coachAnalytics.table.inactive', 'Inactivo')}
                            </>
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoachAnalyticsPage; 