process.env.DIST = join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : join(process.env.DIST, '../public')

import {join} from 'path'
import {app, BrowserWindow} from 'electron'


let win = null;

const preload = join(__dirname, './preload.js')
const { ipcMain } = require('electron');
const path = require('path');
const url = process.env['VITE_DEV_SERVER_URL']


const Datastore = require('nedb');
let userData = app.getAppPath('userData');
let databaseTest = path.join(userData, 'database/data.db')
let db = new Datastore({
    filename: databaseTest,
    autoload: true,
    onload: err => {
        if (err) {
            console.log("Error loading the DB: " + err);
        }
        console.log('Database loaded successfully')
    },
    timestampData: true
})

ipcMain.handle('get-all-values', async () => {
    // Utilisez une promesse pour effectuer la recherche
    const docs = await new Promise((resolve, reject) => {
        db.find({}, function (err, docs) {
            if (err) reject(err);
            else resolve(docs);
        });
    });

    return docs;
});

ipcMain.handle('insert-value', async (event, arg) => {
    // Utilisez une promesse pour effectuer la recherche
    const doc = await new Promise((resolve, reject) => {
        db.insert(arg, function (err, doc) {
            if (err) reject(err);
            else resolve(doc);
        });
    });

    return doc;
});

ipcMain.handle('get-one-value', async (event, arg) => {
    // Utilisez une promesse pour effectuer la recherche
    const doc = await new Promise((resolve, reject) => {
        db.findOne({_id: arg}, function (err, doc) {
            if (err) reject(err);
            else resolve(doc);
        });
    });

    return doc;
});

ipcMain.handle('remove-value', async (event, arg) => {
    // Utilisez une promesse pour effectuer la recherche
    const doc = await new Promise((resolve, reject) => {
        db.remove({_id: arg}, function (err, doc) {
            if (err) reject(err);
            else resolve(doc);
        });
    });

    return doc;
});

function createWindow() {
    win = new BrowserWindow({
        title: 'Main window',
        icon: join(process.env.PUBLIC, 'logo.svg'),
        webPreferences: {
            preload,
            nodeIntegration: true, // to use require() function
            contextIsolation: false,
            enableRemoteModule: true  // to use remote
        },
    })

    if (url) {
        win.loadURL(url)
        // Open devTool if the app is not packaged
        win.webContents.openDevTools()
    } else {
        // win.loadFile('dist/index.html')
        win.loadFile(join(process.env.DIST, 'index.html'))
    }

    // Test active push message to Renderer-process.
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', (new Date).toLocaleString())
    })

    // Make all links open with the browser, not with the application
    win.webContents.setWindowOpenHandler(({url}) => {
        if (url.startsWith('https:')) shell.openExternal(url)
        return {action: 'deny'}
    })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    win = null
    if (process.platform !== 'darwin') app.quit()
})

// Focus on the main window if the user tried to open another
app.on('second-instance', () => {
    if (win) {
        if (win.isMinimized()) win.restore()
        win.focus()
    }
})

