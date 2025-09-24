import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import WebApp from '@twa-dev/sdk';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ForumIcon from '@mui/icons-material/Forum';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

function TariffModal({ open, onClose, tariff }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!tariff) return null;

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const handleContact = () => {
    if (WebApp && WebApp.openTelegramLink) {
      WebApp.openTelegramLink('https://t.me/SymonPerty');
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs" PaperProps={{ sx: { bgcolor: 'background.default' } }}>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">{t('tariff_modal_title', { title: tariff.title })}</Typography>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers sx={{ borderColor: 'rgba(244, 10, 10, 0.2)' }}>
        <Typography gutterBottom>{tariff.description}</Typography>
        <Typography variant="h4" color="primary.main" sx={{ my: 2, textAlign: 'center' }}>{tariff.price}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          {t('tariff_modal_next_step')}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: '16px 24px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button fullWidth variant="contained" startIcon={<ForumIcon />} onClick={handleContact}>
          {t('tariff_modal_chat_button')}
        </Button>
        <Button fullWidth variant="outlined" startIcon={<DescriptionIcon />} onClick={() => handleNavigate('/application')}>
          {t('tariff_modal_form_button')}
        </Button>
        <Button fullWidth variant="outlined" startIcon={<AccountBalanceWalletIcon />} onClick={() => handleNavigate('/finance')}>
          {t('tariff_modal_finance_button')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TariffModal;