# Hooks

React Form Guardian provides two main hooks for form management.

## useFormWizard

The core hook for managing multi-step forms.

```tsx
import { useFormWizard } from 'react-form-guardian';

const FormExample = () => {
  const wizard = useFormWizard({
    steps: [
      {
        id: 'personal',
        title: 'Personal Information',
        fields: ['firstName', 'lastName', 'email']
      },
      {
        id: 'address',
        title: 'Address Information',
        fields: ['street', 'city', 'zipCode']
      }
    ],
    formConfig: {
      firstName: {
        required: true,
        requiredMessage: 'First name is required'
      },
      // ... other field configurations
    },
    onComplete: async (values) => {
      console.log('Form completed:', values);
    }
  });

  // Available properties and methods
  const {
    // Form State
    values,          // Current form values
    errors,          // Validation errors
    touched,         // Touched fields

    // Step Management
    currentStep,     // Current step configuration
    isFirstStep,     // Is this the first step?
    isLastStep,      // Is this the last step?
    nextStep,        // Go to next step
    previousStep,    // Go to previous step
    
    // Progress
    wizardState: {
      progress,      // Current progress (0-100)
      currentStepId, // Current step ID
      completedSteps // Array of completed step IDs
    },

    // Form Actions
    handleSubmit,    // Form submission handler
    handleChange,    // Input change handler
    handleBlur,      // Input blur handler
  } = wizard;

  return (
    // Your form JSX
  );
};
```

## useFormGuardian

A simpler hook for single-step form management.

```tsx
import { useFormGuardian } from 'react-form-guardian';

const FormExample = () => {
  const form = useFormGuardian({
    fields: {
      email: {
        required: true,
        requiredMessage: 'Email is required',
        rules: [emailRule]
      },
      password: {
        required: true,
        requiredMessage: 'Password is required',
        rules: [strongPasswordRule]
      }
    }
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    validateField,
    validateForm,
    resetForm
  } = form;

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
    </form>
  );
};
```

## Configuration Types

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
}
```

For more details about types and configurations, check out the [API Reference](../api/README.md). 