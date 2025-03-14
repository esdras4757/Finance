import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';


import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './components/AuthProvider';
import {UserProvider} from './providers/UserProvider';
import { useAuth } from './components/AuthProvider';
import Egresos from './pages/Egresos';
import Income from './pages/Income';
import Debts from './pages/Debts';
import Transactions from './pages/Transactions';

function App() {
  const location = useLocation();
  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <AuthProvider>
      <UserProvider>
      <Routes>
        <Route exact path="/dashboard" element={
          <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
        } />
        <Route exact path="/Egress" element={
          <ProtectedRoute>
          <Egresos/>
        </ProtectedRoute>
        } />
        <Route exact path="/income" element={
          <ProtectedRoute>
          <Income/>
        </ProtectedRoute>
        } />
        <Route exact path="/transactions" element={
          <ProtectedRoute>
          <Transactions/>
        </ProtectedRoute>
        } />
         <Route exact path="/debts" element={
          <ProtectedRoute>
          <Debts/>
        </ProtectedRoute>
        } />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>} />
        <Route exact path='*' element={<Login />} />
      </Routes>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
