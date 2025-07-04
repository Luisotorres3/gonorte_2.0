import React, { useEffect, useState, useMemo } from 'react';
import { collection, getDocs, query, orderBy, addDoc, serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import type { UserProfile } from '../types/user';
import { useTranslation } from 'react-i18next';
import { FaSearch, FaEdit, FaTrashAlt, FaUserPlus } from 'react-icons/fa';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { auth, app } from '../firebase/config';
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
  const navigate = useNavigate();
  const location = useLocation();


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
        // if (userRole === 'coach' && currentUser) {
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

    fetchUsers();
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


  if (isLoading) {
    return <div className="container mx-auto p-4 text-center">{t('loading', 'Loading users...')}</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {t('adminUsers.title', 'User Management')}
          </h1>
          {/* Placeholder for Add User button if manual creation by admin is needed */}
          {userRole === 'admin' && (
            <>
              <button
                onClick={() => setShowAddUserModal(true)}
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
              >
                <FaUserPlus className="mr-2"/> {t('adminUsers.addUserButton', 'Añadir Nuevo Usuario')}
              </button>
              {showAddUserModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                  <form
                    onSubmit={handleAddUser}
                    className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-md space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Añadir Usuario</h2>
                    <div>
                      <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Nombre</label>
                      <input
                        type="text"
                        placeholder="Nombre"
                        value={newUser.displayName}
                        onChange={e => setNewUser({ ...newUser, displayName: e.target.value })}
                        required
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Email</label>
                      <input
                        type="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                        required
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Contraseña</label>
                      <input
                        type="password"
                        placeholder="Contraseña"
                        value={newUser.password}
                        onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                        required
                        minLength={6}
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Teléfono</label>
                      <input
                        type="tel"
                        placeholder="Teléfono"
                        value={newUser.phoneNumber}
                        onChange={e => setNewUser({ ...newUser, phoneNumber: e.target.value })}
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Rol</label>
                      <select
                        value={newUser.role}
                        onChange={e => setNewUser({ ...newUser, role: e.target.value as any })}
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="client">Cliente</option>
                        <option value="coach">Coach</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    {addUserError && <div className="text-red-600 font-semibold">{addUserError}</div>}
                    <div className="flex gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => setShowAddUserModal(false)}
                        className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={addingUser}
                        className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition"
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
              <FaSearch className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              placeholder={t('adminUsers.searchPlaceholder', 'Search by name, email, or role...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('adminUsers.table.name', 'Name')}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('adminUsers.table.email', 'Email')}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('adminUsers.table.role', 'Role')}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('adminUsers.table.phone', 'Phone')}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('adminUsers.table.registered', 'Registered')}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('adminUsers.table.actions', 'Actions')}</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                <tr key={user.uid} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{user.displayName || t('adminUsers.noName', 'N/A')}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-300">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'admin' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' :
                        user.role === 'coach' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300' :
                        user.role === 'client' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                    }`}>
                      {user.role ? t(`roles.${user.role}`, user.role) : t('roles.unknown', 'Unknown')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.phoneNumber || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {user.registrationDate ? (user.registrationDate as any).toDate().toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => navigate(`/profile/${user.uid}?edit=1`, { state: { from: '/admin/users' } })}
                      className="text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 mr-2"
                      title={t('adminUsers.editTooltip', 'Edit User')}
                    >
                      <FaEdit className="inline h-5 w-5" />
                    </button>
                    {userRole === 'admin' && user.uid !== currentUser?.uid && ( // Admin can delete, but not themselves
                      <button onClick={() => handleDeleteUser(user.uid)} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300" title={t('adminUsers.deleteTooltip', 'Delete User')}>
                        <FaTrashAlt className="inline h-5 w-5" />
                      </button>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
                    {searchTerm ? t('adminUsers.noResults', 'No users found matching your search.') : t('adminUsers.noUsers', 'No users found.')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
         {/* TODO: Add pagination controls here */}
      </div>
    </div>
  );
};

export default AdminUsersPage;
