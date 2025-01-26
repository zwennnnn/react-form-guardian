# Security Features

React Form Guardian provides CSRF protection for your forms.

## CSRF Protection

Cross-Site Request Forgery (CSRF) protection is built into React Form Guardian.

### Basic Configuration

```tsx
import { useFormWizard } from 'react-form-guardian';

const MySecureForm = () => {
  const wizard = useFormWizard({
    // ... other config
    csrf: {
      tokenKey: '_csrf',        // Token key in form data
      headerName: 'X-CSRF-Token', // CSRF header name
      cookieName: 'csrf_token'    // CSRF cookie name
    }
  });

  return (
    <form onSubmit={wizard.handleSubmit}>
      {/* Form content */}
    </form>
  );
};
```

### Custom Token Generation

You can provide your own token generation logic:

```tsx
const wizard = useFormWizard({
  // ... other config
  csrf: {
    tokenKey: '_csrf',
    headerName: 'X-CSRF-Token',
    cookieName: 'csrf_token',
    getToken: async () => {
      // Custom token generation or API call
      const token = `csrf-${Date.now()}`;
      document.cookie = `csrf_token=${token}; path=/; max-age=3600`;
      return token;
    }
  }
});
```

### How It Works

When CSRF protection is enabled:

1. The library looks for a CSRF token in the cookie specified by `cookieName`
2. If `getToken` is provided, it's used to generate/fetch a new token
3. The token is included in form submissions under the key specified by `tokenKey`
4. The token is also added to request headers using the name specified by `headerName`

### Type Definition

```tsx
interface CSRFConfig {
  tokenKey?: string;      // Token key in form data
  headerName?: string;    // CSRF header name
  cookieName?: string;    // CSRF cookie name
  getToken?: () => string | Promise<string>; // Custom token getter
}
```

For more details about CSRF configuration, check out the [API Reference](../api/README.md).

## Input Sanitization

React Form Guardian automatically sanitizes input values to prevent XSS attacks.

### Default Sanitization

```tsx
const formConfig = {
  username: {
    required: true,
    sanitize: true // Default is true
  }
};
```

### Custom Sanitization

You can provide custom sanitization rules:

```tsx
const formConfig = {
  comment: {
    required: true,
    sanitize: (value) => {
      // Your custom sanitization logic
      return value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    }
  }
};
```

## Form State Protection

The library includes several features to protect form state:

### 1. State Persistence

```tsx
const wizard = useFormWizard({
  steps: steps,
  formConfig: formConfig,
  persistence: {
    enabled: true,
    storage: 'sessionStorage',
    key: 'form_state'
  }
});
```

### 2. Form Tampering Prevention

```tsx
const formConfig = {
  amount: {
    required: true,
    preventTampering: true,
    tamperCheck: (value, originalValue) => {
      return parseFloat(value) <= parseFloat(originalValue);
    }
  }
};
```

### 3. Hidden Field Protection

```tsx
const formConfig = {
  secretKey: {
    type: 'hidden',
    protect: true,
    validateIntegrity: true
  }
};
```

## Secure Form Submission

### 1. HTTPS Enforcement

```tsx
const wizard = useFormWizard({
  steps: steps,
  formConfig: formConfig,
  security: {
    requireHttps: true
  }
});
```

### 2. Rate Limiting

```tsx
const wizard = useFormWizard({
  steps: steps,
  formConfig: formConfig,
  security: {
    rateLimit: {
      maxAttempts: 5,
      timeWindow: 60000 // 1 minute
    }
  }
});
```

### 3. Secure Headers

```tsx
const wizard = useFormWizard({
  steps: steps,
  formConfig: formConfig,
  security: {
    headers: {
      'Content-Security-Policy': "default-src 'self'",
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block'
    }
  }
});
```

## Data Validation

### 1. Input Validation

```tsx
const formConfig = {
  email: {
    required: true,
    validationRules: [emailRule],
    validateOnBlur: true,
    validateOnChange: true
  }
};
```

### 2. Cross-Field Validation

```tsx
const formConfig = {
  password: {
    required: true,
    validationRules: [strongPasswordRule]
  },
  confirmPassword: {
    required: true,
    validationRules: [
      {
        validator: (value, allValues) => value === allValues.password,
        message: 'Passwords must match'
      }
    ]
  }
};
```

### 3. Server-Side Validation

```tsx
const steps = [
  {
    id: 'account',
    fields: ['username', 'email'],
    customValidation: async (values) => {
      const response = await fetch('/api/validate', {
        method: 'POST',
        body: JSON.stringify(values)
      });
      
      if (!response.ok) {
        throw new Error('Validation failed');
      }
      
      return true;
    }
  }
];
```

## Best Practices

1. **Always Use CSRF Protection**
   ```tsx
   // ✅ Good
   const wizard = useFormWizard({
     csrf: {
       tokenKey: '_csrf',
       headerName: 'X-CSRF-Token'
     }
   });
   
   // ❌ Bad
   const wizard = useFormWizard({
     csrf: false
   });
   ```

2. **Validate All Inputs**
   ```tsx
   // ✅ Good
   const formConfig = {
     email: {
       required: true,
       validationRules: [emailRule]
     }
   };
   
   // ❌ Bad
   const formConfig = {
     email: {
       required: true
     }
   };
   ```

3. **Use HTTPS**
   ```tsx
   // ✅ Good
   const wizard = useFormWizard({
     security: {
       requireHttps: true
     }
   });
   
   // ❌ Bad
   const wizard = useFormWizard({
     security: {
       requireHttps: false
     }
   });
   ```

4. **Implement Rate Limiting**
   ```tsx
   // ✅ Good
   const wizard = useFormWizard({
     security: {
       rateLimit: {
         maxAttempts: 5,
         timeWindow: 60000
       }
     }
   });
   
   // ❌ Bad
   const wizard = useFormWizard({
     security: {
       rateLimit: false
     }
   });
   ```

5. **Sanitize User Input**
   ```tsx
   // ✅ Good
   const formConfig = {
     comment: {
       required: true,
       sanitize: true
     }
   };
   
   // ❌ Bad
   const formConfig = {
     comment: {
       required: true,
       sanitize: false
     }
   };
   ```

## Security Checklist

- [ ] CSRF protection enabled
- [ ] Input sanitization configured
- [ ] Form state persistence enabled
- [ ] HTTPS enforced
- [ ] Rate limiting implemented
- [ ] Secure headers configured
- [ ] Input validation rules defined
- [ ] Cross-field validation implemented
- [ ] Server-side validation integrated
- [ ] Hidden fields protected

For more information about implementing these security features, check out the [Components](../components/README.md) documentation. 