import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  where 
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { 
  FaDumbbell, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaUserCheck, 
  FaUsers,
  FaCalendarAlt,
  FaClock,
  FaArrowLeft,
  FaSave,
  FaTimes,
  FaSearch
} from 'react-icons/fa';
import type { UserProfile } from '../types/user';

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

const AdminPlansPage: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser, userRole } = useAuth();
  
  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [clients, setClients] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<TrainingPlan | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<TrainingPlan | null>(null);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form state
  const [planName, setPlanName] = useState('');
  const [planDescription, setPlanDescription] = useState('');
  const [planDifficulty, setPlanDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [planDuration, setPlanDuration] = useState(4);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    fetchPlans();
    fetchClients();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    setError(null);
    try {
      const plansRef = collection(db, 'trainingPlans');
      const q = query(plansRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const plansData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as TrainingPlan));
      setPlans(plansData);
    } catch (err) {
      console.error('Error fetching plans:', err);
      setError(t('adminPlans.errorFetching', 'Error al cargar los planes'));
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
      } as UserProfile));
      setClients(clientsData);
    } catch (err) {
      console.error('Error fetching clients:', err);
    }
  };

  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setLoading(true);
    setError(null);
    
    try {
      const planData = {
        name: planName,
        description: planDescription,
        difficulty: planDifficulty,
        duration: planDuration,
        exercises: exercises,
        createdBy: currentUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await addDoc(collection(db, 'trainingPlans'), planData);
      
      // Reset form
      setPlanName('');
      setPlanDescription('');
      setPlanDifficulty('beginner');
      setPlanDuration(4);
      setExercises([]);
      setShowCreateModal(false);
      
      // Refresh plans
      await fetchPlans();
    } catch (err) {
      console.error('Error creating plan:', err);
      setError(t('adminPlans.errorCreating', 'Error al crear el plan'));
    } finally {
      setLoading(false);
    }
  };

  const handleEditPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;

    setLoading(true);
    setError(null);
    
    try {
      const planRef = doc(db, 'trainingPlans', editingPlan.id);
      await updateDoc(planRef, {
        name: planName,
        description: planDescription,
        difficulty: planDifficulty,
        duration: planDuration,
        exercises: exercises,
        updatedAt: serverTimestamp()
      });
      
      // Reset form
      setEditingPlan(null);
      setPlanName('');
      setPlanDescription('');
      setPlanDifficulty('beginner');
      setPlanDuration(4);
      setExercises([]);
      
      // Refresh plans
      await fetchPlans();
    } catch (err) {
      console.error('Error updating plan:', err);
      setError(t('adminPlans.errorUpdating', 'Error al actualizar el plan'));
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlan = async (planId: string) => {
    if (!confirm(t('adminPlans.confirmDelete', '¿Estás seguro de que quieres eliminar este plan?'))) {
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      await deleteDoc(doc(db, 'trainingPlans', planId));
      await fetchPlans();
    } catch (err) {
      console.error('Error deleting plan:', err);
      setError(t('adminPlans.errorDeleting', 'Error al eliminar el plan'));
    } finally {
      setLoading(false);
    }
  };

  const handleAssignPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan || !selectedClient) return;

    setLoading(true);
    setError(null);
    
    try {
      const userRef = doc(db, 'users', selectedClient);
      await updateDoc(userRef, {
        assignedPlanId: selectedPlan.id,
        updatedAt: serverTimestamp()
      });
      
      // Reset form
      setSelectedPlan(null);
      setSelectedClient('');
      setShowAssignModal(false);
      
      // Refresh clients
      await fetchClients();
      
      // Show success message
      alert(t('adminPlans.planAssignedSuccess', 'Plan asignado correctamente'));
    } catch (err) {
      console.error('Error assigning plan:', err);
      setError(t('adminPlans.errorAssigning', 'Error al asignar el plan'));
    } finally {
      setLoading(false);
    }
  };

  const openAssignModal = (plan: TrainingPlan) => {
    setSelectedPlan(plan);
    setSelectedClient('');
    setShowAssignModal(true);
  };

  const addExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: '',
      sets: 3,
      reps: '10-12',
      rest: '60s',
      notes: ''
    };
    setExercises([...exercises, newExercise]);
  };

  const updateExercise = (id: string, field: keyof Exercise, value: any) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, [field]: value } : ex
    ));
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const openEditModal = (plan: TrainingPlan) => {
    setEditingPlan(plan);
    setPlanName(plan.name);
    setPlanDescription(plan.description);
    setPlanDifficulty(plan.difficulty);
    setPlanDuration(plan.duration);
    setExercises([...plan.exercises]);
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setShowAssignModal(false);
    setEditingPlan(null);
    setSelectedPlan(null);
    setSelectedClient('');
    setPlanName('');
    setPlanDescription('');
    setPlanDifficulty('beginner');
    setPlanDuration(4);
    setExercises([]);
    setError(null);
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

  const filteredClients = clients.filter(client =>
    client.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && plans.length === 0) {
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
                <FaDumbbell className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-default-light dark:text-text-default-dark">
                  {t('adminPlans.title', 'Planes de Entrenamiento')}
                </h1>
                <p className="text-lg text-text-muted-light dark:text-text-muted-dark">
                  {t('adminPlans.subtitle', 'Gestiona los planes de entrenamiento')}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium rounded-xl transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
            >
              <FaPlus className="mr-2" />
              {t('adminPlans.createPlan', 'Crear Plan')}
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 text-sm text-semantic-error-light dark:text-semantic-error-dark bg-semantic-error-light/20 dark:bg-semantic-error-dark/20 rounded-xl border border-semantic-error-light/30 dark:border-semantic-error-dark/30">
            {error}
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 transition-all duration-500 hover:shadow-2xl hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-text-default-light dark:text-text-default-dark mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-text-muted-light dark:text-text-muted-dark text-sm mb-3">
                    {plan.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(plan.difficulty)}`}>
                  {t(`adminPlans.difficulty.${plan.difficulty}`, plan.difficulty)}
                </span>
                <span className="flex items-center text-xs text-text-muted-light dark:text-text-muted-dark">
                  <FaClock className="mr-1" />
                  {plan.duration} {t('adminPlans.weeks', 'semanas')}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-xs text-text-muted-light dark:text-text-muted-dark mb-2">
                  {t('adminPlans.exercises', 'Ejercicios')}: {plan.exercises.length}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(plan)}
                    className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    title={t('adminPlans.edit', 'Editar')}
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePlan(plan.id)}
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title={t('adminPlans.delete', 'Eliminar')}
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
                
                <button
                  onClick={() => openAssignModal(plan)}
                  className="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-sm font-medium rounded-lg transition-all duration-300 flex items-center"
                  title={t('adminPlans.assign', 'Asignar a Cliente')}
                >
                  <FaUserCheck className="w-4 h-4 mr-2" />
                  {t('adminPlans.assign', 'Asignar')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {plans.length === 0 && !loading && (
          <div className="text-center py-12">
            <FaDumbbell className="w-16 h-16 text-text-muted-light dark:text-text-muted-dark mx-auto mb-4" />
            <h3 className="text-xl font-medium text-text-default-light dark:text-text-default-dark mb-2">
              {t('adminPlans.noPlans', 'No hay planes creados')}
            </h3>
            <p className="text-text-muted-light dark:text-text-muted-dark mb-6">
              {t('adminPlans.noPlansDescription', 'Crea tu primer plan de entrenamiento para comenzar')}
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium rounded-xl transition-all duration-300 flex items-center mx-auto"
            >
              <FaPlus className="mr-2" />
              {t('adminPlans.createFirstPlan', 'Crear Primer Plan')}
            </button>
          </div>
        )}

        {/* Create/Edit Modal */}
        {(showCreateModal || editingPlan) && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 dark:bg-black/80 z-50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
              <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-text-default-light dark:text-text-default-dark">
                    {editingPlan ? t('adminPlans.editPlan', 'Editar Plan') : t('adminPlans.createPlan', 'Crear Plan')}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-2 text-text-muted-light dark:text-text-muted-dark hover:text-text-default-light dark:hover:text-text-default-dark rounded-lg transition-colors"
                  >
                    <FaTimes className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <form onSubmit={editingPlan ? handleEditPlan : handleCreatePlan} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                      {t('adminPlans.form.name', 'Nombre del Plan')}
                    </label>
                    <input
                      type="text"
                      value={planName}
                      onChange={(e) => setPlanName(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                      placeholder={t('adminPlans.form.namePlaceholder', 'Ej: Plan de Fuerza Básica')}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                      {t('adminPlans.form.difficulty', 'Dificultad')}
                    </label>
                    <select
                      value={planDifficulty}
                      onChange={(e) => setPlanDifficulty(e.target.value as any)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-text-default-light dark:text-text-default-dark focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                    >
                      <option value="beginner">{t('adminPlans.difficulty.beginner', 'Principiante')}</option>
                      <option value="intermediate">{t('adminPlans.difficulty.intermediate', 'Intermedio')}</option>
                      <option value="advanced">{t('adminPlans.difficulty.advanced', 'Avanzado')}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                    {t('adminPlans.form.description', 'Descripción')}
                  </label>
                  <textarea
                    value={planDescription}
                    onChange={(e) => setPlanDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder={t('adminPlans.form.descriptionPlaceholder', 'Describe el objetivo y enfoque del plan')}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                    {t('adminPlans.form.duration', 'Duración (semanas)')}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="52"
                    value={planDuration}
                    onChange={(e) => setPlanDuration(parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                {/* Exercises Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-text-default-light dark:text-text-default-dark">
                      {t('adminPlans.form.exercises', 'Ejercicios')}
                    </h3>
                    <button
                      type="button"
                      onClick={addExercise}
                      className="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-sm font-medium rounded-lg transition-all duration-300 flex items-center"
                    >
                      <FaPlus className="w-4 h-4 mr-2" />
                      {t('adminPlans.form.addExercise', 'Agregar Ejercicio')}
                    </button>
                  </div>

                  <div className="space-y-4">
                    {exercises.map((exercise, index) => (
                      <div key={exercise.id} className="p-4 bg-gray-50 dark:bg-slate-700 rounded-xl border border-gray-200 dark:border-slate-600">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-text-default-light dark:text-text-default-dark">
                            {t('adminPlans.form.exercise', 'Ejercicio')} {index + 1}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeExercise(exercise.id)}
                            className="p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-text-muted-light dark:text-text-muted-dark mb-1">
                              {t('adminPlans.form.exerciseName', 'Nombre')}
                            </label>
                            <input
                              type="text"
                              value={exercise.name}
                              onChange={(e) => updateExercise(exercise.id, 'name', e.target.value)}
                              className="w-full px-3 py-2 bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 rounded-lg text-sm text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                              placeholder={t('adminPlans.form.exerciseNamePlaceholder', 'Ej: Sentadillas')}
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-text-muted-light dark:text-text-muted-dark mb-1">
                              {t('adminPlans.form.sets', 'Series')}
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={exercise.sets}
                              onChange={(e) => updateExercise(exercise.id, 'sets', parseInt(e.target.value))}
                              className="w-full px-3 py-2 bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 rounded-lg text-sm text-text-default-light dark:text-text-default-dark focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-text-muted-light dark:text-text-muted-dark mb-1">
                              {t('adminPlans.form.reps', 'Repeticiones')}
                            </label>
                            <input
                              type="text"
                              value={exercise.reps}
                              onChange={(e) => updateExercise(exercise.id, 'reps', e.target.value)}
                              className="w-full px-3 py-2 bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 rounded-lg text-sm text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                              placeholder="10-12"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-text-muted-light dark:text-text-muted-dark mb-1">
                              {t('adminPlans.form.rest', 'Descanso')}
                            </label>
                            <input
                              type="text"
                              value={exercise.rest}
                              onChange={(e) => updateExercise(exercise.id, 'rest', e.target.value)}
                              className="w-full px-3 py-2 bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 rounded-lg text-sm text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                              placeholder="60s"
                              required
                            />
                          </div>
                        </div>

                        <div className="mt-3">
                          <label className="block text-xs font-medium text-text-muted-light dark:text-text-muted-dark mb-1">
                            {t('adminPlans.form.notes', 'Notas (Opcional)')}
                          </label>
                          <input
                            type="text"
                            value={exercise.notes || ''}
                            onChange={(e) => updateExercise(exercise.id, 'notes', e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 rounded-lg text-sm text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                            placeholder={t('adminPlans.form.notesPlaceholder', 'Notas adicionales sobre el ejercicio')}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
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
                    <FaSave className="mr-2" />
                    {loading ? t('common.saving', 'Guardando...') : (editingPlan ? t('common.save', 'Guardar') : t('common.create', 'Crear'))}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Assign Plan Modal */}
        {showAssignModal && selectedPlan && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 dark:bg-black/80 z-50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl m-4">
              <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-text-default-light dark:text-text-default-dark">
                    {t('adminPlans.assignPlan', 'Asignar Plan')}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-2 text-text-muted-light dark:text-text-muted-dark hover:text-text-default-light dark:hover:text-text-default-dark rounded-lg transition-colors"
                  >
                    <FaTimes className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-text-muted-light dark:text-text-muted-dark mt-2">
                  {t('adminPlans.assignPlanDescription', 'Asignar "{{planName}}" a un cliente', { planName: selectedPlan.name })}
                </p>
              </div>

              <form onSubmit={handleAssignPlan} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                    {t('adminPlans.selectClient', 'Seleccionar Cliente')}
                  </label>
                  
                  <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="h-5 w-5 text-text-muted-light dark:text-text-muted-dark" />
                    </div>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                      placeholder={t('adminPlans.searchClients', 'Buscar clientes...')}
                    />
                  </div>

                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {filteredClients.map((client) => (
                      <div
                        key={client.uid}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          selectedClient === client.uid
                            ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                            : 'border-gray-200 dark:border-slate-600 hover:border-teal-300 dark:hover:border-teal-600'
                        }`}
                        onClick={() => setSelectedClient(client.uid)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-text-default-light dark:text-text-default-dark">
                              {client.displayName || t('adminPlans.noName', 'Sin nombre')}
                            </h4>
                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                              {client.email}
                            </p>
                          </div>
                          {client.assignedPlanId && (
                            <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 px-2 py-1 rounded-full">
                              {t('adminPlans.alreadyAssigned', 'Ya tiene plan')}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
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
                    disabled={loading || !selectedClient}
                    className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium rounded-xl transition-all duration-300 flex items-center disabled:opacity-50"
                  >
                    <FaUserCheck className="mr-2" />
                    {loading ? t('common.assigning', 'Asignando...') : t('adminPlans.assignPlan', 'Asignar Plan')}
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

export default AdminPlansPage; 