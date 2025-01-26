"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  StepSummary: () => StepSummary,
  ageRule: () => ageRule,
  cardExpiryRule: () => cardExpiryRule,
  corporateTheme: () => corporateTheme,
  creditCardRule: () => creditCardRule,
  cvcRule: () => cvcRule,
  darkTheme: () => darkTheme,
  emailRule: () => emailRule,
  fileSizeRule: () => fileSizeRule,
  fileTypeRule: () => fileTypeRule,
  gameTheme: () => gameTheme,
  gradientTheme: () => gradientTheme,
  ibanRule: () => ibanRule,
  lightTheme: () => lightTheme,
  minimalTheme: () => minimalTheme,
  modernTheme: () => modernTheme,
  neonTheme: () => neonTheme,
  pastelTheme: () => pastelTheme,
  phoneRule: () => phoneRule,
  postalCodeRule: () => postalCodeRule,
  retroTheme: () => retroTheme,
  strongPasswordRule: () => strongPasswordRule,
  tcKimlikRule: () => tcKimlikRule,
  useFormGuardian: () => useFormGuardian_default,
  useFormWizard: () => useFormWizard_default,
  vergiNoRule: () => vergiNoRule,
  warmTheme: () => warmTheme,
  websiteRule: () => websiteRule
});
module.exports = __toCommonJS(index_exports);

