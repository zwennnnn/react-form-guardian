# API Reference

## Core Components

### FormWizard

The main component for creating multi-step forms.

```tsx
import { FormWizard } from 'react-form-guardian';

<FormWizard
  steps={steps}
  formConfig={formConfig}
  onComplete={handleComplete}
  theme={theme}
  csrf={csrfConfig}
/>
```

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| steps | WizardStep[] | Yes | - | Array of step configurations |
| formConfig | FormConfig | Yes | - | Form field configurations |
| onComplete | (values: any) => Promise<void> | Yes | - | Called when form is completed |
| theme | WizardTheme | No | defaultTheme | Custom theme configuration |
| csrf | CSRFConfig | No | undefined | CSRF protection configuration |

#### Types

```tsx
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
}

interface FormConfig {
  fields: Record<string, FieldConfig>;
  onSubmit?: (values: Record<string, any>) => void | Promise<void>;
}

interface FieldConfig {
  initialValue?: any;
  rules?: ValidationRule[];
  required?: boolean;
  requiredMessage?: string;
}

interface CSRFConfig {
  tokenKey?: string;
  headerName?: string;
  cookieName?: string;
  getToken?: () => string | Promise<string>;
}
```

## Hooks

### useFormWizard

The main hook for creating multi-step forms.

```tsx
import { useFormWizard } from 'react-form-guardian';

const wizard = useFormWizard(config: WizardConfig, formConfig: FormConfig);
```

#### Return Values

| Value | Type | Description |
|-------|------|-------------|
| values | Record<string, any> | Current form values |
| errors | Record<string, string[]> | Validation errors |
| touched | Record<string, boolean> | Touched field states |
| currentStep | WizardStep | Current step configuration |
| isFirstStep | boolean | Whether current step is first |
| isLastStep | boolean | Whether current step is last |
| nextStep | () => Promise<void> | Go to next step |
| previousStep | () => void | Go to previous step |
| handleSubmit | (e?: React.FormEvent) => Promise<void> | Form submission handler |
| handleChange | (fieldName: string, value: any) => void | Field change handler |
| handleBlur | (fieldName: string) => void | Field blur handler |
| wizardState | WizardState | Current wizard state |
| theme | WizardTheme | Current theme |

### useFormGuardian

Hook for single-step form management.

```tsx
import { useFormGuardian } from 'react-form-guardian';

const form = useFormGuardian(config: FormConfig);
```

#### Return Values

| Value | Type | Description |
|-------|------|-------------|
| values | Record<string, any> | Form values |
| errors | Record<string, string[]> | Validation errors |
| touched | Record<string, boolean> | Touched fields |
| handleChange | (fieldName: string, value: any) => void | Change handler |
| handleBlur | (fieldName: string) => void | Blur handler |
| handleSubmit | (e?: React.FormEvent) => Promise<void> | Submit handler |
| reset | () => void | Reset form |
| setFieldValue | (fieldName: string, value: any) => void | Set field value |
| setFieldTouched | (fieldName: string, isTouched?: boolean) => void | Set field touched |

## Components

### StepSummary

Component for displaying form step summary.

```tsx
import { StepSummary } from 'react-form-guardian';

<StepSummary
  steps={WizardStep[]}
  values={Record<string, any>}
  onEdit={(stepId: string) => void}
/>
```

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| steps | WizardStep[] | Yes | Step configurations |
| values | Record<string, any> | Yes | Form values |
| onEdit | (stepId: string) => void | Yes | Edit step callback |

## Validation Rules

Built-in validation rules:

```tsx
import {
  emailRule,
  phoneRule,
  tcKimlikRule,
  ibanRule,
  vergiNoRule,
  strongPasswordRule,
  ageRule,
  websiteRule,
  postalCodeRule,
  creditCardRule,
  cardExpiryRule,
  cvcRule,
  fileSizeRule,
  fileTypeRule
} from 'react-form-guardian';
```

### Rule Types

```tsx
interface ValidationRule {
  validator: (value: any, allValues?: Record<string, any>) => boolean;
  message: string;
}
```

## Themes

Available themes:

```tsx
import {
  lightTheme,
  darkTheme,
  modernTheme,
  warmTheme,
  neonTheme,
  pastelTheme,
  retroTheme,
  gradientTheme,
  minimalTheme,
  corporateTheme,
  gameTheme
} from 'react-form-guardian';
```

### Theme Interface

```tsx
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
```

## Types

### WizardConfig

```tsx
interface WizardConfig {
  steps: WizardStep[];
  formConfig: FormConfig;
  onComplete?: (values: any) => Promise<void>;
  theme?: WizardTheme;
  csrf?: CSRFConfig;
}
```

### FormConfig

```tsx
interface FormConfig {
  fields: {
    [key: string]: {
      required?: boolean;
      requiredMessage?: string;
      rules?: ValidationRule[];
      initialValue?: any;
    }
  }
}
```

### WizardStep

```tsx
interface WizardStep {
  id: string;
  title: string;
  description?: string;
  fields: string[];
  isOptional?: boolean;
  showIf?: (values: Record<string, any>) => boolean;
  skipIf?: (values: Record<string, any>) => boolean;
  isSummary?: boolean;
  summaryConfig?: {
    labels?: Record<string, string>;
    formatters?: Record<string, (value: any) => any>;
    hideEmpty?: boolean;
  };
}
```

## Theme System

### useWizardTheme

```tsx
const { theme, themeMode, toggleTheme, updateTheme } = useWizardTheme(config);
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| config | WizardThemeConfig | No | Theme configuration |

#### Return Values

| Value | Type | Description |
|-------|------|-------------|
| theme | WizardTheme | Current theme |
| themeMode | ThemeMode | Current theme mode |
| toggleTheme | () => void | Toggle between light/dark |
| updateTheme | (theme: Partial<WizardTheme>) => void | Update theme |

## Events and Callbacks

### Form Events

```