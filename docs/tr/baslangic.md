# Başlangıç

React Form Guardian, çok adımlı formlar oluşturmak için kullanılan güçlü ve özelleştirilebilir bir React kütüphanesidir.

## Kurulum

npm kullanarak:
```bash
npm install react-form-guardian
```

yarn kullanarak:
```bash
yarn add react-form-guardian
```

## Temel Kullanım

İşte basit bir form wizard örneği:

```tsx
import { useFormWizard } from 'react-form-guardian';

const BasitOrnek = () => {
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
      soyad: {
        required: true,
        requiredMessage: 'Soyad alanı zorunludur'
      },
      email: {
        required: true,
        requiredMessage: 'E-posta alanı zorunludur',
        rules: [emailRule]
      },
      adres: {
        required: true,
        requiredMessage: 'Adres zorunludur'
      },
      sehir: {
        required: true,
        requiredMessage: 'Şehir zorunludur'
      },
      postaKodu: {
        required: true,
        requiredMessage: 'Posta kodu zorunludur'
      }
    },
    onComplete: async (values) => {
      console.log('Form tamamlandı:', values);
    }
  });

  return (
    <form onSubmit={wizard.handleSubmit}>
      <div>
        <h2>{wizard.currentStep.title}</h2>
        
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

        {/* Form Alanları */}
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

        {/* Gezinme Butonları */}
        <div>
          {!wizard.isFirstStep && (
            <button type="button" onClick={wizard.previousStep}>
              Geri
            </button>
          )}
          <button type="submit">
            {wizard.isLastStep ? 'Tamamla' : 'İleri'}
          </button>
        </div>
      </div>
    </form>
  );
};
```

## Özellikler

- 🎯 Çok adımlı form yönetimi
- 🎨 Tema desteği
- ✨ Yerleşik doğrulama
- 📝 Form durum yönetimi
- 🔄 Adım gezinme
- 📊 İlerleme takibi

## Sonraki Adımlar

Daha fazla özellik ve detaylı kullanım için şu bölümleri inceleyebilirsiniz:

- [Hook'lar](./hooks/README.md)
- [Bileşenler](./bilesenler/README.md)
- [Temalar](./temalar/README.md)
- [Doğrulama](./dogrulama/README.md) 