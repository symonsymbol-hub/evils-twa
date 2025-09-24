import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import TariffModal from '../components/TariffModal';
import CasinoIcon from '@mui/icons-material/Casino';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

function Dashboard() {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState(null);

  const spheres = [
    { title: t('dashboard_sphere_gambling_title'), icon: <CasinoIcon fontSize="large" />, description: t('dashboard_sphere_gambling_desc') },
    { title: t('dashboard_sphere_onlyfans_title'), icon: <CameraAltIcon fontSize="large" />, description: t('dashboard_sphere_onlyfans_desc') },
    { title: t('dashboard_sphere_ecommerce_title'), icon: <ShoppingCartIcon fontSize="large" />, description: t('dashboard_sphere_ecommerce_desc') },
  ];

  const tariffs = [
    { title: t('tariff_test_title'), price: t('tariff_test_price'), description: t('tariff_test_desc'), features: [t('tariff_test_feature1'), t('tariff_test_feature2'), t('tariff_test_feature3'), t('tariff_test_feature4')] },
    { title: t('tariff_referrals_title'), price: t('tariff_referrals_price'), description: t('tariff_referrals_desc'), features: [t('tariff_referrals_feature1'), t('tariff_referrals_feature2'), t('tariff_referrals_feature3'), t('tariff_referrals_feature4')] },
    { title: t('tariff_clients_title'), price: t('tariff_clients_price'), description: t('tariff_clients_desc'), features: [t('tariff_clients_feature1'), t('tariff_clients_feature2'), t('tariff_clients_feature3'), t('tariff_clients_feature4')] },
  ];

  const handleTariffClick = (tariff) => {
    setSelectedTariff(tariff);
    setModalOpen(true);
  };

  return (
    <>
      <motion.div initial="hidden" animate="visible" exit={{ opacity: 0 }} variants={containerVariants}>
        <motion.div variants={itemVariants}>
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 1 }}>EVILS</Typography>
          <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', mb: 6 }}>
            {t('dashboard_greeting_main')}
          </Typography>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Typography variant="h4" gutterBottom>{t('dashboard_spheres_header')}</Typography>
          <Grid container spacing={3} mb={6}>
            {spheres.map((sphere) => (
              <Grid item xs={12} md={4} key={sphere.title}>
                <motion.div whileHover={{ y: -5, scale: 1.02 }}>
                  <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                    {sphere.icon}
                    <Typography variant="h6" sx={{ mt: 2 }}>{sphere.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{sphere.description}</Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Typography variant="h4" gutterBottom>{t('dashboard_tariffs_header')}</Typography>
          <Grid container spacing={3}>
            {tariffs.map((tariff) => (
              <Grid item xs={12} md={4} key={tariff.title}>
                <motion.div whileHover={{ y: -5, scale: 1.02 }} style={{ height: '100%' }}>
                  <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%', borderColor: tariff.title === t('tariff_referrals_title') ? 'primary.main' : 'rgba(244, 10, 10, 0.2)', boxShadow: tariff.title === t('tariff_referrals_title') ? '0 0 30px rgba(244, 10, 10, 0.4)' : '0 0 15px rgba(244, 10, 10, 0.05)'}}>
                    <Typography variant="h5">{tariff.title}</Typography>
                    <Typography variant="h4" fontWeight="bold" color="primary" sx={{ my: 2 }}>{tariff.price}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, mb: 3 }}>
                      {tariff.description}
                    </Typography>
                    <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none', mb: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {tariff.features.map(feature => <li key={feature}>✅ {feature}</li>)}
                    </Box>
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Button variant="contained" onClick={() => handleTariffClick(tariff)}>
                        {t('choose_tariff_button')}
                      </Button>
                    </motion.div>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </motion.div>
      <TariffModal open={modalOpen} onClose={() => setModalOpen(false)} tariff={selectedTariff} />
    </>
  );
}

export default Dashboard;