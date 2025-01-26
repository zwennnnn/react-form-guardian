# Components

React Form Guardian provides essential components for building multi-step forms.

## StepSummary

A component that displays a summary of all form steps and their values.

```tsx
import { StepSummary } from 'react-form-guardian';

interface StepSummaryProps {
  steps: WizardStep[];
  values: Record<string, any>;
  onEdit: (stepId: string) => void;
}

const FormExample = () => {
  const wizard = useFormWizard({
    steps: [
      {
        id: 'personal',
        title: 'Personal Information',
        fields: ['firstName', 'lastName'],
        summaryConfig: {
          labels: {
            firstName: 'First Name',
            lastName: 'Last Name'
          },
          formatters: {
            firstName: (value) => value.toUpperCase()
          },
          hideEmpty: true
        }
      },
      // ... other steps
    ],
    // ... other configurations
  });

  return (
    <div>
      {wizard.isCurrentStepSummary ? (
        <StepSummary
          steps={wizard.wizardConfig.steps}
          values={wizard.values}
          onEdit={wizard.handleEditStep}
        />
      ) : (
        // Regular form content
      )}
    </div>
  );
};
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| steps | WizardStep[] | Yes | Array of step configurations |
| values | Record<string, any> | Yes | Current form values |
| onEdit | (stepId: string) => void | Yes | Callback when edit button is clicked |

### Step Configuration

```tsx
interface WizardStep {
  // ... other properties
  summaryConfig?: {
    labels?: Record<string, string>;     // Custom field labels
    formatters?: Record<string, (value: any) => any>; // Value formatters
    hideEmpty?: boolean;                 // Hide empty fields
  };
}
```

## Progress Bar

The progress bar is integrated into the useFormWizard hook and can be styled through the theme system:

```tsx
const FormExample = () => {
  const wizard = useFormWizard({
    // ... wizard configuration
  });

  return (
    <div>
      {/* Progress Bar */}
      <div style={{ 
        height: '4px', 
        backgroundColor: '#eee',
        borderRadius: '2px' 
      }}>
        <div style={{ 
          width: `${wizard.wizardState.progress}%`,
          height: '100%',
          backgroundColor: '#007bff',
          transition: 'width 0.3s ease'
        }} />
      </div>

      {/* Rest of the form */}
    </div>
  );
};
```

## Step Indicator

Step indicators are also managed through the useFormWizard hook and themed accordingly:

```tsx
const FormExample = () => {
  const wizard = useFormWizard({
    // ... wizard configuration
  });

  return (
    <div>
      {/* Step Indicators */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {wizard.wizardConfig.steps.map((step, index) => (
          <div
            key={step.id}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: wizard.wizardState.currentStepId === step.id
                ? '#007bff'
                : wizard.wizardState.completedSteps.includes(step.id)
                  ? '#28a745'
                  : '#eee',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>

      {/* Rest of the form */}
    </div>
  );
};
```

For more details about theming and customization, check out the [Themes](../themes/README.md) documentation. 