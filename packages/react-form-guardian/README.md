# React Form Guardian

Güvenli, özelleştirilebilir ve kullanıcı dostu çok adımlı form yönetimi için React kütüphanesi.

[![npm version](https://badge.fury.io/js/react-form-guardian.svg)](https://badge.fury.io/js/react-form-guardian)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Kurulum

```bash
npm install react-form-guardian
# veya
yarn add react-form-guardian
```

## Temel Kullanım

```tsx
import { useFormWizard } from 'react-form-guardian';

const FormWizard = () => {
  const wizard = useFormWizard({
    steps: [
      {
        id: 'kisisel',
        title: 'Kişisel Bilgiler',
        fields: ['tcKimlik', 'email']
      },
      {
        id: 'adres',
        title: 'Adres Bilgileri',
        fields: ['il', 'ilce']
      }
    ],
    formConfig: {
      tcKimlik: {
        required: true,
        rules: [tcKimlikRule]
      },
      email: {
        required: true,
        rules: [emailRule]
      }
    }
  });

  return (
    <form onSubmit={wizard.handleSubmit}>
      {/* Form içeriği */}
    </form>
  );
};
```

## Özellikler

- 🔒 **Yerleşik Güvenlik**: CSRF koruması
- 🎨 **Tema Sistemi**: 10+ hazır tema
- ✨ **Form Yönetimi**: Çok adımlı formlar
- 📝 **Doğrulama**: TC Kimlik, IBAN, kredi kartı vb.

## Dokümantasyon

Detaylı dokümantasyon için:
- [GitHub Repository](https://github.com/zwennnnn/react-form-guardian)
- [Türkçe Dokümantasyon](https://github.com/zwennnnn/react-form-guardian/tree/main/docs/tr)
- [English Documentation](https://github.com/zwennnnn/react-form-guardian/tree/main/docs/en)

## Lisans

MIT © [Yağız Eke](https://github.com/zwennnnn) 