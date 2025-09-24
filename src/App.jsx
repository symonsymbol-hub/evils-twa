import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { AnimatePresence } from 'framer-motion';

// Компоненты
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import LoadingScreen from './components/LoadingScreen'; // <-- Импорт LoadingScreen

// Страницы
import Dashboard from './pages/Dashboard';
import ApplicationForm from './pages/ApplicationForm';
import Analytics from './pages/Analytics';
import Finance from './pages/Finance';

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true); // <-- Состояние загрузки

  useEffect(() => {
    // Имитируем загрузку данных
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Показываем экран загрузки 2 секунды

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />; // Показываем экран загрузки
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