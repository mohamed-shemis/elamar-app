# ELAMAR – Equipment Management System

## المميزات / Features
- 🌐 Arabic / English تبديل اللغة
- 🔐 تسجيل دخول + صلاحيات 3 مستويات
- 📊 لوحة متابعة + تقارير
- 📋 891 سجل معدات
- 🔄 مزامنة Google Sheets
- 🔔 إشعارات مستخدمين جدد على Gmail
- ☁️ Firebase Realtime Database

## إعداد Firebase Rules
```json
{
  "rules": {
    "records":       { ".read": "auth != null", ".write": "auth != null" },
    "users":         { ".read": "auth != null", ".write": "auth != null" },
    "notifications": { ".read": "auth != null", ".write": "auth != null" }
  }
}
```

## إعداد إشعارات Gmail (EmailJS)
1. سجل على emailjs.com مجاناً
2. أضف Service → Gmail
3. أنشئ Template
4. في src/index.html ابحث عن YOUR_EMAILJS_SERVICE وغيّر:
   - YOUR_EMAILJS_SERVICE  → Service ID
   - YOUR_EMAILJS_TEMPLATE → Template ID
   - YOUR_EMAILJS_KEY      → Public Key

## تشغيل محلي
```
npm install
npm start
```

## بناء .exe
```
npm install
npm run build:win
```

## رفع على GitHub للبناء التلقائي
ارفع الملفات على GitHub → Actions تبني .exe تلقائياً → Releases
