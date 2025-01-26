import React, { useEffect } from 'react';
import { useFormWizard } from '../../packages/react-form-guardian/src';
import { StepSummary } from '../../packages/react-form-guardian/src/components/StepSummary';
import { 
  tcKimlikRule, 
  emailRule, 
  phoneRule, 
  strongPasswordRule,
  ageRule,
  postalCodeRule,
  ibanRule,
  creditCardRule,
  cardExpiryRule,
  cvcRule,
  websiteRule,
  vergiNoRule
} from '../../packages/react-form-guardian/src/validations/rules';
import { modernTheme } from '../../packages/react-form-guardian/src/themes/defaultThemes';
import { WizardStep, WizardConfig } from '../../packages/react-form-guardian/src/types';

const steps: WizardStep[] = [
  {
    id: 'personal',
    title: 'Kişisel Bilgiler',
    description: 'Kişisel bilgilerinizi girin',
    fields: ['tcKimlik', 'name', 'email', 'birthDate', 'phone', 'website'],
    isOptional: false
  },
  {
    id: 'address',
    title: 'Adres Bilgileri',
    description: 'Adres bilgilerinizi girin',
    fields: ['address', 'city', 'postalCode', 'iban'],
    isOptional: false
  },
  {
    id: 'payment',
    title: 'Ödeme Bilgileri',
    description: 'Ödeme bilgilerinizi girin',
    fields: ['cardNumber', 'cardName', 'cardExpiry', 'cardCVC'],
    isOptional: true,
    showIf: (values) => {
      const birthDate = new Date(values.birthDate);
      const age = new Date().getFullYear() - birthDate.getFullYear();
      return age >= 18;
    }
  },
  {
    id: 'work',
    title: 'İş Bilgileri',
    description: 'İş durumunuzu belirtin',
    fields: ['isEmployed'],
    isOptional: false
  },
  {
    id: 'company',
    title: 'Şirket Bilgileri',
    description: 'Şirket bilgilerinizi girin',
    fields: ['companyName', 'vergiNo', 'position', 'salary', 'companyWebsite'],
    dependsOn: ['work'],
    showIf: (values) => values.isEmployed === 'yes',
    skipIf: (values) => values.isEmployed === 'no',
    isOptional: true
  },
  {
    id: 'account',
    title: 'Hesap Bilgileri',
    description: 'Hesap bilgilerinizi girin',
    fields: ['username', 'password', 'passwordConfirm'],
    isOptional: false,
    customValidation: async (values) => {
     
      if (values.password !== values.passwordConfirm) {
        throw new Error('Şifreler eşleşmiyor');
      }

    
      const forbiddenUsernames = ['admin', 'root', 'user', 'administrator', 'moderator', 'system'];
      if (forbiddenUsernames.includes(values.username?.toLowerCase())) {
        throw new Error('Bu kullanıcı adı kullanılamaz');
      }

     
      await new Promise(resolve => setTimeout(resolve, 1000));
      const takenUsernames = ['johndoe', 'janedoe', 'testuser', 'demo'];
      if (takenUsernames.includes(values.username?.toLowerCase())) {
        throw new Error('Bu kullanıcı adı zaten alınmış');
      }

      return true;
    }
  },
  {
    id: 'summary',
    title: 'Başvuru Özeti',
    description: 'Lütfen bilgilerinizi kontrol edin',
    fields: [],
    isSummary: true,
    summaryConfig: {
      labels: {
        tcKimlik: 'TC Kimlik No',
        name: 'Ad Soyad',
        email: 'E-posta',
        birthDate: 'Doğum Tarihi',
        phone: 'Telefon',
        website: 'Website',
        address: 'Adres',
        city: 'Şehir',
        postalCode: 'Posta Kodu',
        iban: 'IBAN',
        cardNumber: 'Kart Numarası',
        cardName: 'Kart Üzerindeki İsim',
        cardExpiry: 'Son Kullanma Tarihi',
        cardCVC: 'CVC',
        isEmployed: 'Çalışma Durumu',
        companyName: 'Şirket Adı',
        vergiNo: 'Vergi No',
        position: 'Pozisyon',
        salary: 'Maaş',
        companyWebsite: 'Şirket Website',
        username: 'Kullanıcı Adı'
      },
      formatters: {
        isEmployed: (value) => value === 'yes' ? 'Evet, çalışıyor' : 'Hayır, çalışmıyor',
        birthDate: (value) => new Date(value).toLocaleDateString('tr-TR'),
        salary: (value) => `${value} ₺`,
        cardNumber: (value) => value ? `**** **** **** ${value.slice(-4)}` : '',
        cardCVC: () => '***'
      },
      hideEmpty: true,
      order: [
        'name', 'tcKimlik', 'email', 'phone', 'birthDate', 'address', 'city', 'postalCode',
        'isEmployed', 'companyName', 'vergiNo', 'position', 'salary', 'companyWebsite',
        'iban', 'cardNumber', 'cardName', 'cardExpiry',
        'username'
      ]
    }
  }
];

