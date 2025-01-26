# Getting Started

React Form Guardian is a powerful and customizable React library for creating multi-step forms.

## Installation

Using npm:
```bash
npm install react-form-guardian
```

Using yarn:
```bash
yarn add react-form-guardian
```

## Basic Usage

Here's a simple form wizard example:

```tsx
import { useFormWizard } from 'react-form-guardian';

const SimpleExample = () => {
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
      lastName: {
        required: true,
        requiredMessage: 'Last name is required'
      },
      email: {
        required: true,
        requiredMessage: 'Email is required',
        rules: [emailRule]
      }
    },
    onComplete: async (values) => {
      console.log('Form completed:', values);
    }
  });

  return (
    <form onSubmit={wizard.handleSubmit}>
      <div>
        <h2>{wizard.currentStep.title}</h2>
        
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

        {/* Form Fields */}
        {wizard.currentStep.fields.map(field => (
          <div key={field}>
            <label>{field}</label>
            <input
              value={wizard.values[field] || ''}
              onChange={(e) => wizard.handleChange(field, e.target.value)}
              onBlur={() => wizard.handleBlur(field)}
            />
            {wizard.touched[field] && wizard.errors[field]?.map(error => (
              <div key={error} style={{ color: 'red' }}>{error}</div>
            ))}
          </div>
        ))}

        {/* Navigation Buttons */}
        <div>
          {!wizard.isFirstStep && (
            <button type="button" onClick={wizard.previousStep}>
              Previous
            </button>
          )}
          <button type="submit">
            {wizard.isLastStep ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </form>
  );
};
```

## Features

- 🎯 Multi-step form management
- 🎨 Theme support
- ✨ Built-in validation
- 📝 Form state management
- 🔄 Step navigation
- 📊 Progress tracking

## Next Steps

For more features and detailed usage, check out:

- [Hooks](./hooks/README.md)
- [Components](./components/README.md)
- [Themes](./themes/README.md)
- [Validation](./validation/README.md) 