import React$1 from 'react';

interface WizardTheme {
    colors: {
        primary: string;
        secondary: string;
        success: string;
        error: string;
        background: string;
        text: string;
        border: string;
    };
    progressBar: {
        height: string;
        background: string;
        fill: string;
        borderRadius: string;
    };
    stepIndicator: {
        size: string;
        activeColor: string;
        inactiveColor: string;
        completedColor: string;
        background: string;
        borderRadius: string;
    };
    button: {
        padding: string;
        borderRadius: string;
        fontSize: string;
    };
    form: {
        fieldSpacing: string;
        labelSpacing: string;
        inputHeight: string;
        inputPadding: string;
        inputBorderRadius: string;
        inputBorderColor: string;
        inputFocusBorderColor: string;
        inputErrorBorderColor: string;
        fontSize: string;
        errorFontSize: string;
        labelFontSize: string;
    };
}
type ThemeMode = 'light' | 'dark' | 'custom';

type ValidationRule = {
    validator: (value: any, allValues?: Record<string, any>) => boolean;
    message: string;
};
type FieldConfig = {
    initialValue?: any;
    rules?: ValidationRule[];
    required?: boolean;
    requiredMessage?: string;
};
type FormConfig = {
    fields: Record<string, FieldConfig>;
    onSubmit?: (values: Record<string, any>) => void | Promise<void>;
};
type FormState = {
    values: Record<string, any>;
    errors: Record<string, string[]>;
    touched: Record<string, boolean>;
    isSubmitting: boolean;
    isDirty: boolean;
    isValid: boolean;
};
type FormGuardianHook = {
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
interface WizardStep {
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
type CSRFConfig = {
    tokenKey?: string;
    headerName?: string;
    cookieName?: string;
    getToken?: () => string | Promise<string>;
};
type WizardConfig = {
    steps: WizardStep[];
    initialStep?: string;
    onStepChange?: (currentStepId: string, nextStepId: string, values: any) => Promise<boolean> | boolean;
    onComplete?: (values: any) => Promise<void> | void;
    theme?: WizardTheme;
    themeMode?: ThemeMode;
    csrf?: CSRFConfig;
};
type WizardState = {
    currentStepId: string;
    completedSteps: string[];
    visitedSteps: string[];
    isFirstStep: boolean;
    isLastStep: boolean;
    progress: number;
};
interface FormWizardHook extends FormGuardianHook {
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

declare const useFormGuardian: (config: FormConfig) => FormGuardianHook;

declare const useFormWizard: (config: WizardConfig, formConfig: FormConfig) => FormWizardHook;

interface StepSummaryProps {
    steps: WizardStep[];
    values: Record<string, any>;
    onEdit: (stepId: string) => void;
}
declare const StepSummary: React$1.FC<StepSummaryProps>;

declare const lightTheme: WizardTheme;
declare const darkTheme: WizardTheme;
declare const modernTheme: WizardTheme;
declare const warmTheme: WizardTheme;
declare const neonTheme: WizardTheme;
declare const pastelTheme: WizardTheme;
declare const retroTheme: WizardTheme;
declare const gradientTheme: WizardTheme;
declare const minimalTheme: WizardTheme;
declare const corporateTheme: WizardTheme;
declare const gameTheme: WizardTheme;

declare const tcKimlikRule: ValidationRule;
declare const emailRule: ValidationRule;
declare const phoneRule: ValidationRule;
declare const creditCardRule: ValidationRule;
declare const ibanRule: ValidationRule;
declare const strongPasswordRule: ValidationRule;
declare const ageRule: (minAge: number) => ValidationRule;
declare const websiteRule: ValidationRule;
declare const postalCodeRule: ValidationRule;
declare const fileSizeRule: (maxSizeMB: number) => ValidationRule;
declare const fileTypeRule: (allowedTypes: string[]) => ValidationRule;
declare const cardExpiryRule: ValidationRule;
declare const cvcRule: ValidationRule;
declare const vergiNoRule: ValidationRule;

export { type CSRFConfig, type FieldConfig, type FormConfig, type FormGuardianHook, type FormState, type FormWizardHook, StepSummary, type ValidationRule, type WizardConfig, type WizardState, type WizardStep, ageRule, cardExpiryRule, corporateTheme, creditCardRule, cvcRule, darkTheme, emailRule, fileSizeRule, fileTypeRule, gameTheme, gradientTheme, ibanRule, lightTheme, minimalTheme, modernTheme, neonTheme, pastelTheme, phoneRule, postalCodeRule, retroTheme, strongPasswordRule, tcKimlikRule, useFormGuardian, useFormWizard, vergiNoRule, warmTheme, websiteRule };