const formConfig = {
  fields: {
    tcKimlik: {
      initialValue: '',
      required: true,
      requiredMessage: 'TC Kimlik numarası zorunludur',
      placeholder: '11111111111',
      rules: [tcKimlikRule]
    },
    name: {
      initialValue: '',
      required: true,
      requiredMessage: 'İsim zorunludur',
      placeholder: 'Ad Soyad'
    },
    email: {
      initialValue: '',
      required: true,
      requiredMessage: 'E-posta zorunludur',
      placeholder: 'ornek@email.com',
      rules: [emailRule]
    },
    birthDate: { 
      initialValue: '',
      required: true, 
      requiredMessage: 'Doğum tarihi zorunludur',
      rules: [ageRule(18)]
    },
    phone: {
      initialValue: '',
      required: true,
      requiredMessage: 'Telefon numarası zorunludur',
      placeholder: '5XX XXX XX XX',
      rules: [phoneRule]
    },
    website: { 
      initialValue: '',
      required: false,
      placeholder: 'https://www.example.com',
      rules: [websiteRule]
    },
    address: {
      initialValue: '',
      required: true,
      requiredMessage: 'Adres zorunludur',
      placeholder: 'Sokak, Mahalle, No'
    },
    city: {
      initialValue: '',
      required: true,
      requiredMessage: 'Şehir zorunludur'
    },
    postalCode: {
      initialValue: '',
      required: true,
      requiredMessage: 'Posta kodu zorunludur',
      placeholder: '34100',
      rules: [postalCodeRule]
    },
    iban: {
      initialValue: '',
      required: true,
      requiredMessage: 'IBAN zorunludur',
      placeholder: 'TR71 0013 4000 0226 7437 3000 01',
      rules: [ibanRule]
    },
    cardNumber: {
      initialValue: '',
      required: true,
      requiredMessage: 'Kart numarası zorunludur',
      placeholder: '4444 4444 4444 4444',
      rules: [creditCardRule]
    },
    cardName: {
      initialValue: '',
      required: true,
      requiredMessage: 'Kart üzerindeki isim zorunludur',
      placeholder: 'AD SOYAD'
    },
    cardExpiry: {
      initialValue: '',
      required: true,
      requiredMessage: 'Son kullanma tarihi zorunludur',
      placeholder: 'MM/YY',
      rules: [cardExpiryRule]
    },
    cardCVC: {
      initialValue: '',
      required: true,
      requiredMessage: 'CVC kodu zorunludur',
      placeholder: '***',
      rules: [cvcRule]
    },
    isEmployed: {
      initialValue: '',
      required: true,
      requiredMessage: 'Çalışma durumunuzu seçiniz',
      rules: [{
        validator: (value) => value === 'yes' || value === 'no',
        message: 'Geçerli bir seçim yapınız'
      }]
    },
    companyName: {
      initialValue: '',
      required: true,
      requiredMessage: 'Şirket adı zorunludur'
    },
    vergiNo: {
      initialValue: '',
      required: true,
      requiredMessage: 'Vergi numarası zorunludur',
      placeholder: '1234567890',
      rules: [vergiNoRule]
    },
    position: {
      initialValue: '',
      required: true,
      requiredMessage: 'Pozisyon bilgisi zorunludur'
    },
    salary: {
      initialValue: '',
      required: true,
      requiredMessage: 'Maaş bilgisi zorunludur'
    },
    companyWebsite: {
      initialValue: '',
      required: true,
      requiredMessage: 'Şirket web sitesi zorunludur',
      rules: [websiteRule]
    },
    username: {
      initialValue: '',
      required: true,
      requiredMessage: 'Kullanıcı adı zorunludur',
      placeholder: 'kullanici_adi',
      rules: [{
        validator: (value) => /^[a-zA-Z0-9._]{4,20}$/.test(value),
        message: 'Kullanıcı adı en az 4, en fazla 20 karakter olmalı ve sadece harf, rakam, nokta ve alt çizgi içerebilir'
      }]
    },
    password: {
      initialValue: '',
      required: true,
      requiredMessage: 'Şifre zorunludur',
      placeholder: '********',
      rules: [strongPasswordRule]
    },
    passwordConfirm: {
      initialValue: '',
      required: true,
      requiredMessage: 'Şifre tekrarı zorunludur',
      placeholder: '********'
    }
  }
};

const CSRF_STORAGE_KEY = 'form_csrf_token';


const getOrCreateToken = () => {
  let token = localStorage.getItem(CSRF_STORAGE_KEY);
  
  if (!token) {
    token = `csrf-${Date.now()}`;
    localStorage.setItem(CSRF_STORAGE_KEY, token);
    document.cookie = `csrf_token=${token}; path=/; max-age=3600`;
  }
  
  return token;
};

