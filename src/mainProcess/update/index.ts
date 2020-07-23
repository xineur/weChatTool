import { autoUpdater } from "electron-updater";
import electronLog from "electron-log";
const log = electronLog.create('update');
/**
 * 0 正在检查更新 1 检测到新版本，准备下载 2 未检测到新版本 3 下载中 4 下载暂停 5 下载暂停恢复 6 下载完成 7 下载失败 8 取消下载 9 检查更新失败
 * */
class Update {
  private win!: Electron.BrowserWindow;
  private msg: { [p: number]: string } = {
    0: "正在检查更新",
    1: "检测到新版本",
    2: "准备下载",
    3: "下载中",
    4: "下载暂停",
    5: "下载暂停恢复",
    6: "下载完成",
    7: "下载失败",
    8: "取消下载",
    9: "检查更新失败",
  };
  constructor (win: Electron.BrowserWindow) {
    this.win = win;
    autoUpdater.setFeedURL('http://www.ningning.cloud:3011/wechat/');
    // autoUpdater.setFeedURL('http://127.0.0.1:3002/wechat/');
    /**
     * 根据自身需求选择下方方法
     */

    this.error();
    this.start();
    this.allow();
    this.unallowed();
    this.listen();
    this.download();
    if (process.env.NODE_ENV === "production") this.load();
  }
  public load () { // 触发器
    autoUpdater.checkForUpdates()
  }
  private Message (type: number, msg?: string) {
    this.win.webContents.send('message', type, msg || this.msg[type])
    if (type === 9) {
      log.error(msg || this.msg[type])
    } else {
      log.info(msg || this.msg[type])
    }
  }
  private error () { // 当更新发生错误的时候触发。
    autoUpdater.on('error', (err) => {
      this.Message(9, err);
    })
  }
  private start () { // 当开始检查更新的时候触发
    autoUpdater.on('checking-for-update', () => {
      this.Message(0)
    })
  }
  private allow () { // 发现可更新数据时
    autoUpdater.on('update-available', () => {
      this.Message(1)
    })
  }
  private unallowed () { // 没有可更新数据时
    autoUpdater.on('update-not-available', (event, arg) => {
      this.Message(2)
    })
  }
  private listen () { // 下载监听
    autoUpdater.on('download-progress', () => {
      this.Message(3)
    })
  }
  private download () { // 下载完成
    autoUpdater.on('update-downloaded', () => {
      this.Message(6)
      setTimeout(m => {
        autoUpdater.quitAndInstall()
      }, 1000)
    })
  }
}
export default Update
