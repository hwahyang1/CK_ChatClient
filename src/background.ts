'use strict';

import { app, protocol, BrowserWindow, ipcMain } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
//import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer';
import * as net from 'net';

const isDevelopment = process.env.NODE_ENV !== 'production';

let mainWindow: BrowserWindow | null;
let client: net.Socket | null;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
	{ scheme: 'app', privileges: { secure: true, standard: true } },
]);

async function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 1300,
		height: 850,
		webPreferences: {
			// Use pluginOptions.nodeIntegration, leave this alone
			// See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
			nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION as unknown as boolean,
			contextIsolation: !(process.env.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
		},
	});

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// Load the url of the dev server if in development mode
		await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
		if (!process.env.IS_TEST) mainWindow.webContents.openDevTools();
	} else {
		createProtocol('app');
		// Load the index.html when not in development
		mainWindow.loadURL('app://./index.html');
		mainWindow.setMenu(null);
	}
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
	/*if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }*/
	client = new net.Socket();

	client.on('connect', () => {
		mainWindow?.webContents.send('socket-connected');
	});

	client.on('data', (data) => {
		const message = data.toString();
		console.log('Received message from server:', message);

		// 렌더러 프로세스로 메시지 전송
		mainWindow?.webContents.send('socket-message', message);
	});

	// 소켓 서버에 연결
	client.connect(3000, '127.0.0.1');

	createWindow();
});

ipcMain.on('send-message', (event, message) => {
	// 렌더러 프로세스에서 메시지 수신 후 소켓으로 전송
	if (client && client.writable) {
		client.write(message);
	}
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
	if (process.platform === 'win32') {
		process.on('message', (data) => {
			if (data === 'graceful-exit') {
				app.quit();
			}
		});
	} else {
		process.on('SIGTERM', () => {
			app.quit();
		});
	}
}
