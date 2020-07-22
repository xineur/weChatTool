import { Tray, Rectangle, Menu, MenuItemConstructorOptions } from "electron";
import { join } from "path";
import { GLOBAL_STATUS } from "@/enum/ipc"

let tray: Tray;

export default class Trays{
  private win: Electron.BrowserWindow;
  private menuList: MenuItemConstructorOptions[] = [
    {
      label: "退出",
      role: "quit"
    }
  ];
  constructor (win: Electron.BrowserWindow) {
    this.win = win;
    this.init();
    this.bind();
  }
  private init () {
    tray = new Tray(join((global as any).__static, "/icon/icon.ico"));
    const contextMenu = Menu.buildFromTemplate(this.menuList);
    tray.setToolTip('微信助手');
    tray.setContextMenu(contextMenu);
  }

  /**
   * 绑定基础事件
   */
  private bind () {
    // 双击弹起
    tray.on("double-click", () => {
      this.win.show();
      this.win.focus();
    });
    tray.on("right-click", (event: any, bounds: Rectangle) => {
      this.win.webContents.send(GLOBAL_STATUS.RIGHT_CLICK, bounds)
    });
  }
}
