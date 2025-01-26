# Doğrulama

React Form Guardian kapsamlı bir doğrulama sistemi ve yerleşik kurallar sunar.

## Yerleşik Doğrulama Kuralları

### Temel Kurallar

```tsx
import {
  emailRule,
  phoneRule,
  strongPasswordRule,
  websiteRule,
  postalCodeRule
} from 'react-form-guardian';

const formConfig = {
  email: {
    required: true,
    rules: [emailRule]        // E-posta formatını doğrular
  },
  telefon: {
    required: true,
    rules: [phoneRule]        // Telefon numarası formatını doğrular (5XX XXX XX XX)
  },
  sifre: {
    required: true,
    rules: [strongPasswordRule] // Şifre gücünü doğrular
  },
  website: {
    rules: [websiteRule]      // URL formatını doğrular
  },
  postaKodu: {
    rules: [postalCodeRule]   // Posta kodu formatını doğrular (5 haneli)
  }
};
```

### Kimlik ve Finansal Kurallar

```tsx
import {
  tcKimlikRule,
  ibanRule,
  vergiNoRule,
  creditCardRule,
  cardExpiryRule,
  cvcRule
} from 'react-form-guardian';

const formConfig = {
  tcKimlik: {
    required: true,
    rules: [tcKimlikRule]     // TC Kimlik numarasını doğrular
  },
  iban: {
    required: true,
    rules: [ibanRule]         // IBAN formatını doğrular
  },
  vergiNo: {
    required: true,
    rules: [vergiNoRule]      // Vergi numarasını doğrular
  },
  kartNumarasi: {
    required: true,
    rules: [creditCardRule]   // Kredi kartı numarasını doğrular
  },
  sonKullanma: {
    required: true,
    rules: [cardExpiryRule]   // Kart son kullanma tarihini doğrular (AA/YY)
  },
  cvc: {
    required: true,
    rules: [cvcRule]          // CVC kodunu doğrular (3 haneli)
  }
};
```

### Dosya Kuralları

```tsx
import {
  fileSizeRule,
  fileTypeRule
} from 'react-form-guardian';

const formConfig = {
  profilResmi: {
    rules: [
      fileSizeRule(5),        // Maksimum 5MB
      fileTypeRule(['image/jpeg', 'image/png'])
    ]
  }
};
```

### Yaş Kuralı

```tsx
import { ageRule } from 'react-form-guardian';

const formConfig = {
  dogumTarihi: {
    rules: [ageRule(18)]      // En az 18 yaşında olmalı
  }
};
```

## Özel Doğrulama Kuralları

ValidationRule arayüzünü uygulayarak özel doğrulama kuralları oluşturabilirsiniz:

```tsx
import { ValidationRule } from 'react-form-guardian';

const ozelKural: ValidationRule = {
  validator: (value: any, allValues?: Record<string, any>) => {
    // Doğrulama mantığınız
    return true; // veya false
  },
  message: 'Özel hata mesajı'
};

const formConfig = {
  ozelAlan: {
    rules: [ozelKural]
  }
};
```

## Birden Fazla Kural Kullanımı

Bir alan için birden fazla doğrulama kuralı birleştirebilirsiniz:

```tsx
const formConfig = {
  email: {
    required: true,
    requiredMessage: 'E-posta zorunludur',
    rules: [
      emailRule,
      {
        validator: (value) => value.endsWith('@sirket.com'),
        message: 'Şirket e-postası kullanmalısınız'
      }
    ]
  }
};
```

## Form Wizard'da Doğrulama

useFormWizard ile kullanırken, doğrulama her adım için otomatik olarak yönetilir:

```tsx
const wizard = useFormWizard({
  steps: [
    {
      id: 'kisisel',
      fields: ['email', 'telefon'],
      customValidation: async (values) => {
        // Ek adım seviyesi doğrulama
        return true;
      }
    }
  ],
  formConfig: {
    email: {
      required: true,
      rules: [emailRule]
    },
    telefon: {
      required: true,
      rules: [phoneRule]
    }
  }
});
```

Doğrulama tipleri ve yapılandırmaları hakkında daha fazla bilgi için [API Referansı](../api/README.md)'nı inceleyebilirsiniz. 