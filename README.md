# React Form Guardian 🛡️

Güvenli, özelleştirilebilir ve kullanıcı dostu çok adımlı form yönetimi için React kütüphanesi.

[![npm version](https://badge.fury.io/js/react-form-guardian.svg)](https://badge.fury.io/js/react-form-guardian)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Neden React Form Guardian?

React Form Guardian, karmaşık form süreçlerini basitleştirirken güvenlik ve kullanıcı deneyiminden ödün vermez. Diğer form kütüphanelerinden farkları:

- 🔒 **Yerleşik Güvenlik**: CSRF koruması, input sanitization gibi güvenlik özellikleri hazır gelir
- 🎨 **Zengin Tema Sistemi**: 10+ hazır tema, kolay özelleştirme ve responsive tasarım
- ✨ **Akıllı Form Yönetimi**: Koşullu adımlar, özet görünümü ve ileri-geri gezinme
- 📝 **Gelişmiş Doğrulama**: TC Kimlik, IBAN, kredi kartı gibi Türkiye'ye özel doğrulamalar
- 🌍 **Çoklu Dil Desteği**: Türkçe ve İngilizce dokümantasyon
- 🚀 **Performans Odaklı**: Minimum re-render ile optimize edilmiş yapı

## Özellikler

### Form Yönetimi
- ⚡️ Tek ve çok adımlı formlar için hooks
- 📊 İlerleme takibi ve adım göstergeleri
- 🔄 Koşullu adım yönlendirme
- 📝 Özet adımı ve düzenleme

### Doğrulama Sistemi
- ✅ TC Kimlik, IBAN, vergi no doğrulama
- 🔑 Güçlü parola kontrolü
- 📱 Telefon numarası formatı
- 💳 Kredi kartı doğrulama
- 📧 E-posta ve URL kontrolü
- 📅 Tarih ve yaş doğrulama

### Tema Sistemi
- 🎨 10+ hazır tema
- 🌓 Açık/koyu mod desteği
- 📱 Responsive tasarım
- 🎯 Kolay özelleştirme

### Güvenlik
- 🛡️ CSRF koruması
- 🔒 Input sanitization
- 🔐 Form durumu koruması

## Hızlı Başlangıç

```bash
npm install react-form-guardian
```

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

## Dokümantasyon

Detaylı dokümantasyon iki dilde mevcuttur:

- [Türkçe Dokümantasyon](./docs/tr/README.md)
  - [Başlangıç](./docs/tr/baslangic.md)
  - [Bileşenler](./docs/tr/bilesenler/README.md)
  - [Hook'lar](./docs/tr/hooks/README.md)
  - [Temalar](./docs/tr/temalar/README.md)
  - [Doğrulama](./docs/tr/dogrulama/README.md)
  - [Güvenlik](./docs/tr/guvenlik/README.md)

- [English Documentation](./docs/en/README.md)
  - [Getting Started](./docs/en/getting-started.md)
  - [Components](./docs/en/components/README.md)
  - [Hooks](./docs/en/hooks/README.md)
  - [Themes](./docs/en/themes/README.md)
  - [Validation](./docs/en/validation/README.md)
  - [Security](./docs/en/security/README.md)

## Örnekler

React Form Guardian'ı aksiyon halinde görmek için örneklerimizi inceleyin:

- [Temel Form](./examples/basic) - Basit çok adımlı form örneği
- [Temalı Form](./examples/themed) - Tema sistemi kullanımı
- [Gelişmiş Form](./examples/advanced) - Tüm özelliklerin kullanımı

## Destek ve İletişim

- 📚 [GitHub](https://github.com/zwennnnn/react-form-guardian)
- 📧 [E-posta](mailto:yagizeke@zwennnnn.pro)

## Lisans

MIT © [Yağız Eke](https://github.com/zwennnnn)

