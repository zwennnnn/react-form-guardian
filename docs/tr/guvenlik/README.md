# Güvenlik Özellikleri

React Form Guardian, formlarınızı güvende tutmak için çeşitli güvenlik özellikleri sunar.

## CSRF Koruması

Cross-Site Request Forgery (CSRF) saldırılarına karşı koruma:

```tsx
const wizard = useFormWizard({
  csrf: {
    tokenKey: '_csrf', // Form verisinde kullanılacak anahtar
    headerName: 'X-CSRF-Token', // Header'da kullanılacak isim
    cookieName: 'csrf-token', // Cookie'de saklanacak isim
    getToken: async () => {
      // Token'ı almak için özel fonksiyon
      const response = await fetch('/api/csrf-token');
      const data = await response.json();
      return data.token;
    }
  }
});
```

### CSRF Token Kullanımı

Form gönderiminde otomatik olarak:
- Form verisine token eklenir
- Request header'ına token eklenir
- Backend'de doğrulama yapılabilir

## Veri Sanitizasyonu

Güvenli olmayan karakterlerin temizlenmesi:

```tsx
const wizard = useFormWizard({
  sanitize: {
    html: true, // HTML etiketlerini temizler
    script: true, // Script taglerini temizler
    sql: true, // SQL injection karakterlerini temizler
    xss: true // XSS saldırı vektörlerini temizler
  }
});
```

## Rate Limiting

Art arda form gönderimlerini sınırlama:

```tsx
const wizard = useFormWizard({
  rateLimit: {
    maxAttempts: 5, // Maximum deneme sayısı
    windowMs: 60000, // Zaman penceresi (ms)
    message: 'Çok fazla deneme yaptınız. Lütfen bekleyin.'
  }
});
```

## Hassas Veri İşleme

Hassas verilerin güvenli şekilde işlenmesi:

```tsx
const wizard = useFormWizard({
  sensitiveFields: ['creditCard', 'cvv'], // Hassas alanlar
  maskSensitiveData: true, // Hassas verileri maskele
  secureCookie: true, // Güvenli cookie kullanımı
  httpOnly: true // HttpOnly cookie özelliği
});
```

## Input Validasyonu

Güvenlik odaklı input doğrulama:

```tsx
const securityRules = {
  username: [
    {
      validator: (value) => !/[<>{}]/.test(value),
      message: 'Özel karakterler kullanılamaz'
    }
  ],
  password: [
    {
      validator: (value) => !commonPasswords.includes(value),
      message: 'Çok yaygın bir şifre kullanılamaz'
    }
  ]
};
```

## SSL/TLS Zorunluluğu

Güvenli bağlantı zorunluluğu:

```tsx
const wizard = useFormWizard({
  requireSSL: true, // SSL/TLS zorunluluğu
  redirectToHttps: true // HTTP'den HTTPS'e yönlendirme
});
```

## Güvenlik Başlıkları

Otomatik güvenlik başlıkları:

```tsx
const wizard = useFormWizard({
  securityHeaders: {
    'Content-Security-Policy': "default-src 'self'",
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'X-Content-Type-Options': 'nosniff'
  }
});
```

## Hata Mesajları

Güvenli hata mesajları:

```tsx
const wizard = useFormWizard({
  errorHandling: {
    sanitizeErrors: true, // Hata mesajlarından hassas bilgileri temizle
    genericErrors: true, // Genel hata mesajları kullan
    logErrors: true // Hataları logla
  }
});
```

## Session Yönetimi

Güvenli oturum yönetimi:

```tsx
const wizard = useFormWizard({
  session: {
    timeout: 30 * 60 * 1000, // 30 dakika timeout
    regenerateId: true, // Session ID'yi düzenli yenile
    secure: true // Güvenli session ayarları
  }
});
```

## Dosya Upload Güvenliği

Güvenli dosya yükleme:

```tsx
const wizard = useFormWizard({
  fileUpload: {
    maxSize: 5 * 1024 * 1024, // Maximum dosya boyutu (5MB)
    allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
    scanVirus: true, // Virüs taraması
    sanitizeFilename: true // Dosya adı temizleme
  }
});
```

## Güvenlik İpuçları

1. **Form Verileri**
   - Hassas verileri şifreleyin
   - Input validasyonu yapın
   - XSS koruması uygulayın

2. **API Güvenliği**
   - HTTPS kullanın
   - Rate limiting uygulayın
   - API anahtarlarını gizli tutun

3. **Kullanıcı Verileri**
   - Şifreleri hash'leyin
   - Kişisel verileri koruyun
   - Session'ları güvenli tutun
``` 