# API Referansı

## Ana Bileşenler

### FormWizard

Çok adımlı formlar oluşturmak için ana bileşen.

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

| Prop | Tip | Zorunlu | Varsayılan | Açıklama |
|------|-----|---------|------------|-----------|
| steps | WizardStep[] | Evet | - | Adım yapılandırmalarının dizisi |
| formConfig | FormConfig | Evet | - | Form alan yapılandırmaları |
| onComplete | (values: any) => Promise<void> | Evet | - | Form tamamlandığında çağrılır |
| theme | WizardTheme | Hayır | defaultTheme | Özel tema yapılandırması |
| csrf | CSRFConfig | Hayır | undefined | CSRF koruma yapılandırması |
| persistence | PersistenceConfig | Hayır | undefined | Form durumu saklama yapılandırması |
| security | SecurityConfig | Hayır | undefined | Güvenlik ayarları |

#### Tipler

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

interface SecurityConfig {
  requireHttps?: boolean;
  rateLimit?: {
    maxAttempts: number;
    timeWindow: number;
  };
  headers?: Record<string, string>;
}

interface PersistenceConfig {
  enabled: boolean;
  storage: 'localStorage' | 'sessionStorage';
  key: string;
}
```

## Hook'lar

### useFormWizard

Çok adımlı formlar oluşturmak için ana hook.

```tsx
import { useFormWizard } from 'react-form-guardian';

const wizard = useFormWizard(config: WizardConfig, formConfig: FormConfig);
```

#### Dönüş Değerleri

| Değer | Tip | Açıklama |
|-------|-----|-----------|
| values | Record<string, any> | Form değerleri |
| errors | Record<string, string[]> | Doğrulama hataları |
| touched | Record<string, boolean> | Dokunulan alanlar |
| currentStep | WizardStep | Mevcut adım |
| isFirstStep | boolean | İlk adımda mı |
| isLastStep | boolean | Son adımda mı |
| nextStep | () => Promise<void> | Sonraki adıma git |
| previousStep | () => void | Önceki adıma git |
| handleSubmit | (e?: React.FormEvent) => Promise<void> | Form gönderimi |
| handleChange | (fieldName: string, value: any) => void | Alan değişimi |
| handleBlur | (fieldName: string) => void | Alan blur |
| wizardState | WizardState | Form durumu |
| theme | WizardTheme | Mevcut tema |

### useFormGuardian

Tek adımlı form yönetimi için hook.

```tsx
import { useFormGuardian } from 'react-form-guardian';

const form = useFormGuardian(config: FormConfig);
```

#### Dönüş Değerleri

| Değer | Tip | Açıklama |
|-------|-----|-----------|
| values | Record<string, any> | Form değerleri |
| errors | Record<string, string[]> | Doğrulama hataları |
| touched | Record<string, boolean> | Dokunulan alanlar |
| handleChange | (fieldName: string, value: any) => void | Değişim işleyici |
| handleBlur | (fieldName: string) => void | Blur işleyici |
| handleSubmit | (e?: React.FormEvent) => Promise<void> | Gönderim işleyici |
| reset | () => void | Formu sıfırla |
| setFieldValue | (fieldName: string, value: any) => void | Alan değeri ayarla |
| setFieldTouched | (fieldName: string, isTouched?: boolean) => void | Alan dokunma durumu |

## Bileşenler

### StepSummary

Form adımlarının özetini gösteren bileşen.

```tsx
import { StepSummary } from 'react-form-guardian';

<StepSummary
  steps={WizardStep[]}
  values={Record<string, any>}
  onEdit={(stepId: string) => void}
/>
```

#### Props

| Prop | Tip | Zorunlu | Açıklama |
|------|-----|----------|-----------|
| steps | WizardStep[] | Evet | Adım yapılandırmaları |
| values | Record<string, any> | Evet | Form değerleri |
| onEdit | (stepId: string) => void | Evet | Düzenleme callback'i |

## Doğrulama Kuralları

Yerleşik doğrulama kuralları:

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

### Kural Tipleri

```tsx
interface ValidationRule {
  validator: (value: any, allValues?: Record<string, any>) => boolean;
  message: string;
}
```

## Temalar

Hazır temalar:

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

### Tema Arayüzü

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

## Tipler

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

### CSRFConfig

```tsx
interface CSRFConfig {
  tokenKey?: string;      // Form verisindeki token anahtarı
  headerName?: string;    // CSRF header adı
  cookieName?: string;    // CSRF cookie adı
  getToken?: () => string | Promise<string>; // Özel token getirici
}
```

## Olaylar ve Geri Çağrılar

### Form Olayları

```tsx
interface FormEvents {
  onStepChange?: (
    currentStepId: string,
    nextStepId: string,
    values: any
  ) => Promise<boolean> | boolean;
  onComplete?: (values: any) => Promise<void>;
  onValidationError?: (errors: Record<string, string[]>) => void;
  onFieldChange?: (fieldName: string, value: any) => void;
  onFieldBlur?: (fieldName: string) => void;
}
```

### Adım Olayları

```tsx
interface StepEvents {
  onEnter?: (stepId: string, values: any) => void;
  onLeave?: (stepId: string, values: any) => Promise<boolean> | boolean;
  onValidate?: (values: any) => Promise<boolean> | boolean;
}
```

## Güvenlik Özellikleri

### CSRF Koruması

```tsx
interface CSRFConfig {
  tokenKey: string;
  headerName: string;
  cookieName: string;
  getToken?: () => string | Promise<string>;
}
```

## Hata Yönetimi

### Hata Tipleri

```tsx
interface FormError {
  field: string;
  message: string;
  type: 'validation' | 'required' | 'format' | 'server';
}

interface StepError {
  stepId: string;
  errors: FormError[];
}

interface WizardError extends Error {
  code: string;
  details?: any;
}
```

### Hata Yönetimi Örneği

```tsx
try {
  await wizard.validateStep('personal');
} catch (error) {
  if (error instanceof WizardError) {
    console.error(`Hata ${error.code}:`, error.message);
  }
}
```

Daha fazla örnek ve detaylı kullanım için [Bileşenler](../bilesenler/README.md) dokümantasyonunu inceleyebilirsiniz. 