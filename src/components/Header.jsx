import React from 'react';
import { AppBar, Toolbar, Box, Typography, Button, Avatar } from '@mui/material';
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
      <Toolbar>
        {/* Левая часть: Логотип */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Logo />
            <Typography variant="h5" sx={{ color: 'primary.main', display: { xs: 'none', sm: 'block' } }}>
              EVILS
            </Typography>
          </Box>
        </Box>

        {/* Центральная часть: Аватар и Имя */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
          {user ? (
            <>
              <Avatar src={user.photo_url} sx={{ width: 32, height: 32 }} />
              <Typography sx={{ display: { xs: 'none', md: 'block' } }}>
                {user.first_name} {user.last_name || ''}
              </Typography>
            </>
          ) : (
             <Typography sx={{ display: { xs: 'none', md: 'block' }, opacity: 0.5 }}>
              Guest
            </Typography>
          )}
        </Box>

        {/* Правая часть: Переключатель языка */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
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