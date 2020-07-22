// 注入状态
export enum INJECT_STATUS {
  INJECT = "inject", // 注入
  ERR = "injectError", // 注入失败
  SUCCESS = "injectSuccess", // 注入成功
}

// ipc通信全局状态
export enum GLOBAL_STATUS {
  ERR = "error",
  SUCCESS = "success",
  GET_CONFIG = "getConfig", // 获取配置 渲染进程
  SEND_CONFIG = "sendConfig", // 发送配置 主进程
  RENDER_SUCCESS = "renderSuccess", // 渲染进程加载完毕 渲染进程
  CONSOLE = "console", // 控制台
  MINIMIZE = "minimize", // 最小化
  CLOSE = "close", // 隐藏应用
  RIGHT_CLICK = "rightClick", // 右键菜单
  OPEN_FILE = "openFile", // 打开文件选择器
  SET_FILE_PATH = "setFilePath", // 打开文件选择器
}
