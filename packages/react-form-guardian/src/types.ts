import { WizardTheme, ThemeMode } from './themes/types';

export type ValidationRule = {
  validator: (value: any, allValues?: Record<string, any>) => boolean;
  message: string;
};

export type FieldConfig = {
  initialValue?: any;
  rules?: ValidationRule[];
  required?: boolean;
  requiredMessage?: string;
};

export type FormConfig = {
  fields: Record<string, FieldConfig>;
  onSubmit?: (values: Record<string, any>) => void | Promise<void>;
};

export type FormState = {
  values: Record<string, any>;
  errors: Record<string, string[]>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
};

export type FormGuardianHook = {
  values: Record<string, any>;
  errors: Record<string, string[]>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
  handleChange: (fieldName: string, value: any) => void;
  handleBlur: (fieldName: string) => void;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  reset: () => void;
  setFieldValue: (fieldName: string, value: any) => void;
  setFieldTouched: (fieldName: string, isTouched?: boolean) => void;
};

export interface WizardStep {
  id: string;
  title: string;
  description?: string;
  fields: string[];
  isOptional?: boolean;
  dependsOn?: string[];
  showIf?: (values: Record<string, any>) => boolean;
  skipIf?: (values: Record<string, any>) => boolean;
  customValidation?: (values: Record<string, any>) => Promise<boolean> | boolean;
  isSummary?: boolean;
  summaryConfig?: {
    labels?: Record<string, string>;
    formatters?: Record<string, (value: any) => string>;
    hideEmpty?: boolean;
    order?: string[];
  };
  validationSchema?: {
    [key: string]: Array<{
      validator: (value: any, allValues?: Record<string, any>) => boolean;
      message: string;
    }>;
  };
}

export type CSRFConfig = {
  tokenKey?: string;
  headerName?: string;
  cookieName?: string;
  getToken?: () => string | Promise<string>;
};

export type WizardConfig = {
  steps: WizardStep[];
  initialStep?: string;
  onStepChange?: (
    currentStepId: string,
    nextStepId: string,
    values: any
  ) => Promise<boolean> | boolean;
  onComplete?: (values: any) => Promise<void> | void;
  theme?: WizardTheme;
  themeMode?: ThemeMode;
  csrf?: CSRFConfig;
};

export type WizardState = {
  currentStepId: string;
  completedSteps: string[];
  visitedSteps: string[];
  isFirstStep: boolean;
  isLastStep: boolean;
  progress: number;
};

export interface FormWizardHook extends FormGuardianHook {
  nextStep: () => Promise<void>;
  previousStep: () => void;
  goToStep: (stepId: string) => Promise<void>;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  wizardState: WizardState;
  wizardConfig: WizardConfig;
  theme: WizardTheme;
  themeMode: ThemeMode;
  toggleTheme: () => void;
  updateTheme: (newTheme: Partial<WizardTheme>) => void;
  isCurrentStepSummary: boolean;
  editingStepId: string | null;
  handleEditStep: (stepId: string) => void;
  returnToSummary: () => Promise<void>;
  isFirstStep: boolean;
  isLastStep: boolean;
} 