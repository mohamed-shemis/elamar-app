const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
function createWindow() {
  const win = new BrowserWindow({
    width: 1280, height: 820, minWidth: 400, minHeight: 600,
    title: 'ELAMAR – Equipment Management',
    icon: path.join(__dirname, 'src', 'icon.png'),
    webPreferences: { nodeIntegration: false, contextIsolation: true, webSecurity: false },
    backgroundColor: '#0f172a', autoHideMenuBar: true,
  });
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, 'src', 'index.html'));
}
app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
