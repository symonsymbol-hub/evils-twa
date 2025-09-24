import React from 'react';
import { Box, Typography, Paper, Button, List, ListItem, ListItemText, Divider, ListItemIcon } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const transactions = [
  { id: 1, type: 'Пополнение', amount: '+2000$', date: '20.09.2025' },
  { id: 2, type: 'Оплата рекламы VK', amount: '-500$', date: '21.09.2025' },
  { id: 3, type: 'Оплата рекламы TG', amount: '-750$', date: '22.09.2025' },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const itemVariants = { hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } };

function Finance() {
  const { t } = useTranslation();
  return (
    <motion.div initial="hidden" animate="visible" exit={{ opacity: 0 }} variants={containerVariants}>
      <motion.div variants={itemVariants}>
        <Typography variant="h4" gutterBottom>{t('finance_title')}</Typography>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Paper sx={{ p: 3, mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="subtitle1" color="text.secondary">{t('finance_balance')}</Typography>
            <Typography variant="h4" fontWeight="bold">750 $</Typography>
          </Box>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button variant="contained">{t('finance_topup_button')}</Button>
          </motion.div>
        </Paper>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Typography variant="h5" gutterBottom>{t('finance_history')}</Typography>
        <Paper>
          <List>
            {transactions.map((transaction, index) => (
              <motion.div variants={itemVariants} key={transaction.id}>
                <ListItem>
                  <ListItemIcon>
                    {transaction.amount.startsWith('+') 
                      ? <ArrowUpwardIcon sx={{ color: 'success.main' }}/> 
                      : <ArrowDownwardIcon sx={{ color: 'error.main' }}/>}
                  </ListItemIcon>
                  <ListItemText primary={transaction.type} secondary={transaction.date} />
                  <Typography color={transaction.amount.startsWith('+') ? 'success.main' : 'error.main'} fontWeight="bold">
                    {transaction.amount}
                  </Typography>
                </ListItem>
                {index < transactions.length - 1 && <Divider component="li" sx={{ borderColor: 'rgba(244, 10, 10, 0.2)' }} />}
              </motion.div>
            ))}
          </List>
        </Paper>
      </motion.div>
    </motion.div>
  );
}

export default Finance;