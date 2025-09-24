import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import BarChartIcon from '@mui/icons-material/BarChart';

function Analytics() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Paper sx={{ p: 4, textAlign: 'center', maxWidth: 400 }}>
          <BarChartIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }}/>
          <Typography variant="h5" gutterBottom>
            {t('analytics_placeholder_header')}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            {t('analytics_placeholder_desc')}
          </Typography>
          <Button variant="contained" onClick={() => navigate('/application')}>
            {t('analytics_placeholder_button')}
          </Button>
        </Paper>
      </motion.div>
    </Box>
  );
}

export default Analytics;