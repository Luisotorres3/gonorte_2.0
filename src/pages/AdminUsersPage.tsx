import { useEffect, useState, useMemo } from 'react';
import { collection, getDocs, query, orderBy, addDoc, serverTimestamp, setDoc, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import type { UserProfile } from '../types/user';
import { useTranslation } from 'react-i18next';
import { FaSearch, FaEdit, FaTrashAlt, FaUserPlus, FaDumbbell, FaUserCheck } from 'react-icons/fa';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { initializeApp, getApps } from 'firebase/app';


const AdminUsersPage: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser, userRole } = useAuth(); // To check if current user is admin for delete action
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({ displayName: '', email: '', password: '', role: 'client', phoneNumber: '' });
  const [addingUser, setAddingUser] = useState(false);
  const [addUserError, setAddUserError] = useState<string | null>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [showAssignPlanModal, setShowAssignPlanModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // TODO: Implement pagination for large user lists
        const usersCollectionRef = collection(db, 'users');
        // Order by registrationDate or displayName if available
        const q = query(usersCollectionRef, orderBy('registrationDate', 'desc'));
        const querySnapshot = await getDocs(q);
        const usersList = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          uid: doc.id, // Ensure uid is part of the object, matching UserProfile
        } as UserProfile));

        // If current user is a coach, they should ideally only see their clients.
        // This filtering logic would be more complex, potentially requiring users to have a 'coachId' field.
        // For now, showing all users to both admin and coach.
        // if (userRole === 'coach' || userRole === 'admin' && currentUser) {
        //   usersList = usersList.filter(user => user.coachId === currentUser.uid || user.uid === currentUser.uid);
        // }
        setUsers(usersList);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(t('adminUsers.errorFetching', 'Failed to fetch users.'));
      } finally {
        setIsLoading(false);
      }
    };

    const fetchPlans = async () => {
      try {
        const plansRef = collection(db, 'trainingPlans');
        const q = query(plansRef, orderBy('name'));
        const querySnapshot = await getDocs(q);
        const plansData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPlans(plansData);
      } catch (err) {
        console.error('Error fetching plans:', err);
      }
    };

    fetchUsers();
    fetchPlans();
  }, [t, userRole, currentUser]);

  const filteredUsers = useMemo(() => {
    if (!searchTerm) {
      return users;
    }
    return users.filter(user =>
      (user.displayName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (user.role?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const handleDeleteUser = async (userId: string) => {
    // This is a placeholder. Actual deletion requires careful implementation:
    // 1. Delete from Firebase Auth.
    // 2. Delete from Firestore.
    // 3. Handle related data (e.g., storage files, entries in other collections).
    // 4. Confirm action with the admin.
    if (userRole !== 'admin') {
        alert(t('adminUsers.deleteForbidden', 'Only admins can delete users.'));
        return;
    }
    if (window.confirm(t('adminUsers.deleteConfirm', `Are you sure you want to delete user ${userId}? This action cannot be undone.`))) {
      console.log(`TODO: Implement delete for user ${userId}`);
      alert(t('adminUsers.deleteNotImplemented', 'Delete functionality not yet fully implemented.'));
      // Example:
      // try {
      //   // await deleteUserAuthFunction(userId); // Call a cloud function or admin SDK function for Auth deletion
      //   // await deleteDoc(doc(db, 'users', userId));
      //   setUsers(prevUsers => prevUsers.filter(u => u.uid !== userId));
      // } catch (err) {
      //   console.error("Error deleting user:", err);
      //   setError(t('adminUsers.errorDeleting', 'Failed to delete user.'));
      // }
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingUser(true);
    setAddUserError(null);
    try {
      let secondaryApp;
      if (!getApps().some(app => app.name === 'Secondary')) {
        secondaryApp = initializeApp(app.options, 'Secondary');
      } else {
        secondaryApp = getApps().find(app => app.name === 'Secondary');
      }
      const secondaryAuth = getAuth(secondaryApp);
      // 1. Crear usuario en Auth secundaria
      const userCredential = await createUserWithEmailAndPassword(secondaryAuth, newUser.email, newUser.password);
      const firebaseUser = userCredential.user;

      // 2. Crear perfil en Firestore
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        uid: firebaseUser.uid,
        email: newUser.email,
        displayName: newUser.displayName,
        phoneNumber: newUser.phoneNumber,
        role: newUser.role,
        registrationDate: serverTimestamp(),
      });

      setShowAddUserModal(false);
      setNewUser({ displayName: '', email: '', password: '', role: 'client', phoneNumber: '' });
      // fetchUsers(); // Si quieres refrescar la lista
      // Cerrar sesión secundaria
      await secondaryAuth.signOut();
    } catch (err: any) {
      setAddUserError(err.message || 'Error al crear usuario');
    } finally {
      setAddingUser(false);
    }
  };

  const handleAssignPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !selectedPlanId) return;

    setAddingUser(true);
    setError(null);
    
    try {
      const userRef = doc(db, 'users', selectedUser.uid);
      await updateDoc(userRef, {
        assignedPlanId: selectedPlanId,
        updatedAt: serverTimestamp()
      });
      
      // Update local state
      setUsers(prevUsers => prevUsers.map(user => 
        user.uid === selectedUser.uid 
          ? { ...user, assignedPlanId: selectedPlanId }
          : user
      ));
      
      // Reset form
      setSelectedUser(null);
      setSelectedPlanId('');
      setShowAssignPlanModal(false);
      
      // Show success message
      alert(t('adminUsers.planAssignedSuccess', 'Plan asignado correctamente'));
    } catch (err) {
      console.error('Error assigning plan:', err);
      setError(t('adminUsers.errorAssigningPlan', 'Error al asignar el plan'));
    } finally {
      setAddingUser(false);
    }
  };

  const openAssignPlanModal = (user: UserProfile) => {
    setSelectedUser(user);
    setSelectedPlanId(user.assignedPlanId || '');
    setShowAssignPlanModal(true);
  };

  const getPlanName = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    return plan ? plan.name : planId;
  };


  if (isLoading) {
    return <div className="container mx-auto p-4 text-center">{t('loading', 'Loading users...')}</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-neutral-surface-light dark:bg-neutral-surface-dark shadow-xl rounded-lg p-6 md:p-8 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-text-default-light dark:text-text-default-dark">
            {t('adminUsers.title', 'User Management')}
          </h1>
          {userRole === 'admin' && (
            <>
              <button
                onClick={() => setShowAddUserModal(true)}
                className="flex items-center px-4 py-2 bg-semantic-success-light dark:bg-semantic-success-dark text-text-default-dark dark:text-text-default-light rounded-lg hover:bg-semantic-success-light/80 dark:hover:bg-semantic-success-dark/80 transition-colors text-sm font-medium"
              >
                <FaUserPlus className="mr-2 icon-default"/> {t('adminUsers.addUserButton', 'Añadir Nuevo Usuario')}
              </button>
              {showAddUserModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 dark:bg-black/80 z-50 backdrop-blur-sm">
                  <form
                    onSubmit={handleAddUser}
                    className="bg-neutral-surface-light dark:bg-neutral-surface-dark p-8 rounded-xl shadow-2xl w-full max-w-md space-y-6 border border-neutral-border-light dark:border-neutral-border-dark transition-colors duration-300"
                  >
                    <h2 className="text-2xl font-bold text-text-default-light dark:text-text-default-dark mb-4">Añadir Usuario</h2>
                    <div>
                      <label className="block text-text-default-light dark:text-text-default-dark font-semibold mb-1">Nombre</label>
                      <input
                        type="text"
                        placeholder="Nombre"
                        value={newUser.displayName}
                        onChange={e => setNewUser({ ...newUser, displayName: e.target.value })}
                        required
                        className="w-full p-2 border border-neutral-border-light dark:border-neutral-border-dark rounded bg-neutral-background-light dark:bg-neutral-background-dark text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-primary-DEFAULT dark:focus:border-primary-dark transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-text-default-light dark:text-text-default-dark font-semibold mb-1">Email</label>
                      <input
                        type="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                        required
                        className="w-full p-2 border border-neutral-border-light dark:border-neutral-border-dark rounded bg-neutral-background-light dark:bg-neutral-background-dark text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-primary-DEFAULT dark:focus:border-primary-dark transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-text-default-light dark:text-text-default-dark font-semibold mb-1">Contraseña</label>
                      <input
                        type="password"
                        placeholder="Contraseña"
                        value={newUser.password}
                        onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                        required
                        minLength={6}
                        className="w-full p-2 border border-neutral-border-light dark:border-neutral-border-dark rounded bg-neutral-background-light dark:bg-neutral-background-dark text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-primary-DEFAULT dark:focus:border-primary-dark transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-text-default-light dark:text-text-default-dark font-semibold mb-1">Teléfono</label>
                      <input
                        type="tel"
                        placeholder="Teléfono"
                        value={newUser.phoneNumber}
                        onChange={e => setNewUser({ ...newUser, phoneNumber: e.target.value })}
                        className="w-full p-2 border border-neutral-border-light dark:border-neutral-border-dark rounded bg-neutral-background-light dark:bg-neutral-background-dark text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-primary-DEFAULT dark:focus:border-primary-dark transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-text-default-light dark:text-text-default-dark font-semibold mb-1">Rol</label>
                      <select
                        value={newUser.role}
                        onChange={e => setNewUser({ ...newUser, role: e.target.value as any })}
                        className="w-full p-2 border border-neutral-border-light dark:border-neutral-border-dark rounded bg-neutral-background-light dark:bg-neutral-background-dark text-text-default-light dark:text-text-default-dark focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-primary-DEFAULT dark:focus:border-primary-dark transition-colors duration-300"
                      >
                        <option value="client">Cliente</option>
                        <option value="coach">Coach</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    {addUserError && <div className="text-semantic-error-light dark:text-semantic-error-dark font-semibold">{addUserError}</div>}
                    <div className="flex gap-2 justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddUserModal(false)}
                        className="px-4 py-2 rounded bg-neutral-border-light dark:bg-neutral-border-dark text-text-default-light dark:text-text-default-dark font-semibold hover:opacity-80 transition-opacity"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={addingUser}
                        className="px-4 py-2 rounded bg-semantic-success-light dark:bg-semantic-success-dark text-text-default-dark dark:text-text-default-light font-semibold hover:bg-semantic-success-light/80 dark:hover:bg-semantic-success-dark/80 transition disabled:opacity-60"
                      >
                        {addingUser ? 'Creando...' : 'Crear'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-text-muted-light dark:text-text-muted-dark icon-default" />
            </div>
            <input
              type="text"
              placeholder={t('adminUsers.searchPlaceholder', 'Search by name, email, or role...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-neutral-border-light dark:border-neutral-border-dark rounded-md leading-5 bg-neutral-background-light dark:bg-neutral-background-dark text-text-default-light dark:text-text-default-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-primary-DEFAULT dark:focus:border-primary-dark sm:text-sm transition-colors duration-300"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-border-light dark:divide-neutral-border-dark transition-colors duration-300">
            <thead className="bg-neutral-surface-light/50 dark:bg-neutral-surface-dark/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">{t('adminUsers.table.name', 'Name')}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">{t('adminUsers.table.email', 'Email')}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">{t('adminUsers.table.role', 'Role')}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">{t('adminUsers.table.phone', 'Phone')}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">{t('adminUsers.table.assignedPlan', 'Assigned Plan')}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">{t('adminUsers.table.registered', 'Registered')}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">{t('adminUsers.table.actions', 'Actions')}</th>
              </tr>
            </thead>
            <tbody className="bg-neutral-surface-light dark:bg-neutral-surface-dark divide-y divide-neutral-border-light dark:divide-neutral-border-dark transition-colors duration-300">
              {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                <tr key={user.uid} className="hover:bg-neutral-background-light dark:hover:bg-neutral-background-dark/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-text-default-light dark:text-text-default-dark">{user.displayName || t('adminUsers.noName', 'N/A')}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text-muted-light dark:text-text-muted-dark">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'admin' ? 'bg-semantic-error-light/30 text-semantic-error-dark dark:bg-semantic-error-dark/30 dark:text-semantic-error-light' :
                        user.role === 'coach' ? 'bg-accent-light/30 text-accent-dark dark:bg-accent-dark/30 dark:text-accent-light' : // Using accent for coach for variety
                        user.role === 'client' ? 'bg-semantic-success-light/30 text-semantic-success-dark dark:bg-semantic-success-dark/30 dark:text-semantic-success-light' :
                        'bg-neutral-border-light text-text-muted-light dark:bg-neutral-border-dark dark:text-text-muted-dark'
                    }`}>
                      {user.role ? t(`roles.${user.role}`, user.role) : t('roles.unknown', 'Unknown')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted-light dark:text-text-muted-dark">{user.phoneNumber || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {user.assignedPlanId ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300">
                          <FaDumbbell className="w-3 h-3 mr-1" />
                          {getPlanName(user.assignedPlanId)}
                        </span>
                      ) : (
                        <span className="text-sm text-text-muted-light dark:text-text-muted-dark">-</span>
                      )}
                      {(userRole === 'admin' || userRole === 'coach') && user.role === 'client' && (
                        <button
                          onClick={() => openAssignPlanModal(user)}
                          className="p-1 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded transition-colors"
                          title={t('adminUsers.assignPlan', 'Asignar Plan')}
                        >
                          <FaUserCheck className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted-light dark:text-text-muted-dark">
                    {user.registrationDate ? (user.registrationDate as any).toDate().toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => navigate(`/profile/${user.uid}?edit=1`, { state: { from: '/admin/users' } })}
                      className="text-primary-DEFAULT hover:text-primary-dark dark:text-primary-light dark:hover:text-primary-DEFAULT mr-2 transition-colors"
                      title={t('adminUsers.editTooltip', 'Edit User')}
                    >
                      <FaEdit className="inline h-5 w-5 icon-primary" />
                    </button>
                    {userRole === 'admin' && user.uid !== currentUser?.uid && (
                      <button onClick={() => handleDeleteUser(user.uid)} className="text-semantic-error-light hover:text-semantic-error-dark dark:text-semantic-error-dark dark:hover:text-semantic-error-light transition-colors" title={t('adminUsers.deleteTooltip', 'Delete User')}>
                        <FaTrashAlt className="inline h-5 w-5 icon-default" />
                      </button>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-text-muted-light dark:text-text-muted-dark">
                    {searchTerm ? t('adminUsers.noResults', 'No users found matching your search.') : t('adminUsers.noUsers', 'No users found.')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Assign Plan Modal */}
        {showAssignPlanModal && selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 dark:bg-black/80 z-50 backdrop-blur-sm">
            <div className="bg-neutral-surface-light dark:bg-neutral-surface-dark rounded-xl shadow-2xl w-full max-w-md m-4 border border-neutral-border-light dark:border-neutral-border-dark transition-colors duration-300">
              <div className="p-6 border-b border-neutral-border-light dark:border-neutral-border-dark">
                <h2 className="text-xl font-bold text-text-default-light dark:text-text-default-dark">
                  {t('adminUsers.assignPlanTo', 'Asignar Plan a')} {selectedUser.displayName || selectedUser.email}
                </h2>
              </div>

              <form onSubmit={handleAssignPlan} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-default-light dark:text-text-default-dark mb-2">
                    {t('adminUsers.selectPlan', 'Seleccionar Plan')}
                  </label>
                  <select
                    value={selectedPlanId}
                    onChange={(e) => setSelectedPlanId(e.target.value)}
                    className="w-full p-3 bg-neutral-background-light dark:bg-neutral-background-dark border border-neutral-border-light dark:border-neutral-border-dark rounded-lg text-text-default-light dark:text-text-default-dark focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:border-primary-DEFAULT dark:focus:border-primary-dark transition-colors duration-300"
                  >
                    <option value="">{t('adminUsers.noPlan', 'Sin plan asignado')}</option>
                    {plans.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.name} ({t(`adminPlans.difficulty.${plan.difficulty}`, plan.difficulty)})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-neutral-border-light dark:border-neutral-border-dark">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAssignPlanModal(false);
                      setSelectedUser(null);
                      setSelectedPlanId('');
                    }}
                    className="px-4 py-2 bg-neutral-border-light dark:bg-neutral-border-dark text-text-default-light dark:text-text-default-dark font-medium rounded-lg transition-colors duration-300"
                  >
                    {t('common.cancel', 'Cancelar')}
                  </button>
                  <button
                    type="submit"
                    disabled={addingUser}
                    className="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center disabled:opacity-50"
                  >
                    <FaUserCheck className="mr-2" />
                    {addingUser ? t('common.assigning', 'Asignando...') : t('adminUsers.assignPlan', 'Asignar Plan')}
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

export default AdminUsersPage;
