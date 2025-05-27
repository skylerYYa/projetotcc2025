import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ApartmentProvider } from './contexts/ApartmentContext';
import { ChatProvider } from './contexts/ChatContext';
import { AnimatePresence } from 'framer-motion';

// Componentes de página
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ClientDashboardPage from './pages/client/ClientDashboardPage';
import ApartmentDetailPage from './pages/client/ApartmentDetailPage';
import RealtorDashboardPage from './pages/realtor/RealtorDashboardPage';
import ChatWidget from './components/chat/ChatWidget';

const ProtectedRoute = ({ children, userType = 'admin' }) => {
  const location = useLocation();
  let isAuthenticated = false;
  let loginPath = '/';
  let tokenName = '';

  if (userType === 'admin') {
    tokenName = 'adminAuthToken';
    loginPath = '/admin/login';
  } else if (userType === 'client') {
    tokenName = 'clientAuthToken';
    loginPath = '/cliente/login';
  } else if (userType === 'realtor') {
    tokenName = 'realtorAuthToken';
    loginPath = '/corretor/login';
  }

  isAuthenticated = !!localStorage.getItem(tokenName);

  if (!isAuthenticated) {
    return <Navigate to={loginPath} state={{ from: location.pathname }} replace />;
  }
  return children;
};

const AppContent = () => {
  const location = useLocation();
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            {/* Cliente */}
            <Route path="/cliente/login" element={<LoginPage />} /> {/* key não é mais necessária aqui se LoginPage não depende dela para resetar */}
            <Route path="/cliente/registrar" element={<RegisterPage />} />
            <Route path="/cliente/dashboard" element={<ProtectedRoute userType="client"><ClientDashboardPage /></ProtectedRoute>} />
            <Route path="/cliente/apartamento/:apartmentId" element={<ProtectedRoute userType="client"><ApartmentDetailPage /></ProtectedRoute>} />
            {/* Corretor */}
            <Route path="/corretor/login" element={<LoginPage />} />
            <Route path="/corretor/registrar" element={<RegisterPage />} />
            <Route path="/corretor/dashboard" element={<ProtectedRoute userType="realtor"><RealtorDashboardPage /></ProtectedRoute>} />
            {/* Admin */}
            <Route path="/admin/login" element={<AdminLoginPage />} /> {/* Alterado para AdminLoginPage dedicado */}
            <Route path="/admin/dashboard" element={<ProtectedRoute userType="admin"><AdminDashboardPage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      <ChatWidget />
    </>
  );
}

const MainApp = () => {
  return (
    <ApartmentProvider>
      <ChatProvider>
        <Router>
          <AppContent />
        </Router>
      </ChatProvider>
    </ApartmentProvider>
  )
}

export default MainApp;