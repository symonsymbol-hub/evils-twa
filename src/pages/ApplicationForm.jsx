import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import WebApp from '@twa-dev/sdk';
import { Box, Typography, TextField, Button, Paper, Stepper, Step, StepLabel } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import SubmittedApplication from '../components/SubmittedApplication.jsx';

function ApplicationForm() {
  const { t } = useTranslation();

  const steps = [t('application_form_step1'), t('application_form_step2'), t('application_form_step3'), t('application_form_step4')];

  const getStepContent = (step, control, errors) => {
    switch (step) {
      case 0:
        return (
          <>
            <Controller name="contactName" control={control} rules={{ required: true }} render={({ field }) => <TextField {...field} label={t('application_field_name')} error={!!errors.contactName} helperText={errors.contactName ? t('application_field_name_error') : ''} />} />
            <Controller name="telegram" control={control} rules={{ required: true }} render={({ field }) => <TextField {...field} label={t('application_field_telegram')} error={!!errors.telegram} helperText={errors.telegram ? t('application_field_telegram_error') : ''} />} />
            <Controller name="email" control={control} rules={{ required: true }} render={({ field }) => <TextField {...field} type="email" label={t('application_field_email')} error={!!errors.email} helperText={errors.email ? t('application_field_email_error') : ''} />} />
          </>
        );
      case 1:
        return (
          <>
            <Controller name="projectName" control={control} rules={{ required: true }} render={({ field }) => <TextField {...field} label={t('application_field_projectName')} error={!!errors.projectName} helperText={errors.projectName ? t('application_field_projectName_error') : ''} />} />
            <Controller name="projectWebsite" control={control} rules={{ required: true }} render={({ field }) => <TextField {...field} label={t('application_field_projectWebsite')} error={!!errors.projectWebsite} helperText={errors.projectWebsite ? t('application_field_projectWebsite_error') : ''} />} />
            <Controller name="projectNiche" control={control} rules={{ required: true }} render={({ field }) => <TextField {...field} label={t('application_field_projectNiche')} error={!!errors.projectNiche} helperText={errors.projectNiche ? t('application_field_projectNiche_error') : ''} />} />
          </>
        );
      case 2:
          return (
              <>
                <Controller name="productToAdvertise" control={control} rules={{ required: true }} render={({ field }) => <TextField {...field} multiline rows={4} label={t('application_field_productToAdvertise')} error={!!errors.productToAdvertise} helperText={errors.productToAdvertise ? t('application_field_productToAdvertise_error') : ''} />} />
                <Controller name="usp" control={control} rules={{ required: true }} render={({ field }) => <TextField {...field} multiline rows={4} label={t('application_field_usp')} error={!!errors.usp} helperText={errors.usp ? t('application_field_usp_error') : ''} />} />
              </>
          );
      case 3:
          return (
              <>
                <Controller name="targetAudience" control={control} rules={{ required: true }} render={({ field }) => <TextField {...field} multiline rows={4} label={t('application_field_targetAudience')} error={!!errors.targetAudience} helperText={errors.targetAudience ? t('application_field_targetAudience_error') : ''} />} />
                <Controller name="budget" control={control} rules={{ required: true }} render={({ field }) => <TextField {...field} label={t('application_field_budget')} error={!!errors.budget} helperText={errors.budget ? t('application_field_budget_error') : ''} />} />
              </>
          );
      default:
        return 'Unknown step';
    }
  };

  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem('applications');
      return saved ? JSON.parse(saved) : [];
    } catch (error) { return []; }
  });
  
  const [showForm, setShowForm] = useState(applications.length === 0);
  const [activeStep, setActiveStep] = useState(0);

  const { control, handleSubmit, trigger, formState: { errors } } = useForm();

  const handleNext = async () => {
    const fieldsByStep = [['contactName', 'telegram', 'email'], ['projectName', 'projectWebsite', 'projectNiche'], ['productToAdvertise', 'usp'], ['targetAudience', 'budget']];
    const isValid = await trigger(fieldsByStep[activeStep]);
    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const onSubmit = (data) => {
    const newApplication = { ...data, id: Date.now(), date: new Date().toLocaleDateString('ru-RU') };
    const updatedApplications = [...applications, newApplication];
    setApplications(updatedApplications);
    localStorage.setItem('applications', JSON.stringify(updatedApplications));
    setShowForm(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Typography variant="h4" gutterBottom>
          {applications.length > 0 && !showForm ? t('application_form_your_applications') : t('application_form_header')}
        </Typography>

        <AnimatePresence mode="wait">
            {showForm ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Typography color="text.secondary" sx={{ mb: 4 }}>
                  {t('application_form_desc')}
                </Typography>
                <Paper sx={{ p: { xs: 2, md: 3 }, mt: 2 }}>
                    <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                        {steps.map((label) => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
                    </Stepper>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {getStepContent(activeStep, control, errors)}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Button disabled={activeStep === 0} onClick={handleBack}>{t('application_form_button_back')}</Button>
                            {activeStep === steps.length - 1 ? (
                                <Button variant="contained" type="submit">{t('application_form_button_submit')}</Button>
                            ) : (
                                <Button variant="contained" onClick={handleNext}>{t('application_form_button_next')}</Button>
                            )}
                        </Box>
                    </Box>
                </Paper>
            </motion.div>
            ) : (
            <motion.div key="applications" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                {applications.map(app => (
                    <SubmittedApplication key={app.id} application={app} />
                ))}
                </Box>
                {applications.length < 3 && (
                <Button variant="contained" onClick={() => setShowForm(true)} sx={{ mt: 4, display: 'block', mx: 'auto' }}>
                    {t('application_form_button_new_offer')} ({applications.length}/3)
                </Button>
                )}
            </motion.div>
            )}
      </AnimatePresence>
    </motion.div>
  );
}

export default ApplicationForm;