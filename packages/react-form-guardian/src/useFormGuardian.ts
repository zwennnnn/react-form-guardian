import { useState, useCallback, useEffect } from 'react';
import { FormConfig, FormState, FormGuardianHook } from './types';

const useFormGuardian = (config: FormConfig): FormGuardianHook => {
 
  const initialState: FormState = {
    values: Object.keys(config.fields).reduce((acc, fieldName) => ({
      ...acc,
      [fieldName]: config.fields[fieldName].initialValue ?? ''
    }), {}),
    errors: {},
    touched: {},
    isSubmitting: false,
    isDirty: false,
    isValid: true
  };

  const [state, setState] = useState<FormState>(initialState);


  const validateField = useCallback((fieldName: string, value: any) => {
    const fieldConfig = config.fields[fieldName];
    const errors: string[] = [];

    
    if (fieldConfig.required && !value) {
      errors.push(fieldConfig.requiredMessage || 'Bu alan zorunludur');
    }

    
    if (value && fieldConfig.rules) {
      fieldConfig.rules.forEach(rule => {
        if (!rule.validator(value)) {
          errors.push(rule.message);
        }
      });
    }

    return errors;
  }, [config.fields]);


  const validateForm = useCallback(() => {
    const errors: Record<string, string[]> = {};
    let isValid = true;

    Object.keys(config.fields).forEach(fieldName => {
      const fieldErrors = validateField(fieldName, state.values[fieldName]);
      if (fieldErrors.length > 0) {
        errors[fieldName] = fieldErrors;
        isValid = false;
      }
    });

    setState(prev => ({
      ...prev,
      errors,
      isValid
    }));

    return isValid;
  }, [config.fields, state.values, validateField]);


  const handleChange = useCallback((fieldName: string, value: any) => {
    setState(prev => {
      const errors = validateField(fieldName, value);
      return {
        ...prev,
        values: { ...prev.values, [fieldName]: value },
        errors: { ...prev.errors, [fieldName]: errors },
        isDirty: true,
        isValid: Object.values({ ...prev.errors, [fieldName]: errors })
          .every(fieldErrors => !fieldErrors || fieldErrors.length === 0)
      };
    });
  }, [validateField]);


  const handleBlur = useCallback((fieldName: string) => {
    setState(prev => {
      const errors = validateField(fieldName, prev.values[fieldName]);
      return {
        ...prev,
        touched: { ...prev.touched, [fieldName]: true },
        errors: { ...prev.errors, [fieldName]: errors }
      };
    });
  }, [validateField]);


  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    const isValid = validateForm();
    if (!isValid) {
    
      setState(prev => ({
        ...prev,
        touched: Object.keys(config.fields).reduce((acc, fieldName) => ({
          ...acc,
          [fieldName]: true
        }), {})
      }));
      return;
    }
    
    setState(prev => ({ ...prev, isSubmitting: true }));
    
    try {
      await config.onSubmit?.(state.values);
    } finally {
      setState(prev => ({ ...prev, isSubmitting: false }));
    }
  }, [config.onSubmit, state.values, validateForm]);

 
  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    ...state,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue: handleChange,
    setFieldTouched: handleBlur
  };
};

export default useFormGuardian;