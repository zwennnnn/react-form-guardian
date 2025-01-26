import { WizardTheme } from './types';

export const lightTheme: WizardTheme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    error: '#dc3545',
    background: '#ffffff',
    text: '#212529',
    border: '#dee2e6'
  },
  progressBar: {
    height: '8px',
    background: '#e9ecef',
    fill: '#007bff',
    borderRadius: '4px'
  },
  stepIndicator: {
    size: '32px',
    activeColor: '#007bff',
    inactiveColor: '#6c757d',
    completedColor: '#28a745',
    background: '#ffffff',
    borderRadius: '50%'
  },
  button: {
    padding: '10px 20px',
    borderRadius: '4px',
    fontSize: '16px'
  },
  form: {
    fieldSpacing: '20px',
    labelSpacing: '8px',
    inputHeight: '40px',
    inputPadding: '8px 12px',
    inputBorderRadius: '4px',
    inputBorderColor: '#ced4da',
    inputFocusBorderColor: '#80bdff',
    inputErrorBorderColor: '#dc3545',
    fontSize: '16px',
    errorFontSize: '14px',
    labelFontSize: '16px'
  }
};

export const darkTheme: WizardTheme = {
  colors: {
    primary: '#0d6efd',
    secondary: '#6c757d',
    success: '#198754',
    error: '#dc3545',
    background: '#212529',
    text: '#f8f9fa',
    border: '#495057'
  },
  progressBar: {
    height: '8px',
    background: '#343a40',
    fill: '#0d6efd',
    borderRadius: '4px'
  },
  stepIndicator: {
    size: '32px',
    activeColor: '#0d6efd',
    inactiveColor: '#6c757d',
    completedColor: '#198754',
    background: '#343a40',
    borderRadius: '50%'
  },
  button: {
    padding: '10px 20px',
    borderRadius: '4px',
    fontSize: '16px'
  },
  form: {
    fieldSpacing: '20px',
    labelSpacing: '8px',
    inputHeight: '40px',
    inputPadding: '8px 12px',
    inputBorderRadius: '4px',
    inputBorderColor: '#495057',
    inputFocusBorderColor: '#0d6efd',
    inputErrorBorderColor: '#dc3545',
    fontSize: '16px',
    errorFontSize: '14px',
    labelFontSize: '16px'
  }
};

// Modern ve minimalist tema
export const modernTheme: WizardTheme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#64748b',
    success: '#22c55e',
    error: '#ef4444',
    background: '#ffffff',
    text: '#1e293b',
    border: '#e2e8f0'
  },
  progressBar: {
    height: '6px',
    background: '#f1f5f9',
    fill: '#3b82f6',
    borderRadius: '8px'
  },
  stepIndicator: {
    size: '36px',
    activeColor: '#3b82f6',
    inactiveColor: '#64748b',
    completedColor: '#22c55e',
    background: '#f8fafc',
    borderRadius: '12px'
  },
  button: {
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px'
  },
  form: {
    fieldSpacing: '24px',
    labelSpacing: '8px',
    inputHeight: '44px',
    inputPadding: '12px 16px',
    inputBorderRadius: '8px',
    inputBorderColor: '#e2e8f0',
    inputFocusBorderColor: '#3b82f6',
    inputErrorBorderColor: '#ef4444',
    fontSize: '16px',
    errorFontSize: '14px',
    labelFontSize: '16px'
  }
};

// Sıcak renkli tema
export const warmTheme: WizardTheme = {
  colors: {
    primary: '#f97316',
    secondary: '#78716c',
    success: '#84cc16',
    error: '#ef4444',
    background: '#fffbeb',
    text: '#44403c',
    border: '#fed7aa'
  },
  progressBar: {
    height: '8px',
    background: '#fef3c7',
    fill: '#f97316',
    borderRadius: '16px'
  },
  stepIndicator: {
    size: '40px',
    activeColor: '#f97316',
    inactiveColor: '#78716c',
    completedColor: '#84cc16',
    background: '#fff7ed',
    borderRadius: '20px'
  },
  button: {
    padding: '12px 24px',
    borderRadius: '16px',
    fontSize: '16px'
  },
  form: {
    fieldSpacing: '24px',
    labelSpacing: '8px',
    inputHeight: '44px',
    inputPadding: '12px 16px',
    inputBorderRadius: '12px',
    inputBorderColor: '#fed7aa',
    inputFocusBorderColor: '#f97316',
    inputErrorBorderColor: '#ef4444',
    fontSize: '16px',
    errorFontSize: '14px',
    labelFontSize: '16px'
  }
};

