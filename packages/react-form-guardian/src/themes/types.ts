export interface WizardTheme {
  // Genel tema ayarları
  colors: {
    primary: string;
    secondary: string;
    success: string;
    error: string;
    background: string;
    text: string;
    border: string;
  };
  
  // Progress bar stilleri
  progressBar: {
    height: string;
    background: string;
    fill: string;
    borderRadius: string;
  };
  
  // Step göstergeleri
  stepIndicator: {
    size: string;
    activeColor: string;
    inactiveColor: string;
    completedColor: string;
    background: string;
    borderRadius: string;
  };
  
  // Butonlar
  button: {
    padding: string;
    borderRadius: string;
    fontSize: string;
  };
  
  // Form alanları
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

export type ThemeMode = 'light' | 'dark' | 'custom'; 