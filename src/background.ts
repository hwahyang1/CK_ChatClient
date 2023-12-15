'use strict';

import { app, protocol, BrowserWindow, ipcMain } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import * as net from 'net';

import { stringToByteArray, byteArrayToString } from './store/byteManager';

const isDevelopment = process.env.NODE_ENV !== 'production';

let mainWindow: BrowserWindow | null;
let client: net.Socket | null;

protocol.registerSchemesAsPrivileged([
	{ scheme: 'app', privileges: { secure: true, standard: true } },
]);

async function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1300,
		height: 850,
		webPreferences: {
			nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION as unknown as boolean,
			contextIsolation: !(process.env.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
		},
	});

	// 테스트 환경에서는 static html 파일을 사용하지 않습니다. (vue.js의 빌드 생략)
	if (process.env.WEBPACK_DEV_SERVER_URL) {
		await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
		if (!process.env.IS_TEST) mainWindow.webContents.openDevTools();
	} else {
		createProtocol('app');
		mainWindow.loadURL('app://./index.html');
		mainWindow.setMenu(null);
	}
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('ready', async () => {
	createWindow();
});

let ROOM_NUMBER: string;
let NICKNAME: string;

ipcMain.on('socket-connect', (event, message) => {
	const data = message.split(':');

	client = new net.Socket();

	client.on('connect', () => {
		NICKNAME = data[2];
		ROOM_NUMBER = data[3];
		client.write(stringToByteArray('/nick', NICKNAME, ''));
		client.write(stringToByteArray('/join', ROOM_NUMBER, ''));
		mainWindow?.webContents.send('socket-connected');
	});

	client.on('data', (data: Buffer) => {
		const message = byteArrayToString(data);

		mainWindow?.webContents.send('socket-message', message);
	});

	client.on('close', () => {
		mainWindow?.webContents.send('socket-disconnected');
	});

	client.on('error', (err) => {
		mainWindow?.webContents.send('socket-error', err.message);
	});

	try {
		client.connect(parseInt(data[1]), data[0]);
	} catch (err) {
		mainWindow?.webContents.send('socket-error', err);
	}
});

ipcMain.on('send-message', (event, message) => {
	if (client && client.writable) {
		client.write(stringToByteArray(ROOM_NUMBER, NICKNAME, message));
	}
});

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