// Neon tema
export const neonTheme: WizardTheme = {
  colors: {
    primary: '#22d3ee',
    secondary: '#94a3b8',
    success: '#4ade80',
    error: '#fb7185',
    background: '#0f172a',
    text: '#f8fafc',
    border: '#1e293b'
  },
  progressBar: {
    height: '6px',
    background: '#1e293b',
    fill: '#22d3ee',
    borderRadius: '4px'
  },
  stepIndicator: {
    size: '36px',
    activeColor: '#22d3ee',
    inactiveColor: '#94a3b8',
    completedColor: '#4ade80',
    background: '#1e293b',
    borderRadius: '8px'
  },
  button: {
    padding: '12px 24px',
    borderRadius: '4px',
    fontSize: '16px'
  },
  form: {
    fieldSpacing: '24px',
    labelSpacing: '8px',
    inputHeight: '44px',
    inputPadding: '12px 16px',
    inputBorderRadius: '4px',
    inputBorderColor: '#1e293b',
    inputFocusBorderColor: '#22d3ee',
    inputErrorBorderColor: '#fb7185',
    fontSize: '16px',
    errorFontSize: '14px',
    labelFontSize: '16px'
  }
};

// Pastel tema
export const pastelTheme: WizardTheme = {
  colors: {
    primary: '#a78bfa',
    secondary: '#94a3b8',
    success: '#86efac',
    error: '#fca5a5',
    background: '#f8fafc',
    text: '#334155',
    border: '#e2e8f0'
  },
  progressBar: {
    height: '8px',
    background: '#f1f5f9',
    fill: '#a78bfa',
    borderRadius: '16px'
  },
  stepIndicator: {
    size: '36px',
    activeColor: '#a78bfa',
    inactiveColor: '#94a3b8',
    completedColor: '#86efac',
    background: '#ffffff',
    borderRadius: '18px'
  },
  button: {
    padding: '12px 24px',
    borderRadius: '24px',
    fontSize: '16px'
  },
  form: {
    fieldSpacing: '24px',
    labelSpacing: '8px',
    inputHeight: '44px',
    inputPadding: '12px 16px',
    inputBorderRadius: '16px',
    inputBorderColor: '#e2e8f0',
    inputFocusBorderColor: '#a78bfa',
    inputErrorBorderColor: '#fca5a5',
    fontSize: '16px',
    errorFontSize: '14px',
    labelFontSize: '16px'
  }
};

// Retro tema
export const retroTheme: WizardTheme = {
  colors: {
    primary: '#fbbf24',
    secondary: '#6b7280',
    success: '#34d399',
    error: '#f87171',
    background: '#1f2937',
    text: '#f9fafb',
    border: '#374151'
  },
  progressBar: {
    height: '4px',
    background: '#374151',
    fill: '#fbbf24',
    borderRadius: '0px'
  },
  stepIndicator: {
    size: '32px',
    activeColor: '#fbbf24',
    inactiveColor: '#6b7280',
    completedColor: '#34d399',
    background: '#374151',
    borderRadius: '0px'
  },
  button: {
    padding: '10px 20px',
    borderRadius: '0px',
    fontSize: '16px'
  },
  form: {
    fieldSpacing: '20px',
    labelSpacing: '8px',
    inputHeight: '40px',
    inputPadding: '8px 12px',
    inputBorderRadius: '0px',
    inputBorderColor: '#374151',
    inputFocusBorderColor: '#fbbf24',
    inputErrorBorderColor: '#f87171',
    fontSize: '16px',
    errorFontSize: '14px',
    labelFontSize: '16px'
  }
};

