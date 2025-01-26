# Bileşenler

React Form Guardian form oluşturmak için temel bileşenler sağlar.

## StepSummary

Form adımlarının ve değerlerinin özetini gösteren bileşen.

```tsx
import { StepSummary } from 'react-form-guardian';

interface StepSummaryProps {
  steps: WizardStep[];
  values: Record<string, any>;
  onEdit: (stepId: string) => void;
}

const FormOrnek = () => {
  const wizard = useFormWizard({
    steps: [
      {
        id: 'kisisel',
        title: 'Kişisel Bilgiler',
        fields: ['ad', 'soyad'],
        summaryConfig: {
          labels: {
            ad: 'Ad',
            soyad: 'Soyad'
          },
          formatters: {
            ad: (value) => value.toUpperCase()
          },
          hideEmpty: true
        }
      },
      // ... diğer adımlar
    ],
    // ... diğer yapılandırmalar
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
        // Normal form içeriği
      )}
    </div>
  );
};
```

### Props

| Prop | Tip | Zorunlu | Açıklama |
|------|-----|----------|-----------|
| steps | WizardStep[] | Evet | Adım yapılandırmalarının dizisi |
| values | Record<string, any> | Evet | Mevcut form değerleri |
| onEdit | (stepId: string) => void | Evet | Düzenleme butonu tıklandığında çağrılır |

### Adım Yapılandırması

```tsx
interface WizardStep {
  // ... diğer özellikler
  summaryConfig?: {
    labels?: Record<string, string>;     // Özel alan etiketleri
    formatters?: Record<string, (value: any) => any>; // Değer biçimlendiricileri
    hideEmpty?: boolean;                 // Boş alanları gizle
  };
}
```

## İlerleme Çubuğu

İlerleme çubuğu useFormWizard hook'una entegre edilmiştir ve tema sistemi üzerinden stillenebilir:

```tsx
const FormOrnek = () => {
  const wizard = useFormWizard({
    // ... wizard yapılandırması
  });

  return (
    <div>
      {/* İlerleme Çubuğu */}
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

      {/* Form içeriği */}
    </div>
  );
};
```

## Adım Göstergesi

Adım göstergeleri de useFormWizard hook'u üzerinden yönetilir ve temalara göre stillenebilir:

```tsx
const FormOrnek = () => {
  const wizard = useFormWizard({
    // ... wizard yapılandırması
  });

  return (
    <div>
      {/* Adım Göstergeleri */}
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

      {/* Form içeriği */}
    </div>
  );
};
```

Tema ve özelleştirme hakkında daha fazla bilgi için [Temalar](../temalar/README.md) dokümantasyonunu inceleyebilirsiniz. 