const wizardConfig: WizardConfig = {
  steps,
  theme: modernTheme,
  csrf: {
    tokenKey: '_csrf',
    headerName: 'X-CSRF-Token',
    getToken: async () => {
      const token = `csrf-${Date.now()}`;
      console.log('CSRF Token üretildi:', token);
      return token;
    }
  },
  onComplete: async (formDataOrObject: any) => {
    console.log('Form gönderimi başladı');
    console.log('Form verileri:', formDataOrObject);

    if (formDataOrObject.data && formDataOrObject.headers) {
      console.log('CSRF korumalı gönderim:');
      console.log('- Form verileri:', formDataOrObject.data);
      console.log('- CSRF Token:', formDataOrObject.data._csrf);
      console.log('- Headers:', Object.fromEntries(formDataOrObject.headers.entries()));
    } else {
      console.log('Normal gönderim:', formDataOrObject);
    }

   
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Form başarıyla gönderildi!');
  }
};

export const AdvancedExample: React.FC = () => {
  const wizard = useFormWizard(wizardConfig, formConfig);

  useEffect(() => {
    const token = getOrCreateToken();
    console.log('Mevcut CSRF Token:', token);
  }, []); 

  const currentStep = steps.find(s => s.id === wizard.wizardState.currentStepId);

  const getFieldType = (fieldName: string) => {
    switch (fieldName) {
      case 'birthDate':
        return 'date';
      case 'password':
      case 'passwordConfirm':
      case 'cardCVC':
        return 'password';
      case 'email':
        return 'email';
      case 'phone':
        return 'tel';
      case 'salary':
        return 'number';
      case 'cardNumber':
        return 'tel';
      case 'cardExpiry':
        return 'text';
      case 'website':
      case 'companyWebsite':
        return 'url';
      case 'isEmployed':
        return 'select';
      default:
        return 'text';
    }
  };

  const formatValue = (fieldName: string, value: string) => {
    switch (fieldName) {
      case 'cardNumber':
       
        const cardNum = value.replace(/\D/g, '').slice(0, 16);
      
        return cardNum.replace(/(\d{4})/g, '$1 ').trim();
        
      case 'cardExpiry':
        
        const expiry = value.replace(/\D/g, '').slice(0, 4);
        
        return expiry.replace(/(\d{2})(\d{0,2})/, '$1/$2').trim();
        
      case 'iban':
       
        const iban = value.replace(/\s/g, '').toUpperCase().slice(0, 26);
      
        return iban.replace(/(.{4})/g, '$1 ').trim();
        
      case 'phone':
        
        const phone = value.replace(/\D/g, '').slice(0, 10);
        
        return phone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4').trim();
        
      case 'tcKimlik':
       
        return value.replace(/\D/g, '').slice(0, 11);
        
      case 'vergiNo':
      
        const vkn = value.replace(/\D/g, '').slice(0, 10);
    
        return vkn.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3').trim();
        
      case 'cardCVC':
        
        return value.replace(/\D/g, '').slice(0, 3);
        
      default:
        return value;
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {/* Progress Bar */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ 
          height: '8px', 
          backgroundColor: '#eee',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{ 
            width: `${wizard.wizardState.progress}%`,
            height: '100%',
            backgroundColor: '#007bff',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Form */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: '20px' }}>{currentStep?.title}</h2>
        <p style={{ marginBottom: '30px', color: '#666' }}>{currentStep?.description}</p>

        {wizard.isCurrentStepSummary ? (
          <StepSummary
            steps={steps}
            values={wizard.values}
            onEdit={wizard.handleEditStep}
          />
        ) : (
          <form onSubmit={wizard.handleSubmit}>
            {/* Form Fields */}
            {currentStep?.fields.map((fieldName) => (
              <div key={fieldName} style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  {fieldName === 'isEmployed' ? 'Çalışma Durumu' : fieldName}:
                </label>
                {fieldName === 'isEmployed' ? (
                  <select
                    value={wizard.values[fieldName] || ''}
                    onChange={(e) => wizard.handleChange(fieldName, e.target.value)}
                    onBlur={() => wizard.handleBlur(fieldName)}
                    style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
                  >
                    <option value="">Seçiniz</option>
                    <option value="yes">Evet, çalışıyorum</option>
                    <option value="no">Hayır, çalışmıyorum</option>
                  </select>
                ) : (
                  <input
                    type={getFieldType(fieldName)}
                    value={formatValue(fieldName, wizard.values[fieldName] || '')}
                    onChange={(e) => wizard.handleChange(fieldName, e.target.value)}
                    onBlur={() => wizard.handleBlur(fieldName)}
                    placeholder={formConfig.fields[fieldName]?.placeholder}
                    style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
                  />
                )}
                {wizard.touched[fieldName] && wizard.errors[fieldName]?.map((error) => (
                  <div key={error} style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
                    {error}
                  </div>
                ))}
              </div>
            ))}

            {/* Navigation Buttons */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginTop: '30px'
            }}>
              {!wizard.isFirstStep && (
                <button
                  type="button"
                  onClick={wizard.previousStep}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Geri
                </button>
              )}

              {wizard.editingStepId ? (
                <button
                  type="button"
                  onClick={wizard.returnToSummary}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginLeft: 'auto'
                  }}
                >
                  Özete Dön
                </button>
              ) : (
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginLeft: 'auto'
                  }}
                >
                  {wizard.isCurrentStepSummary ? 'Formu Gönder' : 'İleri'}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}; 