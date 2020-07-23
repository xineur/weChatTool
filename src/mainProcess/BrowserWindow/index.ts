// import { screen } from 'electron'

export function BrowserOption() {
  // const BScreen = screen.getPrimaryDisplay().workAreaSize;
  const width = process.env.NODE_ENV !== 'production' ? 1200 : 850;
  const height = 700;
  // const x = BScreen.width - width;
  // const y = (BScreen.height - height) / 2;

  return {
    width,
    height,
    center: true,
    resizable: false, // 窗口是否可调整大小
    show: false,
    paintWhenInitiallyHidden: false, //  当show为false并且渲染器刚刚被创建时，它是否应激活。 为了让document.visibilityState 在show: false的情况下第一次加载时正确地工作，你应该把这个设置成false. 设置为 false 将会导致ready-to-show 事件不触发。 默认值为 true。
    frame: false,
    autoHideMenuBar: true,
    opacity: 1,
    transparent: true,
    backgroundColor: '#00ffff00',
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      webSecurity: false
    },
  };

}
