const { app, BrowserWindow } = require('electron')
const path = require('path')
const { is } = require('electron-util');

let mainWindow;
let tray;

function createWindow () {
 mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  })

  let isDev = is.development;

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
