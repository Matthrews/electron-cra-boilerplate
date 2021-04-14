import {app, BrowserWindow} from 'electron';

const path = require('path');
const isDev = require('electron-is-dev');
// 取消警告  Electron Security Warning (Insecure Resources)
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let mainWindow: BrowserWindow | null = null;

async function createWindow  () {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        webPreferences: {
            webSecurity: true
        }});
    await mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    if (isDev) {
        // Open the DevTools.
        //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
        mainWindow.webContents.openDevTools();
    }
    mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow().then(r => r);
    }
});
