const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

app.disableHardwareAcceleration();

function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    frame: true,  // Сохраняем стандартные элементы управления окном
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');

  // Удаляем стандартное меню приложения
  Menu.setApplicationMenu(null);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