// Gradient tema
export const gradientTheme: WizardTheme = {
  colors: {
    primary: '#8b5cf6',
    secondary: '#64748b',
    success: '#10b981',
    error: '#ef4444',
    background: '#ffffff',
    text: '#1e293b',
    border: '#e2e8f0'
  },
  progressBar: {
    height: '8px',
    background: '#f1f5f9',
    fill: 'linear-gradient(90deg, #8b5cf6 0%, #d946ef 100%)',
    borderRadius: '8px'
  },
  stepIndicator: {
    size: '36px',
    activeColor: '#8b5cf6',
    inactiveColor: '#64748b',
    completedColor: '#10b981',
    background: '#ffffff',
    borderRadius: '8px'
  },
  button: {
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px'
  },
  form: {
    fieldSpacing: '24px',
    labelSpacing: '8px',
    inputHeight: '44px',
    inputPadding: '12px 16px',
    inputBorderRadius: '8px',
    inputBorderColor: '#e2e8f0',
    inputFocusBorderColor: '#8b5cf6',
    inputErrorBorderColor: '#ef4444',
    fontSize: '16px',
    errorFontSize: '14px',
    labelFontSize: '16px'
  }
};

// Minimal tema
export const minimalTheme: WizardTheme = {
  colors: {
    primary: '#2c3e50',
    secondary: '#7f8c8d',
    success: '#27ae60',
    error: '#c0392b',
    background: '#ffffff',
    text: '#2c3e50',
    border: '#bdc3c7'
  },
  progressBar: {
    height: '3px',
    background: '#ecf0f1',
    fill: '#2c3e50',
    borderRadius: '0px'
  },
  stepIndicator: {
    size: '32px',
    activeColor: '#2c3e50',
    inactiveColor: '#7f8c8d',
    completedColor: '#27ae60',
    background: '#ffffff',
    borderRadius: '4px'
  },
  button: {
    padding: '12px 24px',
    borderRadius: '4px',
    fontSize: '14px'
  },
  form: {
    fieldSpacing: '24px',
    labelSpacing: '8px',
    inputHeight: '40px',
    inputPadding: '8px 12px',
    inputBorderRadius: '4px',
    inputBorderColor: '#bdc3c7',
    inputFocusBorderColor: '#2c3e50',
    inputErrorBorderColor: '#c0392b',
    fontSize: '14px',
    errorFontSize: '12px',
    labelFontSize: '14px'
  }
};

// Corporate tema
export const corporateTheme: WizardTheme = {
  colors: {
    primary: '#1e40af',
    secondary: '#475569',
    success: '#15803d',
    error: '#b91c1c',
    background: '#ffffff',
    text: '#0f172a',
    border: '#cbd5e1'
  },
  progressBar: {
    height: '6px',
    background: '#f1f5f9',
    fill: '#1e40af',
    borderRadius: '4px'
  },
  stepIndicator: {
    size: '32px',
    activeColor: '#1e40af',
    inactiveColor: '#475569',
    completedColor: '#15803d',
    background: '#ffffff',
    borderRadius: '4px'
  },
  button: {
    padding: '10px 20px',
    borderRadius: '4px',
    fontSize: '14px'
  },
  form: {
    fieldSpacing: '20px',
    labelSpacing: '6px',
    inputHeight: '36px',
    inputPadding: '8px 12px',
    inputBorderRadius: '4px',
    inputBorderColor: '#cbd5e1',
    inputFocusBorderColor: '#1e40af',
    inputErrorBorderColor: '#b91c1c',
    fontSize: '14px',
    errorFontSize: '12px',
    labelFontSize: '14px'
  }
};

// Oyun teması
export const gameTheme: WizardTheme = {
  colors: {
    primary: '#7c3aed',
    secondary: '#6b7280',
    success: '#059669',
    error: '#dc2626',
    background: '#18181b',
    text: '#f9fafb',
    border: '#3f3f46'
  },
  progressBar: {
    height: '8px',
    background: '#27272a',
    fill: '#7c3aed',
    borderRadius: '4px'
  },
  stepIndicator: {
    size: '40px',
    activeColor: '#7c3aed',
    inactiveColor: '#6b7280',
    completedColor: '#059669',
    background: '#27272a',
    borderRadius: '8px'
  },
  button: {
    padding: '14px 28px',
    borderRadius: '8px',
    fontSize: '16px'
  },
  form: {
    fieldSpacing: '24px',
    labelSpacing: '8px',
    inputHeight: '48px',
    inputPadding: '12px 16px',
    inputBorderRadius: '8px',
    inputBorderColor: '#3f3f46',
    inputFocusBorderColor: '#7c3aed',
    inputErrorBorderColor: '#dc2626',
    fontSize: '16px',
    errorFontSize: '14px',
    labelFontSize: '16px'
  }
}; 