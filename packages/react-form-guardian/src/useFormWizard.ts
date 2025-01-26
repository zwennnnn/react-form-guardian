import { useState, useCallback, useMemo } from 'react';
import { WizardConfig, WizardState, FormWizardHook, FormConfig } from './types';
import useFormGuardian from './useFormGuardian';
import { useWizardTheme } from './themes/useWizardTheme';

export const useFormWizard = (
  config: WizardConfig,
  formConfig: FormConfig
): FormWizardHook => {
  const form = useFormGuardian(formConfig);
  
 
  const { theme, themeMode, toggleTheme, updateTheme } = useWizardTheme({
    initialTheme: config.theme,
    mode: config.themeMode
  });


  const [wizardState, setWizardState] = useState<WizardState>(() => {
    const initialStepId = config.initialStep || config.steps[0].id;
    return {
      currentStepId: initialStepId,
      completedSteps: [],
      visitedSteps: [initialStepId],
      isFirstStep: initialStepId === config.steps[0].id,
      isLastStep: initialStepId === config.steps[config.steps.length - 1].id,
      progress: 0
    };
  });

 
  const [editingStepId, setEditingStepId] = useState<string | null>(null);

 
  const currentStep = useMemo(() => 
    config.steps.find(step => step.id === wizardState.currentStepId),
    [wizardState.currentStepId, config.steps]
  );


  const isFirstStep = currentStep?.id === config.steps[0].id;
  const isLastStep = currentStep?.id === config.steps[config.steps.length - 1].id;


  const validateStep = useCallback(async (stepId: string): Promise<boolean> => {
    const step = config.steps.find(s => s.id === stepId);
    if (!step) return false;

   
    const isValid = step.fields.every(fieldName => {
     
      const value = form.values[fieldName];
      const isEmpty = value === undefined || value === null || value === '';
      
   
      if (isEmpty && !step.isOptional) {
        return false;
      }
      
   
      const errors = form.errors[fieldName];
      return !errors || errors.length === 0;
    });

   
    if (!isValid) {
      step.fields.forEach(fieldName => {
        form.setFieldTouched(fieldName, true);
      });
    }

    return isValid;
  }, [form.errors, form.values, form.setFieldTouched, config.steps]);


  const calculateProgress = useCallback(() => {
    const totalSteps = config.steps.length;
    const currentIndex = config.steps.findIndex(s => s.id === wizardState.currentStepId);
    
   
    if (wizardState.completedSteps.includes(config.steps[config.steps.length - 1].id)) {
      return 100;
    }
    

    return Math.round(((currentIndex + 1) / totalSteps) * 100);
  }, [wizardState.currentStepId, wizardState.completedSteps, config.steps]);


  const nextStep = useCallback(async () => {
    if (!currentStep) return;


    const isValid = await validateStep(currentStep.id);
    if (!isValid && !currentStep.isOptional) {
      return; 
    }

    const currentIndex = config.steps.findIndex(s => s.id === currentStep.id);
    let nextStep = config.steps[currentIndex + 1];

    
    while (nextStep && nextStep.skipIf && nextStep.skipIf(form.values)) {
      const nextIndex = config.steps.findIndex(s => s.id === nextStep.id);
      nextStep = config.steps[nextIndex + 1];
    }
    
    if (!nextStep) return;

    
    if (config.onStepChange) {
      const canChange = await config.onStepChange(
        currentStep.id,
        nextStep.id,
        form.values
      );
      if (!canChange) return;
    }

 
    const newCompletedSteps = [...wizardState.completedSteps];
    if (!newCompletedSteps.includes(currentStep.id)) {
      newCompletedSteps.push(currentStep.id);
    }

  
    setWizardState(prev => ({
      ...prev,
      currentStepId: nextStep.id,
      completedSteps: newCompletedSteps,
      visitedSteps: [...new Set([...prev.visitedSteps, nextStep.id])],
      isFirstStep: false,
      isLastStep: nextStep.id === config.steps[config.steps.length - 1].id,
      progress: Math.round(((currentIndex + 2) / config.steps.length) * 100)
    }));
  }, [currentStep, config, form.values, validateStep]);


  const previousStep = useCallback(() => {
    if (!currentStep) return;

    const currentIndex = config.steps.findIndex(s => s.id === currentStep.id);
    if (currentIndex <= 0) return;

    let prevStep = config.steps[currentIndex - 1];
    
    
    while (prevStep && (
      (prevStep.showIf && !prevStep.showIf(form.values)) || 
      (prevStep.skipIf && prevStep.skipIf(form.values))
    )) {
      const prevIndex = config.steps.findIndex(s => s.id === prevStep.id);
      if (prevIndex <= 0) return; 
      prevStep = config.steps[prevIndex - 1];
    }
    
    setWizardState(prev => ({
      ...prev,
      currentStepId: prevStep.id,
      isFirstStep: prevStep.id === config.steps[0].id,
      isLastStep: false,
      progress: Math.round(((currentIndex) / config.steps.length) * 100)
    }));
  }, [currentStep, config.steps, form.values]);


  const goToStep = useCallback(async (stepId: string) => {
    const targetStep = config.steps.find(s => s.id === stepId);
    if (!targetStep || !currentStep) return;


    const isValid = await validateStep(currentStep.id);
    if (!isValid && !currentStep.isOptional) return;

  
    if (config.onStepChange) {
      const canChange = await config.onStepChange(
        currentStep.id,
        targetStep.id,
        form.values
      );
      if (!canChange) return;
    }

    setWizardState(prev => ({
      ...prev,
      currentStepId: stepId,
      visitedSteps: [...new Set([...prev.visitedSteps, stepId])],
      isFirstStep: stepId === config.steps[0].id,
      isLastStep: stepId === config.steps[config.steps.length - 1].id
    }));
  }, [currentStep, config, form.values, validateStep]);


  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    

    if (!wizardState.isLastStep) {
      await nextStep();
      return;
    }
    
    const isValid = await validateStep(currentStep?.id || '');
    if (!isValid) {
 
      const currentFields = currentStep?.fields || [];
      currentFields.forEach(fieldName => {
        form.setFieldTouched(fieldName, true);
      });
      return;
    }


    let formData = { ...form.values };

    
    setWizardState(prev => {
      const newCompletedSteps = [...prev.completedSteps];
      if (!newCompletedSteps.includes(currentStep?.id || '')) {
        newCompletedSteps.push(currentStep?.id || '');
      }
      return {
        ...prev,
        completedSteps: newCompletedSteps,
        progress: 100
      };
    });

    try {
    
      if (config.csrf?.cookieName) {
        let csrfToken: string | undefined;
        
        if (config.csrf?.getToken) {
          csrfToken = await config.csrf.getToken();
        } else {
          csrfToken = document.cookie
            .split('; ')
            .find(row => row.startsWith(config.csrf?.cookieName + '='))
            ?.split('=')[1];
        }

        if (csrfToken) {
    
          formData = {
            ...formData,
            [config.csrf?.tokenKey || '_csrf']: csrfToken
          };

     
          if (config.csrf?.headerName) {
            const headers = new Headers();
            headers.append(config.csrf?.headerName, csrfToken);
            
            if (config.onComplete) {
              await config.onComplete({
                data: formData,
                headers
              });
            }
            return;
          }
        }
      }

      
      if (config.onComplete) {
        await config.onComplete(formData);
      }
    } catch (error) {
      console.error('Form gönderilirken hata:', error);
    }
  }, [currentStep, wizardState.isLastStep, config.onComplete, config.csrf, form.values, validateStep, form.setFieldTouched, nextStep]);


  const handleEditStep = (stepId: string) => {
    setEditingStepId(stepId);
    const stepIndex = config.steps.findIndex(s => s.id === stepId);
    setWizardState(prev => ({
      ...prev,
      currentStepId: stepId,
      progress: Math.round(((stepIndex + 1) / config.steps.length) * 100)
    }));
  };


  const returnToSummary = async () => {
    const summaryStep = config.steps.find(s => s.isSummary);
    if (summaryStep) {
      setEditingStepId(null);
      setWizardState(prev => ({
        ...prev,
        currentStepId: summaryStep.id,
        progress: 100
      }));
    }
  };

  
  const isCurrentStepSummary = config.steps.find(s => s.id === wizardState.currentStepId)?.isSummary || false;

  return {
    ...form,
    nextStep,
    previousStep,
    goToStep,
    handleSubmit,
    wizardState,
    wizardConfig: config,
    theme,
    themeMode,
    toggleTheme,
    updateTheme,
    isCurrentStepSummary,
    editingStepId,
    handleEditStep,
    returnToSummary,
    isFirstStep,
    isLastStep
  };
};

export default useFormWizard; 