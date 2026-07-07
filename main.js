/*
=============================================================================
  main.js – نقطة دخول Electron
=============================================================================
  هذا الملف هو المتحكم الرئيسي لتطبيق Electron على سطح المكتب
  Electron = إطار عمل يحول صفحات الويب لتطبيقات سطح مكتب حقيقية

  ما يفعله:
  1. ينشئ نافذة تطبيق Windows
  2. يفتح ملف src/index.html داخل النافذة
  3. يخفي شريط القوائم الافتراضي
  4. يدير دورة حياة التطبيق (فتح/إغلاق)

  لتغيير حجم النافذة: غيّر width و height
  لتغيير عنوان النافذة: غيّر title
=============================================================================
*/
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

// دالة إنشاء نافذة التطبيق الرئيسية
function createWindow() {
  const win = new BrowserWindow({
    width: 1280,          // عرض النافذة بالبكسل
    height: 820,          // ارتفاع النافذة بالبكسل
    minWidth: 400,        // أقل عرض مسموح
    minHeight: 600,       // أقل ارتفاع مسموح
    title: 'ELAMAR – Equipment Management', // عنوان شريط العنوان
    icon: path.join(__dirname, 'src', 'icon.png'), // أيقونة التطبيق
    webPreferences: {
      nodeIntegration: false,    // تعطيل Node.js في الصفحة (أمان)
      contextIsolation: true,    // عزل السياق (أمان)
      webSecurity: false,        // السماح بطلبات Firebase من الملف المحلي
    },
    backgroundColor: '#0f172a', // لون خلفية النافذة قبل التحميل
    autoHideMenuBar: true,       // إخفاء شريط القوائم تلقائياً
  });

  Menu.setApplicationMenu(null); // إزالة قائمة التطبيق الافتراضية
  win.loadFile(path.join(__dirname, 'src', 'index.html')); // تحميل التطبيق
}

// عند جهوزية Electron: أنشئ النافذة
app.whenReady().then(() => {
  createWindow();
  // على macOS: أعد فتح النافذة إذا ضغط على أيقونة Dock
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// عند إغلاق كل النوافذ: أغلق التطبيق (إلا على macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
