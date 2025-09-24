import React from 'react';
import { AppBar, Toolbar, Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../store';
import Logo from './Logo';

function Header() {
  const { i18n } = useTranslation();
  const user = useUserStore((state) => state.user);

  const handleLanguageChange = () => {
    const nextLanguage = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(nextLanguage);
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Logo />
          <Typography variant="h5" sx={{ color: 'primary.main' }}>
            EVILS
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Приветствуем пользователя, если он авторизован */}
          {user ? (
            <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
              {user.first_name}
            </Typography>
          ) : (
            <Typography sx={{ display: { xs: 'none', sm: 'block' }, opacity: 0.5 }}>
              Guest
            </Typography>
          )}
          <Button 
            variant="outlined" 
            onClick={handleLanguageChange} 
            sx={{ my: 1, textTransform: 'uppercase' }}
          >
            {i18n.language}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;