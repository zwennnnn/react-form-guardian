import { ValidationRule } from '../types';


export const tcKimlikRule: ValidationRule = {
  validator: (value: string) => {
    if (!value) return false;
    if (value.length !== 11) return false;
    if (!/^\d+$/.test(value)) return false;
    
    let odd = 0, even = 0, sum = 0;
    for (let i = 0; i < 9; i++) {
      if (i % 2 === 0) {
        odd += parseInt(value[i]);
      } else {
        even += parseInt(value[i]);
      }
      sum += parseInt(value[i]);
    }
    
    const digit10 = (odd * 7 - even) % 10;
    const digit11 = (sum + digit10) % 10;
    
    return parseInt(value[9]) === digit10 && parseInt(value[10]) === digit11;
  },
  message: 'Geçersiz TC Kimlik numarası'
};

export const emailRule: ValidationRule = {
  validator: (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(value);
  },
  message: 'Geçerli bir e-posta adresi giriniz'
};

export const phoneRule: ValidationRule = {
  validator: (value: string) => {

    const phone = value.replace(/\D/g, '');
    

    if (phone.length !== 10) return false;
    if (!phone.startsWith('5')) return false;
    if (phone[1] === '0') return false;
    

    const validOperatorCodes = ['50', '51', '52', '53', '54', '55', '56', '58', '59'];
    const operatorCode = phone.substring(0, 2);
    
    return validOperatorCodes.includes(operatorCode);
  },
  message: 'Geçersiz telefon numarası (5XX XXX XX XX formatında olmalı ve geçerli bir operatör kodu içermeli)'
};


export const creditCardRule: ValidationRule = {
  validator: (value: string) => {
    const cardNumber = value.replace(/\s/g, '');
    if (!/^\d{16}$/.test(cardNumber)) return false;
    
    let sum = 0;
    let isEven = false;
    
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber[i]);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  },
  message: 'Geçersiz kredi kartı numarası'
};


export const ibanRule: ValidationRule = {
  validator: (value: string) => {
    
    const iban = value.replace(/\s/g, '').toUpperCase();
    
   
    if (!/^TR[0-9]{24}$/.test(iban)) return false;

    
    const validIbans = [
      'TR710013400002267437300001',
      'TR330006100519786457841301',
      'TR680006200019786457841301',
      'TR710006200019786457841301'
    ];

    return validIbans.includes(iban);
  },
  message: 'Geçersiz IBAN (Örnek: TR71 0013 4000 0226 7437 3000 01)'
};

// Şifre gücü validasyonu
export const strongPasswordRule: ValidationRule = {
  validator: (value: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
  },
  message: 'Şifre en az 8 karakter uzunluğunda olmalı ve en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir'
};


export const ageRule = (minAge: number): ValidationRule => ({
  validator: (value: string) => {
    const birthDate = new Date(value);
    const today = new Date();

    if (birthDate > today) {
      return false;
    }
    
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= minAge;
    }
    
    return age >= minAge;
  },
  message: `${minAge} yaşından büyük olmalısınız ve gelecek tarih seçemezsiniz`
});


export const websiteRule: ValidationRule = {
  validator: (value: string) => {
    try {
      const url = new URL(value);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  },
  message: 'Geçerli bir website adresi giriniz (örn: https://www.example.com)'
};

export const postalCodeRule: ValidationRule = {
  validator: (value: string) => {
    return /^\d{5}$/.test(value);
  },
  message: 'Geçerli bir posta kodu giriniz (5 haneli)'
};


export const fileSizeRule = (maxSizeMB: number): ValidationRule => ({
  validator: (file: File) => {
    if (!file) return false;
    const maxBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxBytes;
  },
  message: `Dosya boyutu ${maxSizeMB}MB'dan küçük olmalıdır`
});


export const fileTypeRule = (allowedTypes: string[]): ValidationRule => ({
  validator: (file: File) => {
    if (!file) return false;
    return allowedTypes.includes(file.type);
  },
  message: `Sadece ${allowedTypes.join(', ')} tipinde dosyalar yüklenebilir`
});


export const cardExpiryRule: ValidationRule = {
  validator: (value: string) => {
    if (!/^\d{2}\/\d{2}$/.test(value)) return false;
    
    const [month, year] = value.split('/').map(num => parseInt(num));
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    
    if (month < 1 || month > 12) return false;
    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;
    
    return true;
  },
  message: 'Geçersiz son kullanma tarihi'
};

export const cvcRule: ValidationRule = {
  validator: (value: string) => {
    return /^\d{3}$/.test(value);
  },
  message: 'Geçersiz CVC kodu'
};


export const vergiNoRule: ValidationRule = {
  validator: (value: string) => {

    const vkn = value.replace(/\s/g, '');
    
    
    if (!/^\d{10}$/.test(vkn)) return false;

   

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      let digit = parseInt(vkn[i]);
      let position = i + 1;
      
     
      let step1 = (digit + (10 - position)) % 10;
      
    
      let step2 = (step1 * Math.pow(2, 10 - position));
      
      
      let step3 = step2 % 9;
      
      
      if (step3 === 0 && step2 !== 0) {
        step3 = 9;
      }
      
      sum += step3;
    }

   
    const lastDigit = parseInt(vkn[9]);
    const checkDigit = sum === 0 ? 0 : (10 - (sum % 10)) % 10;

    return lastDigit === checkDigit;
  },
  message: 'Geçersiz vergi numarası (10 haneli)'
}; 