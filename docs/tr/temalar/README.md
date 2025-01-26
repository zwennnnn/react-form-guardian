# Temalar

React Form Guardian esnek bir tema sistemi ve birçok hazır tema sunar.

## Hazır Temalar

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

const FormOrnek = () => {
  const wizard = useFormWizard({
    // ... diğer ayarlar
    theme: darkTheme
  });
};
```

## Tema Yapısı

Her tema WizardTheme arayüzünü uygular:

```tsx
interface WizardTheme {
  colors: {
    primary: string;    // Ana marka rengi
    secondary: string;  // İkincil marka rengi
    success: string;    // Başarı durumu rengi
    error: string;      // Hata durumu rengi
    background: string; // Arkaplan rengi
    text: string;       // Metin rengi
    border: string;     // Kenarlık rengi
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

## Hazır Temalar

### Light Theme (Varsayılan)
```tsx
const wizard = useFormWizard({
  theme: lightTheme // Temiz, profesyonel açık tema
});
```

### Dark Theme
```tsx
const wizard = useFormWizard({
  theme: darkTheme // Modern karanlık mod teması
});
```

### Modern Theme
```tsx
const wizard = useFormWizard({
  theme: modernTheme // Çağdaş minimalist tasarım
});
```

### Warm Theme
```tsx
const wizard = useFormWizard({
  theme: warmTheme // Sıcak, davetkar renk paleti
});
```

### Neon Theme
```tsx
const wizard = useFormWizard({
  theme: neonTheme // Canlı, yüksek kontrast tasarım
});
```

### Pastel Theme
```tsx
const wizard = useFormWizard({
  theme: pastelTheme // Yumuşak, rahatlatıcı renk şeması
});
```

### Retro Theme
```tsx
const wizard = useFormWizard({
  theme: retroTheme // Klasik, nostaljik tasarım
});
```

### Gradient Theme
```tsx
const wizard = useFormWizard({
  theme: gradientTheme // Modern gradyan efektleri
});
```

### Minimal Theme
```tsx
const wizard = useFormWizard({
  theme: minimalTheme // Ultra-minimalist tasarım
});
```

### Corporate Theme
```tsx
const wizard = useFormWizard({
  theme: corporateTheme // Profesyonel iş stili
});
```

### Game Theme
```tsx
const wizard = useFormWizard({
  theme: gameTheme // Oyunsu, eğlenceli arayüz
});
```

## Özel Tema

WizardTheme arayüzünü uygulayarak kendi temanızı oluşturabilirsiniz:

```tsx
const ozelTema: WizardTheme = {
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
  // ... diğer gerekli özellikler
};

const wizard = useFormWizard({
  theme: ozelTema
});
```

Tema tipleri ve yapılandırmaları hakkında daha fazla bilgi için [API Referansı](../api/README.md)'nı inceleyebilirsiniz.

## Tema Değiştirme

Temayı dinamik olarak değiştirmek için:

```tsx
const FormWizard = () => {
  const [currentTheme, setCurrentTheme] = useState('light');
  
  const wizard = useFormWizard({
    theme: currentTheme
  });

  return (
    <div>
      <select onChange={(e) => setCurrentTheme(e.target.value)}>
        <option value="light">Açık Tema</option>
        <option value="dark">Koyu Tema</option>
        <option value="modern">Modern Tema</option>
        {/* Diğer tema seçenekleri */}
      </select>

      {/* Form içeriği */}
    </div>
  );
};
```

## Responsive Tasarım

Tüm temalar mobil cihazlar için otomatik olarak uyumludur. Ekran boyutuna göre:

- Input alanları tam genişliğe uyum sağlar
- Butonlar mobil için optimize edilir
- Adım göstergeleri küçük ekranlarda yeniden düzenlenir
- Font boyutları otomatik ayarlanır

## Tema Geçişleri

Temalar arası geçişlerde otomatik animasyonlar:

```tsx
const wizard = useFormWizard({
  theme: 'light',
  themeTransition: {
    duration: '0.3s',
    timing: 'ease-in-out'
  }
});
```

## Tema Özelleştirme İpuçları

1. **Renk Paleti**
   - Ana renginizi belirleyin
   - Tamamlayıcı renkler seçin
   - Kontrast oranlarını kontrol edin

2. **Tutarlılık**
   - Font ailesini koruyun
   - Boşluk değerlerini standartlaştırın
   - Renk tonlarını uyumlu tutun

3. **Erişilebilirlik**
   - Yeterli kontrast sağlayın
   - Okunabilir font boyutları kullanın
   - Hover ve focus durumlarını belirgin yapın 