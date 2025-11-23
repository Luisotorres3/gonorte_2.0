import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { 
  FaCog, 
  FaBell, 
  FaShieldAlt, 
  FaPalette, 
  FaArrowLeft,
  FaSave,
  FaCheck,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaCalendarAlt
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
    trainingReminders: boolean;
    progressUpdates: boolean;
    weeklyReports: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'coaches';
    showProgress: boolean;
    showStats: boolean;
    allowMessages: boolean;
  };
  preferences: {
    language: string;
    theme: 'light' | 'dark' | 'auto';
    timezone: string;
    units: 'metric' | 'imperial';
  };
}

const UserSettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  
  const [settings, setSettings] = useState<UserSettings>({
    notifications: {
      email: true,
      push: true,
      trainingReminders: true,
      progressUpdates: true,
      weeklyReports: false
    },
    privacy: {
      profileVisibility: 'coaches',
      showProgress: true,
      showStats: true,
      allowMessages: true
    },
    preferences: {
      language: 'es',
      theme: 'auto',
      timezone: 'Europe/Madrid',
      units: 'metric'
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'notifications' | 'privacy' | 'preferences' | 'account'>('notifications');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Load user settings from Firestore
    loadUserSettings();
  }, [currentUser]);

  const loadUserSettings = async () => {
    if (!currentUser) return;
    
    try {
      // TODO: Load actual settings from Firestore
      // For now, using default settings
      console.log('Loading user settings...');
    } catch (err) {
      console.error('Error loading user settings:', err);
      setError(t('settings.errorLoading', 'Error al cargar la configuración'));
    }
  };

  const saveSettings = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        settings: settings,
        updatedAt: serverTimestamp()
      });
      
      setSuccess(t('settings.savedSuccessfully', 'Configuración guardada correctamente'));
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
      setError(t('settings.errorSaving', 'Error al guardar la configuración'));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError(t('settings.passwordMismatch', 'Las contraseñas no coinciden'));
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setError(t('settings.passwordTooShort', 'La contraseña debe tener al menos 6 caracteres'));
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Implement password change with Firebase Auth
      console.log('Changing password...');
      setSuccess(t('settings.passwordChanged', 'Contraseña cambiada correctamente'));
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error changing password:', err);
      setError(t('settings.errorChangingPassword', 'Error al cambiar la contraseña'));
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = (category: keyof UserSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const toggleSetting = (category: keyof UserSettings, key: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key]
      }
    }));
  };

  const renderToggle = (enabled: boolean, onChange: () => void) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
        enabled ? 'bg-teal-600' : 'bg-gray-200 dark:bg-gray-700'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const tabs = [
    {
      id: 'notifications',
      label: t('settings.tabs.notifications', 'Notificaciones'),
      icon: <FaBell className="w-5 h-5" />
    },
    {
      id: 'privacy',
      label: t('settings.tabs.privacy', 'Privacidad'),
      icon: <FaShieldAlt className="w-5 h-5" />
    },
    {
      id: 'preferences',
      label: t('settings.tabs.preferences', 'Preferencias'),
      icon: <FaPalette className="w-5 h-5" />
    },
    {
      id: 'account',
      label: t('settings.tabs.account', 'Cuenta'),
      icon: <FaUser className="w-5 h-5" />
    }
  ];

  if (!currentUser) {
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
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <FaCog className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-default-light dark:text-text-default-dark">
                  {t('settings.title', 'Configuración')}
                </h1>
                <p className="text-lg text-text-muted-light dark:text-text-muted-dark">
                  {t('settings.subtitle', 'Gestiona tus preferencias y configuración de cuenta')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={saveSettings}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium rounded-xl transition-all duration-300 flex items-center shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                <FaSave className="mr-2" />
                {loading ? t('common.saving', 'Guardando...') : t('common.save', 'Guardar')}
              </button>
              
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

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-6 p-4 text-sm text-semantic-error-light dark:text-semantic-error-dark bg-semantic-error-light/20 dark:bg-semantic-error-dark/20 rounded-xl border border-semantic-error-light/30 dark:border-semantic-error-dark/30 flex items-center">
            <FaTimes className="mr-2" />
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 text-sm text-semantic-success-light dark:text-semantic-success-dark bg-semantic-success-light/20 dark:bg-semantic-success-dark/20 rounded-xl border border-semantic-success-light/30 dark:border-semantic-success-dark/30 flex items-center">
            <FaCheck className="mr-2" />
            {success}
          </div>
        )}

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 rounded-xl p-1 shadow-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-teal-500 text-white'
                    : 'text-text-muted-light dark:text-text-muted-dark hover:text-text-default-light dark:hover:text-text-default-dark'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-text-default-light dark:text-text-default-dark mb-6">
                {t('settings.notifications.title', 'Configuración de Notificaciones')}
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <div>
                    <h3 className="font-medium text-text-default-light dark:text-text-default-dark">
                      {t('settings.notifications.email', 'Notificaciones por Email')}
                    </h3>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                      {t('settings.notifications.emailDesc', 'Recibe notificaciones importantes por correo electrónico')}
                    </p>
                  </div>
                  {renderToggle(settings.notifications.email, () => toggleSetting('notifications', 'email'))}
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <div>
                    <h3 className="font-medium text-text-default-light dark:text-text-default-dark">
                      {t('settings.notifications.push', 'Notificaciones Push')}
                    </h3>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                      {t('settings.notifications.pushDesc', 'Recibe notificaciones en tiempo real en tu dispositivo')}
                    </p>
                  </div>
                  {renderToggle(settings.notifications.push, () => toggleSetting('notifications', 'push'))}
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <div>
                    <h3 className="font-medium text-text-default-light dark:text-text-default-dark">
                      {t('settings.notifications.trainingReminders', 'Recordatorios de Entrenamiento')}
                    </h3>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                      {t('settings.notifications.trainingRemindersDesc', 'Recibe recordatorios para tus sesiones de entrenamiento')}
                    </p>
                  </div>
                  {renderToggle(settings.notifications.trainingReminders, () => toggleSetting('notifications', 'trainingReminders'))}
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <div>
                    <h3 className="font-medium text-text-default-light dark:text-text-default-dark">
                      {t('settings.notifications.progressUpdates', 'Actualizaciones de Progreso')}
                    </h3>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                      {t('settings.notifications.progressUpdatesDesc', 'Recibe notificaciones sobre tu progreso y logros')}
                    </p>
                  </div>
                  {renderToggle(settings.notifications.progressUpdates, () => toggleSetting('notifications', 'progressUpdates'))}
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <div>
                    <h3 className="font-medium text-text-default-light dark:text-text-default-dark">
                      {t('settings.notifications.weeklyReports', 'Reportes Semanales')}
                    </h3>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                      {t('settings.notifications.weeklyReportsDesc', 'Recibe un resumen semanal de tu actividad')}
                    </p>
                  </div>
                  {renderToggle(settings.notifications.weeklyReports, () => toggleSetting('notifications', 'weeklyReports'))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-text-default-light dark:text-text-default-dark mb-6">
                {t('settings.privacy.title', 'Configuración de Privacidad')}
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <h3 className="font-medium text-text-default-light dark:text-text-default-dark mb-2">
                    {t('settings.privacy.profileVisibility', 'Visibilidad del Perfil')}
                  </h3>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-4">
                    {t('settings.privacy.profileVisibilityDesc', 'Controla quién puede ver tu perfil')}
                  </p>
                  <select
                    value={settings.privacy.profileVisibility}
                    onChange={(e) => updateSetting('privacy', 'profileVisibility', e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 rounded-lg text-text-default-light dark:text-text-default-dark focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="public">{t('settings.privacy.public', 'Público')}</option>
                    <option value="coaches">{t('settings.privacy.coaches', 'Solo Coaches')}</option>
                    <option value="private">{t('settings.privacy.private', 'Privado')}</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <div>
                    <h3 className="font-medium text-text-default-light dark:text-text-default-dark">
                      {t('settings.privacy.showProgress', 'Mostrar Progreso')}
                    </h3>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                      {t('settings.privacy.showProgressDesc', 'Permite que otros vean tu progreso de entrenamiento')}
                    </p>
                  </div>
                  {renderToggle(settings.privacy.showProgress, () => toggleSetting('privacy', 'showProgress'))}
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <div>
                    <h3 className="font-medium text-text-default-light dark:text-text-default-dark">
                      {t('settings.privacy.showStats', 'Mostrar Estadísticas')}
                    </h3>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                      {t('settings.privacy.showStatsDesc', 'Permite que otros vean tus estadísticas de entrenamiento')}
                    </p>
                  </div>
                  {renderToggle(settings.privacy.showStats, () => toggleSetting('privacy', 'showStats'))}
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <div>
                    <h3 className="font-medium text-text-default-light dark:text-text-default-dark">
                      {t('settings.privacy.allowMessages', 'Permitir Mensajes')}
                    </h3>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                      {t('settings.privacy.allowMessagesDesc', 'Permite que otros usuarios te envíen mensajes')}
                    </p>
                  </div>
                  {renderToggle(settings.privacy.allowMessages, () => toggleSetting('privacy', 'allowMessages'))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-text-default-light dark:text-text-default-dark mb-6">
                {t('settings.preferences.title', 'Preferencias Generales')}
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <h3 className="font-medium text-text-default-light dark:text-text-default-dark mb-2">
                    {t('settings.preferences.language', 'Idioma')}
                  </h3>
                  <select
                    value={settings.preferences.language}
                    onChange={(e) => updateSetting('preferences', 'language', e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 rounded-lg text-text-default-light dark:text-text-default-dark focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                  </select>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <h3 className="font-medium text-text-default-light dark:text-text-default-dark mb-2">
                    {t('settings.preferences.theme', 'Tema')}
                  </h3>
                  <select
                    value={settings.preferences.theme}
                    onChange={(e) => updateSetting('preferences', 'theme', e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 rounded-lg text-text-default-light dark:text-text-default-dark focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="light">{t('settings.preferences.light', 'Claro')}</option>
                    <option value="dark">{t('settings.preferences.dark', 'Oscuro')}</option>
                    <option value="auto">{t('settings.preferences.auto', 'Automático')}</option>
                  </select>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <h3 className="font-medium text-text-default-light dark:text-text-default-dark mb-2">
                    {t('settings.preferences.timezone', 'Zona Horaria')}
                  </h3>
                  <select
                    value={settings.preferences.timezone}
                    onChange={(e) => updateSetting('preferences', 'timezone', e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 rounded-lg text-text-default-light dark:text-text-default-dark focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Europe/Madrid">Madrid (GMT+1)</option>
                    <option value="America/New_York">New York (GMT-5)</option>
                    <option value="America/Los_Angeles">Los Angeles (GMT-8)</option>
                    <option value="Europe/London">London (GMT+0)</option>
                  </select>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <h3 className="font-medium text-text-default-light dark:text-text-default-dark mb-2">
                    {t('settings.preferences.units', 'Unidades')}
                  </h3>
                  <select
                    value={settings.preferences.units}
                    onChange={(e) => updateSetting('preferences', 'units', e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 rounded-lg text-text-default-light dark:text-text-default-dark focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="metric">{t('settings.preferences.metric', 'Métrico (kg, km)')}</option>
                    <option value="imperial">{t('settings.preferences.imperial', 'Imperial (lb, mi)')}</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-text-default-light dark:text-text-default-dark mb-6">
                {t('settings.account.title', 'Configuración de Cuenta')}
              </h2>
              
              <div className="space-y-6">
                {/* Account Information */}
                <div className="p-6 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <h3 className="text-lg font-medium text-text-default-light dark:text-text-default-dark mb-4">
                    {t('settings.account.information', 'Información de la Cuenta')}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <FaUser className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                          {t('settings.account.name', 'Nombre')}
                        </p>
                        <p className="text-text-default-light dark:text-text-default-dark">
                          {currentUser.displayName || t('settings.account.notSet', 'No establecido')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <FaEnvelope className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                          {t('settings.account.email', 'Email')}
                        </p>
                        <p className="text-text-default-light dark:text-text-default-dark">
                          {currentUser.email}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <FaCalendarAlt className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                          {t('settings.account.memberSince', 'Miembro desde')}
                        </p>
                        <p className="text-text-default-light dark:text-text-default-dark">
                          {currentUser.metadata?.creationTime 
                            ? new Date(currentUser.metadata.creationTime).toLocaleDateString()
                            : t('settings.account.unknown', 'Desconocido')
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Change Password */}
                <div className="p-6 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <h3 className="text-lg font-medium text-text-default-light dark:text-text-default-dark mb-4">
                    {t('settings.account.changePassword', 'Cambiar Contraseña')}
                  </h3>
                  
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                        {t('settings.account.currentPassword', 'Contraseña Actual')}
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="w-full px-4 py-2 bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 rounded-lg text-text-default-light dark:text-text-default-dark focus:outline-none focus:ring-2 focus:ring-teal-500 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                        {t('settings.account.newPassword', 'Nueva Contraseña')}
                      </label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full px-4 py-2 bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 rounded-lg text-text-default-light dark:text-text-default-dark focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                        {t('settings.account.confirmPassword', 'Confirmar Nueva Contraseña')}
                      </label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full px-4 py-2 bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 rounded-lg text-text-default-light dark:text-text-default-dark focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={loading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                      className="px-6 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium rounded-lg transition-all duration-300 disabled:opacity-50"
                    >
                      {loading ? t('common.saving', 'Guardando...') : t('settings.account.updatePassword', 'Actualizar Contraseña')}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage; 