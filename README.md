# ELAMAR – دليل الصيانة والتطوير

## هيكل الملفات
```
ELAMAR/
├── src/
│   ├── index.html    ← التطبيق الكامل (HTML + CSS + JavaScript) - كل التعليقات هنا
│   ├── icon.png      ← أيقونة التطبيق (512×512)
│   └── icon.ico      ← أيقونة Windows متعددة الأحجام
├── main.js           ← نقطة دخول Electron (موثّق بالكامل)
├── package.json      ← إعدادات البناء
└── .github/
    └── workflows/
        └── build.yml ← GitHub Actions (بناء تلقائي، موثّق)
```

## أين أجد كل حاجة في index.html؟

| ما أريد تعديله | ابحث (Ctrl+F) عن |
|----------------|-------------------|
| نصوص عربي/إنجليزي | `const TR = {` |
| الصلاحيات (مدير/محرر/مشاهد) | `window._PERMS = {` |
| Firebase Config | `initializeApp(` |
| اسم تاب Google Sheet | `كارته معدات` |
| إشعارات Gmail | `YOUR_EMAILJS_SERVICE` |
| أنواع المصروفات | `const EXP = [` |
| حالات المعدة | `const STATUSES = [` |
| المواقع | `const LOCS = [` |
| الوحدات | `const UNITS = [` |
| عدد السجلات بالصفحة | `const PS = 30` |
| لوحة المتابعة | `function renderD()` |
| قائمة السجلات | `function renderL()` |
| نموذج الإضافة | `function renderF(` |
| التقارير | `function renderR()` |
| إدارة المستخدمين | `function renderU()` |

## شرح كل قسم بالملف (مرتبة بالترتيب)

1. **HTML الأساسي** — شاشة الدخول وهيكل التطبيق
2. **CSS** — كل الألوان والأشكال (داخل `<style>`)
3. **قسم الصلاحيات** — `window._PERMS` يحدد من يقدر يعمل إيه
4. **قسم اللغة** — `const TR` فيه كل النصوص عربي/إنجليزي
5. **قسم Firebase** — الاتصال بقاعدة البيانات والمصادقة
6. **قسم منطق التطبيق** — البيانات والدوال (renderD, renderL, إلخ)

كل دالة في الكود فيها تعليق عربي فوقها يشرح وظيفتها بالظبط.

## كيفية التعديل ورفعه

### تعديل نص أو إضافة ميزة:
1. افتح `src/index.html` بأي محرر نصوص (Notepad++ مُفضّل)
2. اضغط Ctrl+F وابحث عن الجزء المطلوب من الجدول فوق
3. عدّل واحفظ
4. ارفع الملف على GitHub (نفس المكان القديم)
5. GitHub Actions يبني .exe جديد تلقائياً خلال 5 دقائق

### مثال: إضافة نوع مصروف جديد
ابحث عن:
```javascript
const EXP=['شراء','صيانة','صيانة دورية',...];
```
أضف اسم النوع الجديد داخل الأقواس.

### مثال: تغيير اسم تاب Google Sheet
ابحث عن `كارته معدات` (تظهر 3 مرات) وغيّرها لاسم التاب الجديد.

## Firebase Rules (مهم جداً!)
في Firebase Console → Realtime Database → Rules، يجب أن يكون:
```json
{
  "rules": {
    "records":       { ".read": "auth != null", ".write": "auth != null" },
    "users":         { ".read": "auth != null", ".write": "auth != null" },
    "notifications": { ".read": "auth != null", ".write": "auth != null" }
  }
}
```

## تفعيل إشعارات Gmail (EmailJS):
1. سجّل مجاناً على emailjs.com
2. أضف Service جديد واربطه بـ Gmail
3. أنشئ Template للإشعار
4. في الكود ابحث عن `YOUR_EMAILJS_SERVICE` وغيّر القيم الثلاث:
   - `YOUR_EMAILJS_SERVICE` → Service ID
   - `YOUR_EMAILJS_TEMPLATE` → Template ID
   - `YOUR_EMAILJS_KEY` → Public Key

## تشغيل محلي للاختبار (يحتاج Node.js):
```bash
npm install
npm start
```

## بناء .exe يدوياً (بدون GitHub):
```bash
npm install
npm run build:win
```
الملف الناتج في مجلد `dist/`
