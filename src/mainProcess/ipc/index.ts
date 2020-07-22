import { ipcMain, dialog, OpenDialogOptions } from 'electron';
import { GLOBAL_STATUS } from '@/enum/ipc';
import { Config } from '@/interface/config'

export class Ipc {
  private readonly config: Config;
  private readonly win: Electron.BrowserWindow;
  constructor(win: Electron.BrowserWindow, config: Config) {
    this.config = config;
    this.win = win;
    this.init();
  }
  init() {
    // 获取配置信息
    ipcMain.on(GLOBAL_STATUS.SEND_CONFIG, (event: Electron.IpcMessageEvent) => {
      event.sender.send(GLOBAL_STATUS.GET_CONFIG, this.config)
    });
    // 页面加载完成 触发主进程显示事件
    ipcMain.on(GLOBAL_STATUS.RENDER_SUCCESS, () => {
      this.win.show();
    });
    // console
    ipcMain.on(GLOBAL_STATUS.CONSOLE, () => {
      this.win.webContents.openDevTools();
    });
    // 最小化
    ipcMain.on(GLOBAL_STATUS.MINIMIZE, () => {
      this.win.minimize();
    });
    // 关闭
    ipcMain.on(GLOBAL_STATUS.CLOSE, () => {
      this.win.hide();
    });
    ipcMain.on(GLOBAL_STATUS.OPEN_FILE, (event: Electron.IpcMessageEvent, option: OpenDialogOptions, type: string, msgType: string) => {
      const data = dialog.showOpenDialog(Object.assign({
        title: "请选择要上传的文件",
        buttonLabel: "选择",
        properties: ["showHiddenFiles"]
      }, option));
      if (data) {
        this.win.webContents.send(GLOBAL_STATUS.SET_FILE_PATH, data, type, msgType)
      }
    })
  }
}