// src/useFormGuardian.ts
var import_react = require("react");
var useFormGuardian = (config) => {
  const initialState = {
    values: Object.keys(config.fields).reduce((acc, fieldName) => ({
      ...acc,
      [fieldName]: config.fields[fieldName].initialValue ?? ""
    }), {}),
    errors: {},
    touched: {},
    isSubmitting: false,
    isDirty: false,
    isValid: true
  };
  const [state, setState] = (0, import_react.useState)(initialState);
  const validateField = (0, import_react.useCallback)((fieldName, value) => {
    const fieldConfig = config.fields[fieldName];
    const errors = [];
    if (fieldConfig.required && !value) {
      errors.push(fieldConfig.requiredMessage || "Bu alan zorunludur");
    }
    if (value && fieldConfig.rules) {
      fieldConfig.rules.forEach((rule) => {
        if (!rule.validator(value)) {
          errors.push(rule.message);
        }
      });
    }
    return errors;
  }, [config.fields]);
  const validateForm = (0, import_react.useCallback)(() => {
    const errors = {};
    let isValid = true;
    Object.keys(config.fields).forEach((fieldName) => {
      const fieldErrors = validateField(fieldName, state.values[fieldName]);
      if (fieldErrors.length > 0) {
        errors[fieldName] = fieldErrors;
        isValid = false;
      }
    });
    setState((prev) => ({
      ...prev,
      errors,
      isValid
    }));
    return isValid;
  }, [config.fields, state.values, validateField]);
  const handleChange = (0, import_react.useCallback)((fieldName, value) => {
    setState((prev) => {
      const errors = validateField(fieldName, value);
      return {
        ...prev,
        values: { ...prev.values, [fieldName]: value },
        errors: { ...prev.errors, [fieldName]: errors },
        isDirty: true,
        isValid: Object.values({ ...prev.errors, [fieldName]: errors }).every((fieldErrors) => !fieldErrors || fieldErrors.length === 0)
      };
    });
  }, [validateField]);
  const handleBlur = (0, import_react.useCallback)((fieldName) => {
    setState((prev) => {
      const errors = validateField(fieldName, prev.values[fieldName]);
      return {
        ...prev,
        touched: { ...prev.touched, [fieldName]: true },
        errors: { ...prev.errors, [fieldName]: errors }
      };
    });
  }, [validateField]);
  const handleSubmit = (0, import_react.useCallback)(async (e) => {
    e?.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
      setState((prev) => ({
        ...prev,
        touched: Object.keys(config.fields).reduce((acc, fieldName) => ({
          ...acc,
          [fieldName]: true
        }), {})
      }));
      return;
    }
    setState((prev) => ({ ...prev, isSubmitting: true }));
    try {
      await config.onSubmit?.(state.values);
    } finally {
      setState((prev) => ({ ...prev, isSubmitting: false }));
    }
  }, [config.onSubmit, state.values, validateForm]);
  const reset = (0, import_react.useCallback)(() => {
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
var useFormGuardian_default = useFormGuardian;

// src/useFormWizard.ts
var import_react3 = require("react");

// src/themes/useWizardTheme.ts
var import_react2 = require("react");

// src/themes/defaultThemes.ts
var lightTheme = {
  colors: {
    primary: "#007bff",
    secondary: "#6c757d",
    success: "#28a745",
    error: "#dc3545",
    background: "#ffffff",
    text: "#212529",
    border: "#dee2e6"
  },
  progressBar: {
    height: "8px",
    background: "#e9ecef",
    fill: "#007bff",
    borderRadius: "4px"
  },
  stepIndicator: {
    size: "32px",
    activeColor: "#007bff",
    inactiveColor: "#6c757d",
    completedColor: "#28a745",
    background: "#ffffff",
    borderRadius: "50%"
  },
  button: {
    padding: "10px 20px",
    borderRadius: "4px",
    fontSize: "16px"
  },
  form: {
    fieldSpacing: "20px",
    labelSpacing: "8px",
    inputHeight: "40px",
    inputPadding: "8px 12px",
    inputBorderRadius: "4px",
    inputBorderColor: "#ced4da",
    inputFocusBorderColor: "#80bdff",
    inputErrorBorderColor: "#dc3545",
    fontSize: "16px",
    errorFontSize: "14px",
    labelFontSize: "16px"
  }
};
var darkTheme = {
  colors: {
    primary: "#0d6efd",
    secondary: "#6c757d",
    success: "#198754",
    error: "#dc3545",
    background: "#212529",
    text: "#f8f9fa",
    border: "#495057"
  },
  progressBar: {
    height: "8px",
    background: "#343a40",
    fill: "#0d6efd",
    borderRadius: "4px"
  },
  stepIndicator: {
    size: "32px",
    activeColor: "#0d6efd",
    inactiveColor: "#6c757d",
    completedColor: "#198754",
    background: "#343a40",
    borderRadius: "50%"
  },
  button: {
    padding: "10px 20px",
    borderRadius: "4px",
    fontSize: "16px"
  },
  form: {
    fieldSpacing: "20px",
    labelSpacing: "8px",
    inputHeight: "40px",
    inputPadding: "8px 12px",
    inputBorderRadius: "4px",
    inputBorderColor: "#495057",
    inputFocusBorderColor: "#0d6efd",
    inputErrorBorderColor: "#dc3545",
    fontSize: "16px",
    errorFontSize: "14px",
    labelFontSize: "16px"
  }
};
var modernTheme = {
  colors: {
    primary: "#3b82f6",
    secondary: "#64748b",
    success: "#22c55e",
    error: "#ef4444",
    background: "#ffffff",
    text: "#1e293b",
    border: "#e2e8f0"
  },
  progressBar: {
    height: "6px",
    background: "#f1f5f9",
    fill: "#3b82f6",
    borderRadius: "8px"
  },
  stepIndicator: {
    size: "36px",
    activeColor: "#3b82f6",
    inactiveColor: "#64748b",
    completedColor: "#22c55e",
    background: "#f8fafc",
    borderRadius: "12px"
  },
  button: {
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "16px"
  },
  form: {
    fieldSpacing: "24px",
    labelSpacing: "8px",
    inputHeight: "44px",
    inputPadding: "12px 16px",
    inputBorderRadius: "8px",
    inputBorderColor: "#e2e8f0",
    inputFocusBorderColor: "#3b82f6",
    inputErrorBorderColor: "#ef4444",
    fontSize: "16px",
    errorFontSize: "14px",
    labelFontSize: "16px"
  }
};
var warmTheme = {
  colors: {
    primary: "#f97316",
    secondary: "#78716c",
    success: "#84cc16",
    error: "#ef4444",
    background: "#fffbeb",
    text: "#44403c",
    border: "#fed7aa"
  },
  progressBar: {
    height: "8px",
    background: "#fef3c7",
    fill: "#f97316",
    borderRadius: "16px"
  },
  stepIndicator: {
    size: "40px",
    activeColor: "#f97316",
    inactiveColor: "#78716c",
    completedColor: "#84cc16",
    background: "#fff7ed",
    borderRadius: "20px"
  },
  button: {
    padding: "12px 24px",
    borderRadius: "16px",
    fontSize: "16px"
  },
  form: {
    fieldSpacing: "24px",
    labelSpacing: "8px",
    inputHeight: "44px",
    inputPadding: "12px 16px",
    inputBorderRadius: "12px",
    inputBorderColor: "#fed7aa",
    inputFocusBorderColor: "#f97316",
    inputErrorBorderColor: "#ef4444",
    fontSize: "16px",
    errorFontSize: "14px",
    labelFontSize: "16px"
  }
};
var neonTheme = {
  colors: {
    primary: "#22d3ee",
    secondary: "#94a3b8",
    success: "#4ade80",
    error: "#fb7185",
    background: "#0f172a",
    text: "#f8fafc",
    border: "#1e293b"
  },
  progressBar: {
    height: "6px",
    background: "#1e293b",
    fill: "#22d3ee",
    borderRadius: "4px"
  },
  stepIndicator: {
    size: "36px",
    activeColor: "#22d3ee",
    inactiveColor: "#94a3b8",
    completedColor: "#4ade80",
    background: "#1e293b",
    borderRadius: "8px"
  },
  button: {
    padding: "12px 24px",
    borderRadius: "4px",
    fontSize: "16px"
  },
  form: {
    fieldSpacing: "24px",
    labelSpacing: "8px",
    inputHeight: "44px",
    inputPadding: "12px 16px",
    inputBorderRadius: "4px",
    inputBorderColor: "#1e293b",
    inputFocusBorderColor: "#22d3ee",
    inputErrorBorderColor: "#fb7185",
    fontSize: "16px",
    errorFontSize: "14px",
    labelFontSize: "16px"
  }
};
var pastelTheme = {
  colors: {
    primary: "#a78bfa",
    secondary: "#94a3b8",
    success: "#86efac",
    error: "#fca5a5",
    background: "#f8fafc",
    text: "#334155",
    border: "#e2e8f0"
  },
  progressBar: {
    height: "8px",
    background: "#f1f5f9",
    fill: "#a78bfa",
    borderRadius: "16px"
  },
  stepIndicator: {
    size: "36px",
    activeColor: "#a78bfa",
    inactiveColor: "#94a3b8",
    completedColor: "#86efac",
    background: "#ffffff",
    borderRadius: "18px"
  },
  button: {
    padding: "12px 24px",
    borderRadius: "24px",
    fontSize: "16px"
  },
  form: {
    fieldSpacing: "24px",
    labelSpacing: "8px",
    inputHeight: "44px",
    inputPadding: "12px 16px",
    inputBorderRadius: "16px",
    inputBorderColor: "#e2e8f0",
    inputFocusBorderColor: "#a78bfa",
    inputErrorBorderColor: "#fca5a5",
    fontSize: "16px",
    errorFontSize: "14px",
    labelFontSize: "16px"
  }
};
var retroTheme = {
  colors: {
    primary: "#fbbf24",
    secondary: "#6b7280",
    success: "#34d399",
    error: "#f87171",
    background: "#1f2937",
    text: "#f9fafb",
    border: "#374151"
  },
  progressBar: {
    height: "4px",
    background: "#374151",
    fill: "#fbbf24",
    borderRadius: "0px"
  },
  stepIndicator: {
    size: "32px",
    activeColor: "#fbbf24",
    inactiveColor: "#6b7280",
    completedColor: "#34d399",
    background: "#374151",
    borderRadius: "0px"
  },
  button: {
    padding: "10px 20px",
    borderRadius: "0px",
    fontSize: "16px"
  },
  form: {
    fieldSpacing: "20px",
    labelSpacing: "8px",
    inputHeight: "40px",
    inputPadding: "8px 12px",
    inputBorderRadius: "0px",
    inputBorderColor: "#374151",
    inputFocusBorderColor: "#fbbf24",
    inputErrorBorderColor: "#f87171",
    fontSize: "16px",
    errorFontSize: "14px",
    labelFontSize: "16px"
  }
};
var gradientTheme = {
  colors: {
    primary: "#8b5cf6",
    secondary: "#64748b",
    success: "#10b981",
    error: "#ef4444",
    background: "#ffffff",
    text: "#1e293b",
    border: "#e2e8f0"
  },
  progressBar: {
    height: "8px",
    background: "#f1f5f9",
    fill: "linear-gradient(90deg, #8b5cf6 0%, #d946ef 100%)",
    borderRadius: "8px"
  },
  stepIndicator: {
    size: "36px",
    activeColor: "#8b5cf6",
    inactiveColor: "#64748b",
    completedColor: "#10b981",
    background: "#ffffff",
    borderRadius: "8px"
  },
  button: {
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "16px"
  },
  form: {
    fieldSpacing: "24px",
    labelSpacing: "8px",
    inputHeight: "44px",
    inputPadding: "12px 16px",
    inputBorderRadius: "8px",
    inputBorderColor: "#e2e8f0",
    inputFocusBorderColor: "#8b5cf6",
    inputErrorBorderColor: "#ef4444",
    fontSize: "16px",
    errorFontSize: "14px",
    labelFontSize: "16px"
  }
};
var minimalTheme = {
  colors: {
    primary: "#2c3e50",
    secondary: "#7f8c8d",
    success: "#27ae60",
    error: "#c0392b",
    background: "#ffffff",
    text: "#2c3e50",
    border: "#bdc3c7"
  },
  progressBar: {
    height: "3px",
    background: "#ecf0f1",
    fill: "#2c3e50",
    borderRadius: "0px"
  },
  stepIndicator: {
    size: "32px",
    activeColor: "#2c3e50",
    inactiveColor: "#7f8c8d",
    completedColor: "#27ae60",
    background: "#ffffff",
    borderRadius: "4px"
  },
  button: {
    padding: "12px 24px",
    borderRadius: "4px",
    fontSize: "14px"
  },
  form: {
    fieldSpacing: "24px",
    labelSpacing: "8px",
    inputHeight: "40px",
    inputPadding: "8px 12px",
    inputBorderRadius: "4px",
    inputBorderColor: "#bdc3c7",
    inputFocusBorderColor: "#2c3e50",
    inputErrorBorderColor: "#c0392b",
    fontSize: "14px",
    errorFontSize: "12px",
    labelFontSize: "14px"
  }
};
var corporateTheme = {
  colors: {
    primary: "#1e40af",
    secondary: "#475569",
    success: "#15803d",
    error: "#b91c1c",
    background: "#ffffff",
    text: "#0f172a",
    border: "#cbd5e1"
  },
  progressBar: {
    height: "6px",
    background: "#f1f5f9",
    fill: "#1e40af",
    borderRadius: "4px"
  },
  stepIndicator: {
    size: "32px",
    activeColor: "#1e40af",
    inactiveColor: "#475569",
    completedColor: "#15803d",
    background: "#ffffff",
    borderRadius: "4px"
  },
  button: {
    padding: "10px 20px",
    borderRadius: "4px",
    fontSize: "14px"
  },
  form: {
    fieldSpacing: "20px",
    labelSpacing: "6px",
    inputHeight: "36px",
    inputPadding: "8px 12px",
    inputBorderRadius: "4px",
    inputBorderColor: "#cbd5e1",
    inputFocusBorderColor: "#1e40af",
    inputErrorBorderColor: "#b91c1c",
    fontSize: "14px",
    errorFontSize: "12px",
    labelFontSize: "14px"
  }
};
var gameTheme = {
  colors: {
    primary: "#7c3aed",
    secondary: "#6b7280",
    success: "#059669",
    error: "#dc2626",
    background: "#18181b",
    text: "#f9fafb",
    border: "#3f3f46"
  },
  progressBar: {
    height: "8px",
    background: "#27272a",
    fill: "#7c3aed",
    borderRadius: "4px"
  },
  stepIndicator: {
    size: "40px",
    activeColor: "#7c3aed",
    inactiveColor: "#6b7280",
    completedColor: "#059669",
    background: "#27272a",
    borderRadius: "8px"
  },
  button: {
    padding: "14px 28px",
    borderRadius: "8px",
    fontSize: "16px"
  },
  form: {
    fieldSpacing: "24px",
    labelSpacing: "8px",
    inputHeight: "48px",
    inputPadding: "12px 16px",
    inputBorderRadius: "8px",
    inputBorderColor: "#3f3f46",
    inputFocusBorderColor: "#7c3aed",
    inputErrorBorderColor: "#dc2626",
    fontSize: "16px",
    errorFontSize: "14px",
    labelFontSize: "16px"
  }
};

// src/themes/useWizardTheme.ts
var useWizardTheme = ({
  initialTheme,
  mode = "light"
} = {}) => {
  const [currentTheme, setCurrentTheme] = (0, import_react2.useState)(() => {
    if (initialTheme) return initialTheme;
    return mode === "dark" ? darkTheme : lightTheme;
  });
  const [themeMode, setThemeMode] = (0, import_react2.useState)(mode);
  const toggleTheme = (0, import_react2.useCallback)(() => {
    setThemeMode((prev) => {
      const newMode = prev === "dark" ? "light" : "dark";
      setCurrentTheme(newMode === "dark" ? darkTheme : lightTheme);
      return newMode;
    });
  }, []);
  const updateTheme = (0, import_react2.useCallback)((newTheme) => {
    setCurrentTheme((prev) => ({
      ...prev,
      ...newTheme
    }));
    setThemeMode("custom");
  }, []);
  return {
    theme: currentTheme,
    themeMode,
    toggleTheme,
    updateTheme
  };
};

// src/useFormWizard.ts
var useFormWizard = (config, formConfig) => {
  const form = useFormGuardian_default(formConfig);
  const { theme, themeMode, toggleTheme, updateTheme } = useWizardTheme({
    initialTheme: config.theme,
    mode: config.themeMode
  });
  const [wizardState, setWizardState] = (0, import_react3.useState)(() => {
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
  const [editingStepId, setEditingStepId] = (0, import_react3.useState)(null);
  const currentStep = (0, import_react3.useMemo)(
    () => config.steps.find((step) => step.id === wizardState.currentStepId),
    [wizardState.currentStepId, config.steps]
  );
  const isFirstStep = currentStep?.id === config.steps[0].id;
  const isLastStep = currentStep?.id === config.steps[config.steps.length - 1].id;
  const validateStep = (0, import_react3.useCallback)(async (stepId) => {
    const step = config.steps.find((s) => s.id === stepId);
    if (!step) return false;
    const isValid = step.fields.every((fieldName) => {
      const value = form.values[fieldName];
      const isEmpty = value === void 0 || value === null || value === "";
      if (isEmpty && !step.isOptional) {
        return false;
      }
      const errors = form.errors[fieldName];
      return !errors || errors.length === 0;
    });
    if (!isValid) {
      step.fields.forEach((fieldName) => {
        form.setFieldTouched(fieldName, true);
      });
    }
    return isValid;
  }, [form.errors, form.values, form.setFieldTouched, config.steps]);
  const calculateProgress = (0, import_react3.useCallback)(() => {
    const totalSteps = config.steps.length;
    const currentIndex = config.steps.findIndex((s) => s.id === wizardState.currentStepId);
    if (wizardState.completedSteps.includes(config.steps[config.steps.length - 1].id)) {
      return 100;
    }
    return Math.round((currentIndex + 1) / totalSteps * 100);
  }, [wizardState.currentStepId, wizardState.completedSteps, config.steps]);
  const nextStep = (0, import_react3.useCallback)(async () => {
    if (!currentStep) return;
    const isValid = await validateStep(currentStep.id);
    if (!isValid && !currentStep.isOptional) {
      return;
    }
    const currentIndex = config.steps.findIndex((s) => s.id === currentStep.id);
    let nextStep2 = config.steps[currentIndex + 1];
    while (nextStep2 && nextStep2.skipIf && nextStep2.skipIf(form.values)) {
      const nextIndex = config.steps.findIndex((s) => s.id === nextStep2.id);
      nextStep2 = config.steps[nextIndex + 1];
    }
    if (!nextStep2) return;
    if (config.onStepChange) {
      const canChange = await config.onStepChange(
        currentStep.id,
        nextStep2.id,
        form.values
      );
      if (!canChange) return;
    }
    const newCompletedSteps = [...wizardState.completedSteps];
    if (!newCompletedSteps.includes(currentStep.id)) {
      newCompletedSteps.push(currentStep.id);
    }
    setWizardState((prev) => ({
      ...prev,
      currentStepId: nextStep2.id,
      completedSteps: newCompletedSteps,
      visitedSteps: [.../* @__PURE__ */ new Set([...prev.visitedSteps, nextStep2.id])],
      isFirstStep: false,
      isLastStep: nextStep2.id === config.steps[config.steps.length - 1].id,
      progress: Math.round((currentIndex + 2) / config.steps.length * 100)
    }));
  }, [currentStep, config, form.values, validateStep]);
  const previousStep = (0, import_react3.useCallback)(() => {
    if (!currentStep) return;
    const currentIndex = config.steps.findIndex((s) => s.id === currentStep.id);
    if (currentIndex <= 0) return;
    let prevStep = config.steps[currentIndex - 1];
    while (prevStep && (prevStep.showIf && !prevStep.showIf(form.values) || prevStep.skipIf && prevStep.skipIf(form.values))) {
      const prevIndex = config.steps.findIndex((s) => s.id === prevStep.id);
      if (prevIndex <= 0) return;
      prevStep = config.steps[prevIndex - 1];
    }
    setWizardState((prev) => ({
      ...prev,
      currentStepId: prevStep.id,
      isFirstStep: prevStep.id === config.steps[0].id,
      isLastStep: false,
      progress: Math.round(currentIndex / config.steps.length * 100)
    }));
  }, [currentStep, config.steps, form.values]);
  const goToStep = (0, import_react3.useCallback)(async (stepId) => {
    const targetStep = config.steps.find((s) => s.id === stepId);
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
    setWizardState((prev) => ({
      ...prev,
      currentStepId: stepId,
      visitedSteps: [.../* @__PURE__ */ new Set([...prev.visitedSteps, stepId])],
      isFirstStep: stepId === config.steps[0].id,
      isLastStep: stepId === config.steps[config.steps.length - 1].id
    }));
  }, [currentStep, config, form.values, validateStep]);
  const handleSubmit = (0, import_react3.useCallback)(async (e) => {
    e?.preventDefault();
    if (!wizardState.isLastStep) {
      await nextStep();
      return;
    }
    const isValid = await validateStep(currentStep?.id || "");
    if (!isValid) {
      const currentFields = currentStep?.fields || [];
      currentFields.forEach((fieldName) => {
        form.setFieldTouched(fieldName, true);
      });
      return;
    }
    let formData = { ...form.values };
    setWizardState((prev) => {
      const newCompletedSteps = [...prev.completedSteps];
      if (!newCompletedSteps.includes(currentStep?.id || "")) {
        newCompletedSteps.push(currentStep?.id || "");
      }
      return {
        ...prev,
        completedSteps: newCompletedSteps,
        progress: 100
      };
    });
    try {
      if (config.csrf?.cookieName) {
        let csrfToken;
        if (config.csrf?.getToken) {
          csrfToken = await config.csrf.getToken();
        } else {
          csrfToken = document.cookie.split("; ").find((row) => row.startsWith(config.csrf?.cookieName + "="))?.split("=")[1];
        }
        if (csrfToken) {
          formData = {
            ...formData,
            [config.csrf?.tokenKey || "_csrf"]: csrfToken
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
      console.error("Form g\xF6nderilirken hata:", error);
    }
  }, [currentStep, wizardState.isLastStep, config.onComplete, config.csrf, form.values, validateStep, form.setFieldTouched, nextStep]);
  const handleEditStep = (stepId) => {
    setEditingStepId(stepId);
    const stepIndex = config.steps.findIndex((s) => s.id === stepId);
    setWizardState((prev) => ({
      ...prev,
      currentStepId: stepId,
      progress: Math.round((stepIndex + 1) / config.steps.length * 100)
    }));
  };
  const returnToSummary = async () => {
    const summaryStep = config.steps.find((s) => s.isSummary);
    if (summaryStep) {
      setEditingStepId(null);
      setWizardState((prev) => ({
        ...prev,
        currentStepId: summaryStep.id,
        progress: 100
      }));
    }
  };
  const isCurrentStepSummary = config.steps.find((s) => s.id === wizardState.currentStepId)?.isSummary || false;
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
var useFormWizard_default = useFormWizard;

// src/components/StepSummary.tsx
var import_react4 = __toESM(require("react"));
var StepSummary = ({ steps, values, onEdit }) => {
  const stepsToShow = steps.filter((step) => !step.isSummary);
  return /* @__PURE__ */ import_react4.default.createElement("div", { className: "step-summary" }, stepsToShow.map((step) => /* @__PURE__ */ import_react4.default.createElement("div", { key: step.id, className: "step-summary-section" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "step-summary-header" }, /* @__PURE__ */ import_react4.default.createElement("h3", null, step.title), /* @__PURE__ */ import_react4.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => onEdit(step.id),
      className: "edit-button"
    },
    "D\xFCzenle"
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "step-summary-content" }, step.fields.map((field) => {
    const value = values[field];
    if (!value && step.summaryConfig?.hideEmpty) return null;
    const label = step.summaryConfig?.labels?.[field] || field;
    const formatter = step.summaryConfig?.formatters?.[field];
    const displayValue = formatter ? formatter(value) : value;
    return /* @__PURE__ */ import_react4.default.createElement("div", { key: field, className: "summary-field" }, /* @__PURE__ */ import_react4.default.createElement("span", { className: "field-label" }, label, ":"), /* @__PURE__ */ import_react4.default.createElement("span", { className: "field-value" }, displayValue));
  })))));
};

// src/validations/rules.ts
var tcKimlikRule = {
  validator: (value) => {
    if (!value) return false;
    if (value.length !== 11) return false;
    if (!/^\d+$/.test(value)) return false;
    let odd = 0, even = 0, sum = 0;
    for (let i = 0; i < 9; i++) {
      if (i % 2 === 0) {
        odd += parseInt(value[i]);
      } else {
        even += parseInt(value[i]);
      }
      sum += parseInt(value[i]);
    }
    const digit10 = (odd * 7 - even) % 10;
    const digit11 = (sum + digit10) % 10;
    return parseInt(value[9]) === digit10 && parseInt(value[10]) === digit11;
  },
  message: "Ge\xE7ersiz TC Kimlik numaras\u0131"
};
var emailRule = {
  validator: (value) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(value);
  },
  message: "Ge\xE7erli bir e-posta adresi giriniz"
};
var phoneRule = {
  validator: (value) => {
    const phone = value.replace(/\D/g, "");
    if (phone.length !== 10) return false;
    if (!phone.startsWith("5")) return false;
    if (phone[1] === "0") return false;
    const validOperatorCodes = ["50", "51", "52", "53", "54", "55", "56", "58", "59"];
    const operatorCode = phone.substring(0, 2);
    return validOperatorCodes.includes(operatorCode);
  },
  message: "Ge\xE7ersiz telefon numaras\u0131 (5XX XXX XX XX format\u0131nda olmal\u0131 ve ge\xE7erli bir operat\xF6r kodu i\xE7ermeli)"
};
var creditCardRule = {
  validator: (value) => {
    const cardNumber = value.replace(/\s/g, "");
    if (!/^\d{16}$/.test(cardNumber)) return false;
    let sum = 0;
    let isEven = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber[i]);
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      isEven = !isEven;
    }
    return sum % 10 === 0;
  },
  message: "Ge\xE7ersiz kredi kart\u0131 numaras\u0131"
};
var ibanRule = {
  validator: (value) => {
    const iban = value.replace(/\s/g, "").toUpperCase();
    if (!/^TR[0-9]{24}$/.test(iban)) return false;
    const validIbans = [
      "TR710013400002267437300001",
      "TR330006100519786457841301",
      "TR680006200019786457841301",
      "TR710006200019786457841301"
    ];
    return validIbans.includes(iban);
  },
  message: "Ge\xE7ersiz IBAN (\xD6rnek: TR71 0013 4000 0226 7437 3000 01)"
};
var strongPasswordRule = {
  validator: (value) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
  },
  message: "\u015Eifre en az 8 karakter uzunlu\u011Funda olmal\u0131 ve en az bir b\xFCy\xFCk harf, bir k\xFC\xE7\xFCk harf, bir rakam ve bir \xF6zel karakter i\xE7ermelidir"
};
var ageRule = (minAge) => ({
  validator: (value) => {
    const birthDate = new Date(value);
    const today = /* @__PURE__ */ new Date();
    if (birthDate > today) {
      return false;
    }
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birthDate.getDate()) {
      return age - 1 >= minAge;
    }
    return age >= minAge;
  },
  message: `${minAge} ya\u015F\u0131ndan b\xFCy\xFCk olmal\u0131s\u0131n\u0131z ve gelecek tarih se\xE7emezsiniz`
});
var websiteRule = {
  validator: (value) => {
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  },
  message: "Ge\xE7erli bir website adresi giriniz (\xF6rn: https://www.example.com)"
};
var postalCodeRule = {
  validator: (value) => {
    return /^\d{5}$/.test(value);
  },
  message: "Ge\xE7erli bir posta kodu giriniz (5 haneli)"
};
var fileSizeRule = (maxSizeMB) => ({
  validator: (file) => {
    if (!file) return false;
    const maxBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxBytes;
  },
  message: `Dosya boyutu ${maxSizeMB}MB'dan k\xFC\xE7\xFCk olmal\u0131d\u0131r`
});
var fileTypeRule = (allowedTypes) => ({
  validator: (file) => {
    if (!file) return false;
    return allowedTypes.includes(file.type);
  },
  message: `Sadece ${allowedTypes.join(", ")} tipinde dosyalar y\xFCklenebilir`
});
var cardExpiryRule = {
  validator: (value) => {
    if (!/^\d{2}\/\d{2}$/.test(value)) return false;
    const [month, year] = value.split("/").map((num) => parseInt(num));
    const now = /* @__PURE__ */ new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    if (month < 1 || month > 12) return false;
    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;
    return true;
  },
  message: "Ge\xE7ersiz son kullanma tarihi"
};
var cvcRule = {
  validator: (value) => {
    return /^\d{3}$/.test(value);
  },
  message: "Ge\xE7ersiz CVC kodu"
};
var vergiNoRule = {
  validator: (value) => {
    const vkn = value.replace(/\s/g, "");
    if (!/^\d{10}$/.test(vkn)) return false;
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      let digit = parseInt(vkn[i]);
      let position = i + 1;
      let step1 = (digit + (10 - position)) % 10;
      let step2 = step1 * Math.pow(2, 10 - position);
      let step3 = step2 % 9;
      if (step3 === 0 && step2 !== 0) {
        step3 = 9;
      }
      sum += step3;
    }
    const lastDigit = parseInt(vkn[9]);
    const checkDigit = sum === 0 ? 0 : (10 - sum % 10) % 10;
    return lastDigit === checkDigit;
  },
  message: "Ge\xE7ersiz vergi numaras\u0131 (10 haneli)"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StepSummary,
  ageRule,
  cardExpiryRule,
  corporateTheme,
  creditCardRule,
  cvcRule,
  darkTheme,
  emailRule,
  fileSizeRule,
  fileTypeRule,
  gameTheme,
  gradientTheme,
  ibanRule,
  lightTheme,
  minimalTheme,
  modernTheme,
  neonTheme,
  pastelTheme,
  phoneRule,
  postalCodeRule,
  retroTheme,
  strongPasswordRule,
  tcKimlikRule,
  useFormGuardian,
  useFormWizard,
  vergiNoRule,
  warmTheme,
  websiteRule
});
