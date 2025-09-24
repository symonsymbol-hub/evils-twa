import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WebApp from '@twa-dev/sdk';

function SubmittedApplication({ application }) {
  const { t } = useTranslation();

  const handleAddInfo = (event) => {
    event.preventDefault();
    const additionalInfo = event.target.elements.additionalInfo.value;
    if (!additionalInfo.trim()) return;

    const message = `--- Доп. инфо к заявке: ${application.projectName}--- \n\n${additionalInfo}`;

    if (WebApp && WebApp.sendData) {
        WebApp.sendData(message.trim());
        WebApp.showAlert('Дополнительная информация отправлена.');
    } else {
        alert('Дополнительная информация отправлена.');
    }
    event.target.elements.additionalInfo.value = '';
  };

  return (
    <Accordion sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <Typography fontWeight="bold">{application.projectName}</Typography>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" color="text.secondary">{application.date}</Typography>
            <Typography variant="body2" color="primary">{application.budget}</Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ borderTop: '1px solid rgba(244, 10, 10, 0.2)' }}>
        <Typography color="text.secondary" gutterBottom>
          {t('submitted_app_add_info_desc')}
        </Typography>
        <Box component="form" onSubmit={handleAddInfo} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            name="additionalInfo"
            fullWidth
            multiline
            rows={4}
            label={t('submitted_app_add_info_label')}
            variant="outlined"
            inputProps={{ maxLength: 500 }}
          />
          <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-end' }}>
            {t('submitted_app_add_info_button')}
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default SubmittedApplication;