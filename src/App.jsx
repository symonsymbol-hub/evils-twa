import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import WebApp from '@twa-dev/sdk';
import { useUserStore } from './store';

// Компоненты
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import LoadingScreen from './components/LoadingScreen';

// Страницы
import Dashboard from './pages/Dashboard';
import ApplicationForm from './pages/ApplicationForm';
import Analytics from './pages/Analytics';
import Finance from './pages/Finance';

function App() {
  const location = useLocation();
  const setUser = useUserStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Инициализируем приложение Telegram, если оно доступно
      if (WebApp && WebApp.ready) {
        WebApp.ready();
      }
      
      // Безопасно получаем данные пользователя
      // Оператор '?.' (optional chaining) предотвратит ошибку, если initDataUnsafe или user не существуют
      const userData = WebApp?.initDataUnsafe?.user;
      
      if (userData) {
        setUser(userData);
        console.log('User data loaded:', userData);
      } else {
        console.log('Running on localhost or user data not available.');
      }
    } catch (error) {
      console.error("Failed to initialize Telegram WebApp:", error);
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setUser]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      <Header />
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 3, mb: '56px' }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/application" element={<ApplicationForm />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/finance" element={<Finance />} />
          </Routes>
        </AnimatePresence>
      </Box>
      <BottomNav />
    </Box>
  );
}

export default App;