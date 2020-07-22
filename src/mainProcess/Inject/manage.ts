import Inject from "./Inject";
import { join } from "path";
import fs from "fs";
import { BrowserWindow, ipcMain } from "electron";
import { INJECT_STATUS, GLOBAL_STATUS } from "@/enum/ipc";
import { Config } from "@/interface/config";

export class MonitorInject {
  private WeChatInject!: Inject;
  private win: BrowserWindow;
  private time = 10;
  private timeout: any;
  private InDllPath: string; // 注入dll路径
  private BeInDllPath: string; // 被注入dll路径

  public constructor (win: BrowserWindow, config: Config) {
    this.win = win;
    this.InDllPath = this.joinPath("/dll/demoInject.dll");
    this.BeInDllPath = this.joinPath(`/dll/${config.dllName}`);
    console.log('this.BeInDllPath', this.BeInDllPath);

    const status = fs.existsSync(this.InDllPath);
    const dllStatus = fs.existsSync(this.BeInDllPath);
    // 判断被注入dll和注入dll是否存在
    if (!status || !dllStatus) {
      this.win.webContents.send(GLOBAL_STATUS.ERR, "未找到dll");
    }
    this.init()
  }

  /**
   * 是否需要用户同意才进行注入(未制作)
   */
  public init() {
    ipcMain.on(INJECT_STATUS.INJECT, () => {
      this.WeChatInject = new Inject(this.InDllPath);
      this.monitor()
    })
  }
  /**
   * 启动一个监视器,监控dll的注入情况
   */
  public monitor () {
    const status = this.execute();
    if (status !== 0) {
      this.win.webContents.send(INJECT_STATUS.ERR, this.WeChatInject.StatusCode(status));
      this.timeout = setTimeout(() => {
        this.monitor();
      }, this.time * 1000)
    } else {
      clearTimeout(this.timeout);
      this.win.webContents.send(INJECT_STATUS.SUCCESS, this.WeChatInject.StatusCode(status))
    }
  }
  /**
   * 注入dll
   */
  private execute (): number {
    return this.WeChatInject.Inject(this.BeInDllPath, "WeChat.exe")
  }

  /**
   * 获取静态文件地址
   * @param path
   */
  private joinPath(path: string): string {
    return join(global.__static, path)
  }
}
