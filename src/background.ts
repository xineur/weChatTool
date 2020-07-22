import { app, BrowserWindow } from "electron";
import {
  createProtocol,
  /* installVueDevtools */
} from "vue-cli-plugin-electron-builder/lib";
import { Ipc, MonitorInject } from "@/mainProcess";
import { join } from "path";
import Yaml from "@/config/yaml";
import { Config } from "@/interface/config";
import { BrowserOption } from "@/mainProcess/BrowserWindow";
import Trays from "@/mainProcess/tray";
import Update from "@/mainProcess/update";

const isDevelopment = process.env.NODE_ENV !== 'production';
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null;
let configs: Config;

// Scheme must be registered before the app is ready
// (protocol as any).registerSchemesAsPrivileged([{scheme: 'app', privileges: {secure: true, standard: true}}]);
global.__static = join(app.getPath("exe"), isDevelopment ? "../../../../static": "../resources/static");


function createWindow(config?: Config) {
  if (config) {
    configs = config
  }
  // Create the browser window.
  win = new BrowserWindow(BrowserOption());

  new MonitorInject(win, configs);
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }

  win.on('closed', () => {
    win = null
  });
  new Ipc(win, configs);
  // 托盘
  new Trays(win);
  // 升级
  new Update(win);
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
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }

  }
  const yaml = new Yaml();
  yaml.readConfig().then((config: Config) => {
    createWindow(config);
  })
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    })
  }
}

// start only one process
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    if (win) {
      if (win.isMinimized()) {
        win.restore()
      }
      win.focus();
      win.show()
    }
  })
}
