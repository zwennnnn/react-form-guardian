# Themes

React Form Guardian provides a flexible theming system with multiple built-in themes.

## Available Themes

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

const FormExample = () => {
  const wizard = useFormWizard({
    // ... other config
    theme: darkTheme
  });
};
```

## Theme Structure

Each theme implements the WizardTheme interface:

```tsx
interface WizardTheme {
  colors: {
    primary: string;    // Primary brand color
    secondary: string;  // Secondary brand color
    success: string;    // Success state color
    error: string;      // Error state color
    background: string; // Background color
    text: string;       // Text color
    border: string;     // Border color
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

## Built-in Themes

### Light Theme (Default)
```tsx
const wizard = useFormWizard({
  theme: lightTheme // Clean, professional light theme
});
```

### Dark Theme
```tsx
const wizard = useFormWizard({
  theme: darkTheme // Modern dark mode theme
});
```

### Modern Theme
```tsx
const wizard = useFormWizard({
  theme: modernTheme // Contemporary minimalist design
});
```

### Warm Theme
```tsx
const wizard = useFormWizard({
  theme: warmTheme // Warm, inviting color palette
});
```

### Neon Theme
```tsx
const wizard = useFormWizard({
  theme: neonTheme // Vibrant, high-contrast design
});
```

### Pastel Theme
```tsx
const wizard = useFormWizard({
  theme: pastelTheme // Soft, soothing color scheme
});
```

### Retro Theme
```tsx
const wizard = useFormWizard({
  theme: retroTheme // Classic, nostalgic design
});
```

### Gradient Theme
```tsx
const wizard = useFormWizard({
  theme: gradientTheme // Modern gradient effects
});
```

### Minimal Theme
```tsx
const wizard = useFormWizard({
  theme: minimalTheme // Ultra-minimalist design
});
```

### Corporate Theme
```tsx
const wizard = useFormWizard({
  theme: corporateTheme // Professional business style
});
```

### Game Theme
```tsx
const wizard = useFormWizard({
  theme: gameTheme // Playful, game-like interface
});
```

## Custom Theme

You can create your own theme by implementing the WizardTheme interface:

```tsx
const customTheme: WizardTheme = {
  colors: {
    primary: '#FF5733',
    secondary: '#C70039',
    success: '#28a745',
    error: '#dc3545',
    background: '#ffffff',
    text: '#333333',
    border: '#dddddd'
  },
  progressBar: {
    height: '6px',
    background: '#f0f0f0',
    fill: '#FF5733',
    borderRadius: '3px'
  },
  // ... implement other required properties
};

const wizard = useFormWizard({
  theme: customTheme
});
```

For more details about theme types and configurations, check out the [API Reference](../api/README.md). 