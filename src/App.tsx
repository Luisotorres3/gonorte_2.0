/**
 * @file App.tsx
 * @description The main App component that serves as the entry point for the React application.
 * It sets up the routing configuration and provides the overall application structure.
 */
import { RouterProvider } from 'react-router-dom';
import router from './router';

/**
 * The main App component.
 * It renders the RouterProvider which handles all application routing.
 * @returns {JSX.Element} The RouterProvider component.
 */
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
