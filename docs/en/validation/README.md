# Validation

React Form Guardian provides a comprehensive validation system with built-in rules.

## Built-in Validation Rules

### Basic Rules

```tsx
import {
  emailRule,
  phoneRule,
  strongPasswordRule,
  websiteRule,
  postalCodeRule
} from 'react-form-guardian';

const formConfig = {
  email: {
    required: true,
    rules: [emailRule]        // Validates email format
  },
  phone: {
    required: true,
    rules: [phoneRule]        // Validates phone number format (5XX XXX XX XX)
  },
  password: {
    required: true,
    rules: [strongPasswordRule] // Validates password strength
  },
  website: {
    rules: [websiteRule]      // Validates URL format
  },
  postalCode: {
    rules: [postalCodeRule]   // Validates postal code format (5 digits)
  }
};
```

### Identity and Financial Rules

```tsx
import {
  tcKimlikRule,
  ibanRule,
  vergiNoRule,
  creditCardRule,
  cardExpiryRule,
  cvcRule
} from 'react-form-guardian';

const formConfig = {
  tcKimlik: {
    required: true,
    rules: [tcKimlikRule]     // Validates Turkish ID number
  },
  iban: {
    required: true,
    rules: [ibanRule]         // Validates IBAN format
  },
  vergiNo: {
    required: true,
    rules: [vergiNoRule]      // Validates tax number
  },
  cardNumber: {
    required: true,
    rules: [creditCardRule]   // Validates credit card number
  },
  cardExpiry: {
    required: true,
    rules: [cardExpiryRule]   // Validates card expiry date (MM/YY)
  },
  cardCVC: {
    required: true,
    rules: [cvcRule]          // Validates CVC code (3 digits)
  }
};
```

### File Rules

```tsx
import {
  fileSizeRule,
  fileTypeRule
} from 'react-form-guardian';

const formConfig = {
  profilePicture: {
    rules: [
      fileSizeRule(5),        // Max 5MB
      fileTypeRule(['image/jpeg', 'image/png'])
    ]
  }
};
```

### Age Rule

```tsx
import { ageRule } from 'react-form-guardian';

const formConfig = {
  birthDate: {
    rules: [ageRule(18)]      // Must be at least 18 years old
  }
};
```

## Custom Validation Rules

You can create custom validation rules by implementing the ValidationRule interface:

```tsx
import { ValidationRule } from 'react-form-guardian';

const customRule: ValidationRule = {
  validator: (value: any, allValues?: Record<string, any>) => {
    // Your validation logic here
    return true; // or false
  },
  message: 'Custom error message'
};

const formConfig = {
  customField: {
    rules: [customRule]
  }
};
```

## Using Multiple Rules

You can combine multiple validation rules for a single field:

```tsx
const formConfig = {
  email: {
    required: true,
    requiredMessage: 'Email is required',
    rules: [
      emailRule,
      {
        validator: (value) => value.endsWith('@company.com'),
        message: 'Must be a company email'
      }
    ]
  }
};
```

## Validation in Form Wizard

When using with useFormWizard, validation is automatically handled for each step:

```tsx
const wizard = useFormWizard({
  steps: [
    {
      id: 'personal',
      fields: ['email', 'phone'],
      customValidation: async (values) => {
        // Additional step-level validation
        return true;
      }
    }
  ],
  formConfig: {
    email: {
      required: true,
      rules: [emailRule]
    },
    phone: {
      required: true,
      rules: [phoneRule]
    }
  }
});
```

For more details about validation types and configurations, check out the [API Reference](../api/README.md). 