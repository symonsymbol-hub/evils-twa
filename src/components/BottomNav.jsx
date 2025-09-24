import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import BarChartIcon from '@mui/icons-material/BarChart';
import PaidIcon from '@mui/icons-material/Paid';

const pathToValue = {
  '/': 0,
  '/application': 1,
  '/analytics': 2,
  '/finance': 3,
};

function BottomNav() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(pathToValue[location.pathname] ?? 0);

  useEffect(() => {
    setValue(pathToValue[location.pathname] ?? 0);
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    switch (newValue) {
      case 0: navigate('/'); break;
      case 1: navigate('/application'); break;
      case 2: navigate('/analytics'); break;
      case 3: navigate('/finance'); break;
      default: navigate('/');
    }
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10 }} elevation={3}>
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        <BottomNavigationAction label={t('main_title')} icon={<DashboardIcon />} />
        <BottomNavigationAction label={t('application_title')} icon={<DescriptionIcon />} />
        <BottomNavigationAction label={t('analytics_title')} icon={<BarChartIcon />} />
        <BottomNavigationAction label={t('finance_title')} icon={<PaidIcon />} />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav;