import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { getLocalizedRoute } from '../router/routes.config';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { 
  FaDumbbell, 
  FaArrowLeft,
  FaChartLine,
  FaFire,
  FaCheck,
  FaHistory
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface TrainingSession {
  date: any;
  completedExercises: string[];
  planId: string;
  sessionId: string;
}

interface TrainingPlan {
  id: string;
  name: string;
  exercises: Exercise[];
}

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
}

const ClientTrainingHistoryPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'es';
  const { currentUser } = useAuth();
  
  const [trainingHistory, setTrainingHistory] = useState<TrainingSession[]>([]);
  const [plans, setPlans] = useState<Record<string, TrainingPlan>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrainingHistory();
  }, [currentUser]);

  const fetchTrainingHistory = async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const progress = userData.trainingProgress || {};
        
        // Convert progress object to array of sessions
        const sessions: TrainingSession[] = Object.values(progress);
        sessions.sort((a, b) => b.date.toDate() - a.date.toDate()); // Sort by date descending
        
        setTrainingHistory(sessions);
        
        // Fetch plan details for each session
        const planIds = [...new Set(sessions.map(session => session.planId))];
        const plansData: Record<string, TrainingPlan> = {};
        
        for (const planId of planIds) {
          try {
            const planDoc = await getDoc(doc(db, 'trainingPlans', planId));
            if (planDoc.exists()) {
              plansData[planId] = {
                id: planDoc.id,
                ...planDoc.data()
              } as TrainingPlan;
            }
          } catch (err) {
            console.error(`Error fetching plan ${planId}:`, err);
          }
        }
        
        setPlans(plansData);
      }
    } catch (err) {
      console.error('Error fetching training history:', err);
      setError(t('clientTrainingHistory.errorFetching', 'Error al cargar el historial'));
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Fecha desconocida';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPlanName = (planId: string) => {
    return plans[planId]?.name || planId;
  };

  const getExerciseName = (planId: string, exerciseId: string) => {
    const plan = plans[planId];
    if (!plan) return exerciseId;
    
    const exercise = plan.exercises.find(ex => ex.id === exerciseId);
    return exercise?.name || exerciseId;
  };

  const getCompletionPercentage = (session: TrainingSession) => {
    const plan = plans[session.planId];
    if (!plan || plan.exercises.length === 0) return 0;
    return Math.round((session.completedExercises.length / plan.exercises.length) * 100);
  };

  const getTotalSessions = () => trainingHistory.length;

  const getTotalExercisesCompleted = () => {
    return trainingHistory.reduce((total, session) => total + session.completedExercises.length, 0);
  };

  const getAverageCompletion = () => {
    if (trainingHistory.length === 0) return 0;
    const totalPercentage = trainingHistory.reduce((total, session) => total + getCompletionPercentage(session), 0);
    return Math.round(totalPercentage / trainingHistory.length);
  };

  const getStreakDays = () => {
    if (trainingHistory.length === 0) return 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let streak = 0;
    let currentDate = new Date(today);
    
    while (true) {
      const hasSessionOnDate = trainingHistory.some(session => {
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
              {t('clientTrainingHistory.errorTitle', 'Error al cargar el historial')}
            </h1>
            <p className="text-lg text-text-muted-light dark:text-text-muted-dark mb-8">
              {error}
            </p>
            <button
              onClick={fetchTrainingHistory}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium rounded-xl transition-all duration-300"
            >
              <FaHistory className="mr-2" />
              {t('common.retry', 'Reintentar')}
            </button>
          </div>
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
                <FaHistory className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-default-light dark:text-text-default-dark">
                  {t('clientTrainingHistory.title', 'Historial de Entrenamiento')}
                </h1>
                <p className="text-lg text-text-muted-light dark:text-text-muted-dark">
                  {t('clientTrainingHistory.subtitle', 'Tu progreso y sesiones completadas')}
                </p>
              </div>
            </div>
            
            <Link
              to={`/${currentLang}/${t('routes.dashboard')}/client`}
              className="px-4 py-2 bg-white dark:bg-slate-800 text-text-default-light dark:text-text-default-dark font-medium rounded-xl transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
            >
              <FaArrowLeft className="mr-2" />
              {t('common.back', 'Volver')}
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl transition-colors duration-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
                  {t('clientTrainingHistory.stats.totalSessions', 'Sesiones Totales')}
                </p>
                <p className="text-2xl font-bold text-text-default-light dark:text-text-default-dark">
                  {getTotalSessions()}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <FaDumbbell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl transition-colors duration-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
                  {t('clientTrainingHistory.stats.exercisesCompleted', 'Ejercicios Completados')}
                </p>
                <p className="text-2xl font-bold text-text-default-light dark:text-text-default-dark">
                  {getTotalExercisesCompleted()}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <FaCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl transition-colors duration-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
                  {t('clientTrainingHistory.stats.averageCompletion', 'Promedio de Completado')}
                </p>
                <p className="text-2xl font-bold text-text-default-light dark:text-text-default-dark">
                  {getAverageCompletion()}%
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
                  {t('clientTrainingHistory.stats.streak', 'Racha Actual')}
                </p>
                <p className="text-2xl font-bold text-text-default-light dark:text-text-default-dark">
                  {getStreakDays()} {t('clientTrainingHistory.stats.days', 'días')}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                <FaFire className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Training History List */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-text-default-light dark:text-text-default-dark mb-6">
            {t('clientTrainingHistory.sessionsTitle', 'Sesiones de Entrenamiento')}
          </h2>
          
          {trainingHistory.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHistory className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-medium text-text-default-light dark:text-text-default-dark mb-2">
                {t('clientTrainingHistory.noSessions', 'No hay sesiones registradas')}
              </h3>
              <p className="text-text-muted-light dark:text-text-muted-dark mb-6">
                {t('clientTrainingHistory.noSessionsDescription', 'Comienza a entrenar y verás tu historial aquí')}
              </p>
              <Link
                to={getLocalizedRoute('trainingPlan', currentLang)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium rounded-xl transition-all duration-300"
              >
                <FaDumbbell className="mr-2" />
                {t('clientTrainingHistory.startTraining', 'Comenzar Entrenamiento')}
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {trainingHistory.map((session, index) => (
                <div key={session.sessionId} className="border border-gray-200 dark:border-slate-600 rounded-xl p-6 transition-colors duration-300 hover:bg-gray-50 dark:hover:bg-slate-700">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-teal-600 dark:text-teal-400">
                          {trainingHistory.length - index}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-text-default-light dark:text-text-default-dark">
                          {getPlanName(session.planId)}
                        </h3>
                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark flex items-center">
                          <FaCalendarAlt className="w-4 h-4 mr-2" />
                          {formatDate(session.date)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm text-text-muted-light dark:text-text-muted-dark">
                          {t('clientTrainingHistory.completion', 'Completado')}
                        </span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full text-xs font-medium">
                          {getCompletionPercentage(session)}%
                        </span>
                      </div>
                      <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                        {session.completedExercises.length} {t('clientTrainingHistory.exercises', 'ejercicios')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-text-default-light dark:text-text-default-dark">
                      {t('clientTrainingHistory.completedExercises', 'Ejercicios Completados')}:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {session.completedExercises.map((exerciseId) => (
                        <span
                          key={exerciseId}
                          className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full text-xs font-medium"
                        >
                          <FaCheck className="w-3 h-3 mr-1" />
                          {getExerciseName(session.planId, exerciseId)}
                        </span>
                      ))}
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

export default ClientTrainingHistoryPage; 