# Hook'lar

React Form Guardian iki ana hook sağlar.

## useFormWizard

Çok adımlı formları yönetmek için ana hook.

### Dönüş Değerleri

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
| isCurrentStepSummary | boolean | Özet adımında mı |
| editingStepId | string | null | Düzenlenen adım ID'si |
| handleEditStep | (stepId: string) => void | Adım düzenleme |
| returnToSummary | () => Promise<void> | Özete dön |

```tsx
import { useFormWizard } from 'react-form-guardian';

const FormOrnek = () => {
  const wizard = useFormWizard({
    steps: [
      {
        id: 'kisisel',
        title: 'Kişisel Bilgiler',
        fields: ['ad', 'soyad', 'email']
      },
      {
        id: 'adres',
        title: 'Adres Bilgileri',
        fields: ['adres', 'sehir', 'postaKodu']
      }
    ],
    formConfig: {
      ad: {
        required: true,
        requiredMessage: 'Ad alanı zorunludur'
      },
      // ... diğer alan yapılandırmaları
    },
    onComplete: async (values) => {
      console.log('Form tamamlandı:', values);
    }
  });

  // Kullanılabilir özellikler ve metodlar
  const {
    // Form Durumu
    values,          // Mevcut form değerleri
    errors,          // Doğrulama hataları
    touched,         // Dokunulan alanlar

    // Adım Yönetimi
    currentStep,     // Mevcut adım yapılandırması
    isFirstStep,     // İlk adımda mı?
    isLastStep,      // Son adımda mı?
    nextStep,        // Sonraki adıma git
    previousStep,    // Önceki adıma git
    
    // İlerleme
    wizardState: {
      progress,      // Mevcut ilerleme (0-100)
      currentStepId, // Mevcut adım ID'si
      completedSteps // Tamamlanan adımların dizisi
    },

    // Form İşlemleri
    handleSubmit,    // Form gönderme işleyicisi
    handleChange,    // Input değişim işleyicisi
    handleBlur,      // Input blur işleyicisi
  } = wizard;

  return (
    // Form JSX'iniz
  );
};
```

## useFormGuardian

Tek adımlı formları yönetmek için daha basit bir hook.

### Dönüş Değerleri

| Değer | Tip | Açıklama |
|-------|-----|-----------|
| values | Record<string, any> | Form değerleri |
| errors | Record<string, string[]> | Doğrulama hataları |
| touched | Record<string, boolean> | Dokunulan alanlar |
| handleChange | (fieldName: string, value: any) => void | Alan değişimi |
| handleBlur | (fieldName: string) => void | Alan blur |
| handleSubmit | (e?: React.FormEvent) => Promise<void> | Form gönderimi |
| reset | () => void | Formu sıfırla |
| setFieldValue | (fieldName: string, value: any) => void | Alan değeri ayarla |
| setFieldTouched | (fieldName: string, isTouched?: boolean) => void | Alan dokunma durumu |
| validateField | (fieldName: string) => Promise<boolean> | Alan doğrulama |
| validateForm | () => Promise<boolean> | Form doğrulama |
| isDirty | boolean | Form değişti mi |
| isValid | boolean | Form geçerli mi |
| isSubmitting | boolean | Form gönderiliyor mu |

```tsx
import { useFormGuardian } from 'react-form-guardian';

const FormOrnek = () => {
  const form = useFormGuardian({
    fields: {
      email: {
        required: true,
        requiredMessage: 'E-posta zorunludur',
        rules: [emailRule]
      },
      sifre: {
        required: true,
        requiredMessage: 'Şifre zorunludur',
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
      {/* Form alanlarınız */}
    </form>
  );
};
```

## Yapılandırma Tipleri

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

Tip ve yapılandırmalar hakkında daha fazla bilgi için [API Referansı](../api/README.md)'nı inceleyebilirsiniz. 