import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import WebApp from '@twa-dev/sdk';
import { Box, Typography, TextField, Button, Paper, Stepper, Step, StepLabel, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import SubmittedApplication from '../components/SubmittedApplication.jsx';
import { useUserStore } from '../store';

// ... (getStepContent и другие константы остаются без изменений)

function ApplicationForm() {
  const { t } = useTranslation();
  const user = useUserStore((state) => state.user);
  const [applications, setApplications] = useState(() => { /* ... */ });
  const [showForm, setShowForm] = useState(applications.length === 0);
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false); // Состояние для индикатора загрузки

  const { control, handleSubmit, trigger, formState: { errors } } = useForm();

  const handleNext = async () => { /* ... */ };
  const handleBack = () => setActiveStep((prev) => prev - 1);

  // ГЛАВНОЕ ИЗМЕНЕНИЕ: Логика отправки формы
  const onSubmit = async (data) => {
    setIsSubmitting(true); // Включаем индикатор загрузки
    
    const submissionData = {
      ...data,
      userId: user?.id || 'guest' // Добавляем ID пользователя
    };

    try {
      // Отправляем данные на наш бэкенд
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      
      // Обновляем состояние на фронтенде
      const newApplication = { ...data, id: result.application.id, date: new Date().toLocaleDateString('ru-RU') };
      const updatedApplications = [...applications, newApplication];
      setApplications(updatedApplications);
      localStorage.setItem('applications', JSON.stringify(updatedApplications));
      setShowForm(false);

    } catch (error) {
      console.error("Failed to submit form:", error);
      WebApp.showAlert('Произошла ошибка при отправке. Попробуйте снова.');
    } finally {
      setIsSubmitting(false); // Выключаем индикатор загрузки
    }
  };
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* ... (Верхняя часть без изменений) ... */}
        <AnimatePresence mode="wait">
            {showForm ? (
            <motion.div key="form" /* ... */>
                {/* ... (Описание и Stepper без изменений) ... */}
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {getStepContent(activeStep, control, errors)}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button disabled={activeStep === 0 || isSubmitting} onClick={handleBack}>{t('application_form_button_back')}</Button>
                        {activeStep === steps.length - 1 ? (
                            <Button variant="contained" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : t('application_form_button_submit')}
                            </Button>
                        ) : (
                            <Button variant="contained" onClick={handleNext}>{t('application_form_button_next')}</Button>
                        )}
                    </Box>
                </Box>
            </motion.div>
            ) : (
            <motion.div key="applications" /* ... */ >
                {/* ... (Отображение отправленных заявок без изменений) ... */}
            </motion.div>
            )}
      </AnimatePresence>
    </motion.div>
  );
}

export default ApplicationForm;