import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { 
  FaUsers, 
  FaDumbbell, 
  FaChartLine, 
  FaCalendarAlt, 
  FaUserGraduate,
  FaArrowRight,
  FaPlus
} from 'react-icons/fa';

const CoachDashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser, userRole } = useAuth();

  const dashboardCards = [
    {
      id: 'users',
      title: t('dashboard.coach.users.title', 'Gestión de Usuarios'),
      description: t('dashboard.coach.users.description', 'Ver y gestionar todos los usuarios del sistema'),
      icon: <FaUsers className="w-8 h-8" />,
      link: '/admin/users',
      color: 'from-blue-500 to-cyan-600',
      hoverColor: 'from-blue-600 to-cyan-700',
      available: userRole === 'admin' || userRole === 'coach'
    },
    {
      id: 'plans',
      title: t('dashboard.coach.plans.title', 'Planes de Entrenamiento'),
      description: t('dashboard.coach.plans.description', 'Crear y gestionar planes de entrenamiento'),
      icon: <FaDumbbell className="w-8 h-8" />,
      link: '/admin/plans',
      color: 'from-teal-500 to-cyan-600',
      hoverColor: 'from-teal-600 to-cyan-700',
      available: userRole === 'admin' || userRole === 'coach'
    },
    {
      id: 'analytics',
      title: t('dashboard.coach.analytics.title', 'Analíticas'),
      description: t('dashboard.coach.analytics.description', 'Ver estadísticas y progreso de clientes'),
      icon: <FaChartLine className="w-8 h-8" />,
      link: '/analytics',
      color: 'from-purple-500 to-pink-600',
      hoverColor: 'from-purple-600 to-pink-700',
      available: userRole === 'admin' || userRole === 'coach'
    },
    {
      id: 'schedule',
      title: t('dashboard.coach.schedule.title', 'Calendario'),
      description: t('dashboard.coach.schedule.description', 'Gestionar horarios y citas'),
      icon: <FaCalendarAlt className="w-8 h-8" />,
      link: '/dashboard/coach/schedule',
      color: 'from-orange-500 to-red-600',
      hoverColor: 'from-orange-600 to-red-700',
      available: userRole === 'admin' || userRole === 'coach'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 transition-colors duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <FaUserGraduate className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-default-light dark:text-text-default-dark">
                {t('dashboard.coach.title', 'Panel de Coach')}
              </h1>
              <p className="text-lg text-text-muted-light dark:text-text-muted-dark">
                {t('dashboard.coach.subtitle', 'Bienvenido, {{name}}', { 
                  name: currentUser?.displayName || currentUser?.email || 'Coach' 
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl transition-colors duration-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
                  {t('dashboard.coach.stats.totalUsers', 'Total Usuarios')}
                </p>
                <p className="text-2xl font-bold text-text-default-light dark:text-text-default-dark">
                  {/* TODO: Fetch real data */}
                  24
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
                  {t('dashboard.coach.stats.activePlans', 'Planes Activos')}
                </p>
                <p className="text-2xl font-bold text-text-default-light dark:text-text-default-dark">
                  {/* TODO: Fetch real data */}
                  8
                </p>
              </div>
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center">
                <FaDumbbell className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl transition-colors duration-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
                  {t('dashboard.coach.stats.thisWeek', 'Esta Semana')}
                </p>
                <p className="text-2xl font-bold text-text-default-light dark:text-text-default-dark">
                  {/* TODO: Fetch real data */}
                  12
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <FaChartLine className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl transition-colors duration-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
                  {t('dashboard.coach.stats.sessions', 'Sesiones')}
                </p>
                <p className="text-2xl font-bold text-text-default-light dark:text-text-default-dark">
                  {/* TODO: Fetch real data */}
                  5
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                <FaCalendarAlt className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {dashboardCards.map((card) => (
            <Link
              key={card.id}
              to={card.link}
              className={`group block bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 transition-all duration-500 hover:shadow-2xl hover:scale-105 ${
                !card.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  {card.icon}
                </div>
                <FaArrowRight className="w-6 h-6 text-text-muted-light dark:text-text-muted-dark group-hover:text-text-default-light dark:group-hover:text-text-default-dark transition-colors duration-300" />
              </div>
              
              <h3 className="text-xl font-bold text-text-default-light dark:text-text-default-dark mb-3">
                {card.title}
              </h3>
              
              <p className="text-text-muted-light dark:text-text-muted-dark mb-6">
                {card.description}
              </p>

              {card.id === 'plans' && (
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-sm font-medium rounded-lg transition-all duration-300 flex items-center">
                    <FaPlus className="w-4 h-4 mr-2" />
                    {t('dashboard.coach.plans.createNew', 'Crear Nuevo')}
                  </button>
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 transition-colors duration-500">
            <h2 className="text-2xl font-bold text-text-default-light dark:text-text-default-dark mb-6">
              {t('dashboard.coach.recentActivity.title', 'Actividad Reciente')}
            </h2>
            
            <div className="space-y-4">
              {/* TODO: Fetch real activity data */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <FaUsers className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-default-light dark:text-text-default-dark">
                    {t('dashboard.coach.recentActivity.newUser', 'Nuevo usuario registrado')}
                  </p>
                  <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
                    {t('dashboard.coach.recentActivity.timeAgo', 'Hace 2 horas')}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <FaDumbbell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-default-light dark:text-text-default-dark">
                    {t('dashboard.coach.recentActivity.planAssigned', 'Plan asignado a cliente')}
                  </p>
                  <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
                    {t('dashboard.coach.recentActivity.timeAgo', 'Hace 1 día')}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <FaChartLine className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-default-light dark:text-text-default-dark">
                    {t('dashboard.coach.recentActivity.progressUpdate', 'Actualización de progreso')}
                  </p>
                  <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
                    {t('dashboard.coach.recentActivity.timeAgo', 'Hace 3 días')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachDashboardPage;
