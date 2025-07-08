import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { 
  FaDumbbell, 
  FaCalendarAlt, 
  FaClock, 
  FaUser, 
  FaArrowLeft,
  FaPlay,
  FaCheck,
  FaTimes,
  FaSave
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface TrainingPlan {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in weeks
  exercises: Exercise[];
  createdBy: string;
  createdAt: any;
  updatedAt: any;
}

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
}

interface ProgressSession {
  date: any;
  completedExercises: string[];
  planId: string;
  sessionId: string;
}

const ClientTrainingPlanPage: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  
  const [plan, setPlan] = useState<TrainingPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [savingProgress, setSavingProgress] = useState(false);
  const [progressSaved, setProgressSaved] = useState(false);

  useEffect(() => {
    fetchTrainingPlan();
    fetchProgress();
  }, [currentUser]);

  const fetchTrainingPlan = async () => {
    if (!currentUser?.assignedPlanId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const planDoc = await getDoc(doc(db, 'trainingPlans', currentUser.assignedPlanId));
      if (planDoc.exists()) {
        setPlan({
          id: planDoc.id,
          ...planDoc.data()
        } as TrainingPlan);
      } else {
        setError(t('clientTrainingPlan.planNotFound', 'Plan no encontrado'));
      }
    } catch (err) {
      console.error('Error fetching plan:', err);
      setError(t('clientTrainingPlan.errorFetching', 'Error al cargar el plan'));
    } finally {
      setLoading(false);
    }
  };

  const fetchProgress = async () => {
    if (!currentUser || !currentUser.assignedPlanId) return;

    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.trainingProgress && userData.trainingProgress[currentUser.assignedPlanId]) {
          const latestSession = userData.trainingProgress[currentUser.assignedPlanId];
          if (latestSession.completedExercises) {
            setCompletedExercises(new Set(latestSession.completedExercises));
          }
        }
      }
    } catch (err) {
      console.error('Error fetching progress:', err);
    }
  };

  const saveProgress = async () => {
    if (!currentUser || !plan || completedExercises.size === 0) return;

    setSavingProgress(true);
    setError(null);
    
    try {
      const sessionId = `session_${Date.now()}`;
      const progressData = {
        date: serverTimestamp(),
        completedExercises: Array.from(completedExercises),
        planId: plan.id,
        sessionId: sessionId
      };

      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        [`trainingProgress.${plan.id}`]: progressData,
        updatedAt: serverTimestamp()
      });

      setProgressSaved(true);
      setTimeout(() => setProgressSaved(false), 3000); // Hide success message after 3 seconds
    } catch (err) {
      console.error('Error saving progress:', err);
      setError(t('clientTrainingPlan.errorSavingProgress', 'Error al guardar el progreso'));
    } finally {
      setSavingProgress(false);
    }
  };

  const toggleExerciseCompletion = (exerciseId: string) => {
    setCompletedExercises(prev => {
      const newSet = new Set(prev);
      if (newSet.has(exerciseId)) {
        newSet.delete(exerciseId);
      } else {
        newSet.add(exerciseId);
      }
      return newSet;
    });
    setProgressSaved(false); // Reset saved status when making changes
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getProgressPercentage = () => {
    if (!plan || plan.exercises.length === 0) return 0;
    return Math.round((completedExercises.size / plan.exercises.length) * 100);
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

  if (!currentUser?.assignedPlanId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 transition-colors duration-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaDumbbell className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-text-default-light dark:text-text-default-dark mb-4">
              {t('clientTrainingPlan.noPlanTitle', 'No tienes un plan asignado')}
            </h1>
            <p className="text-lg text-text-muted-light dark:text-text-muted-dark mb-8">
              {t('clientTrainingPlan.noPlanDescription', 'Contacta con tu coach o administrador para que te asigne un plan de entrenamiento personalizado.')}
            </p>
            <Link
              to="/dashboard/client"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium rounded-xl transition-all duration-300"
            >
              <FaArrowLeft className="mr-2" />
              {t('common.backToDashboard', 'Volver al Dashboard')}
            </Link>
          </div>
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
              {t('clientTrainingPlan.errorTitle', 'Error al cargar el plan')}
            </h1>
            <p className="text-lg text-text-muted-light dark:text-text-muted-dark mb-8">
              {error}
            </p>
            <button
              onClick={fetchTrainingPlan}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium rounded-xl transition-all duration-300"
            >
              <FaPlay className="mr-2" />
              {t('common.retry', 'Reintentar')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!plan) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 transition-colors duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <FaDumbbell className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-default-light dark:text-text-default-dark">
                  {plan.name}
                </h1>
                <p className="text-lg text-text-muted-light dark:text-text-muted-dark">
                  {t('clientTrainingPlan.yourPlan', 'Tu Plan de Entrenamiento')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {completedExercises.size > 0 && (
                <button
                  onClick={saveProgress}
                  disabled={savingProgress}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center ${
                    progressSaved
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white'
                  } disabled:opacity-50`}
                >
                  <FaSave className="mr-2" />
                  {savingProgress 
                    ? t('clientTrainingPlan.saving', 'Guardando...') 
                    : progressSaved 
                      ? t('clientTrainingPlan.saved', '¡Guardado!') 
                      : t('clientTrainingPlan.saveProgress', 'Guardar Progreso')
                  }
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

        {/* Plan Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Plan Info Card */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-text-default-light dark:text-text-default-dark mb-4">
              {t('clientTrainingPlan.planInfo', 'Información del Plan')}
            </h2>
            <p className="text-text-muted-light dark:text-text-muted-dark mb-6">
              {plan.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <FaCalendarAlt className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                    {t('clientTrainingPlan.duration', 'Duración')}
                  </p>
                  <p className="font-medium text-text-default-light dark:text-text-default-dark">
                    {plan.duration} {t('clientTrainingPlan.weeks', 'semanas')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <FaUser className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                    {t('clientTrainingPlan.difficulty', 'Dificultad')}
                  </p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(plan.difficulty)}`}>
                    {t(`adminPlans.difficulty.${plan.difficulty}`, plan.difficulty)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <FaDumbbell className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                    {t('clientTrainingPlan.exercises', 'Ejercicios')}
                  </p>
                  <p className="font-medium text-text-default-light dark:text-text-default-dark">
                    {plan.exercises.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-text-default-light dark:text-text-default-dark mb-4">
              {t('clientTrainingPlan.progress', 'Progreso')}
            </h2>
            
            <div className="text-center mb-6">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - getProgressPercentage() / 100)}`}
                    className="text-teal-500 transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-text-default-light dark:text-text-default-dark">
                    {getProgressPercentage()}%
                  </span>
                </div>
              </div>
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                {completedExercises.size} / {plan.exercises.length} {t('clientTrainingPlan.completed', 'completados')}
              </p>
            </div>

            {completedExercises.size > 0 && (
              <div className="text-center">
                <button
                  onClick={saveProgress}
                  disabled={savingProgress}
                  className="w-full px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50"
                >
                  <FaSave className="mr-2" />
                  {savingProgress ? t('clientTrainingPlan.saving', 'Guardando...') : t('clientTrainingPlan.saveProgress', 'Guardar Progreso')}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Exercises List */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-text-default-light dark:text-text-default-dark mb-6">
            {t('clientTrainingPlan.exercises', 'Ejercicios')}
          </h2>
          
          <div className="space-y-4">
            {plan.exercises.map((exercise, index) => (
              <div
                key={exercise.id}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  completedExercises.has(exercise.id)
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-200 dark:border-slate-600 hover:border-teal-300 dark:hover:border-teal-600'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <h3 className="text-lg font-semibold text-text-default-light dark:text-text-default-dark">
                        {exercise.name}
                      </h3>
                      {completedExercises.has(exercise.id) && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          <FaCheck className="w-3 h-3 mr-1" />
                          {t('clientTrainingPlan.completed', 'Completado')}
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <FaDumbbell className="w-4 h-4 text-text-muted-light dark:text-text-muted-dark" />
                        <span className="text-sm text-text-muted-light dark:text-text-muted-dark">
                          {t('clientTrainingPlan.sets', 'Series')}: <span className="font-medium text-text-default-light dark:text-text-default-dark">{exercise.sets}</span>
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <FaPlay className="w-4 h-4 text-text-muted-light dark:text-text-muted-dark" />
                        <span className="text-sm text-text-muted-light dark:text-text-muted-dark">
                          {t('clientTrainingPlan.reps', 'Repeticiones')}: <span className="font-medium text-text-default-light dark:text-text-default-dark">{exercise.reps}</span>
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <FaClock className="w-4 h-4 text-text-muted-light dark:text-text-muted-dark" />
                        <span className="text-sm text-text-muted-light dark:text-text-muted-dark">
                          {t('clientTrainingPlan.rest', 'Descanso')}: <span className="font-medium text-text-default-light dark:text-text-default-dark">{exercise.rest}</span>
                        </span>
                      </div>
                    </div>
                    
                    {exercise.notes && (
                      <p className="text-sm text-text-muted-light dark:text-text-muted-dark bg-gray-50 dark:bg-slate-700 p-3 rounded-lg">
                        <strong>{t('clientTrainingPlan.notes', 'Notas')}:</strong> {exercise.notes}
                      </p>
                    )}
                  </div>
                  
                  <button
                    onClick={() => toggleExerciseCompletion(exercise.id)}
                    className={`ml-4 p-3 rounded-lg transition-all duration-300 ${
                      completedExercises.has(exercise.id)
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
                        : 'bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-600'
                    }`}
                    title={completedExercises.has(exercise.id) ? t('clientTrainingPlan.markIncomplete', 'Marcar como incompleto') : t('clientTrainingPlan.markComplete', 'Marcar como completo')}
                  >
                    {completedExercises.has(exercise.id) ? (
                      <FaCheck className="w-5 h-5" />
                    ) : (
                      <FaPlay className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientTrainingPlanPage; 