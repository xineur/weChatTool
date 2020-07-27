export default {
  name: ["小熊"], // 机器人名称 群交流格式为 `@机器人昵称 要说的话`||`机器人名称 要说的话`为空时且不@群消息不做回复,好友交流格式为`要说的话`
  turingApiKey: "",  // 图灵api
  replyType: "gh", // gh truing
  baseUrl: "",
  dllName: "version2.9.0.123-4.5.7.69.dll", // 被注入的dll版本
  open: ["呼叫小熊"], // 唤起机器人快捷语 为空时默认关闭
  close: [], // 关闭机器人快捷语 为空时不可关闭机器人
  custom: [ // 当回复快捷语发送文件(需先开启机器人)
    {
      text: "文件",
      type: "file",
      content: "",
      exact: false,
      chart: false
    },
    {
      text: "图片",
      type: "img",
      content: "",
      exact: false,
      chart: false
    },
    {
      text: "图片文件",
      type: "file",
      content: "",
      exact: true,
      chart: false
    },
    {
      text: "你是",
      type: "text",
      content: "我",
      exact: true,
      chart: true
    }
  ],
  userOpen: 2, // 好友聊天是否使用机器人(仅限好友) 0 不使用 1 使用快捷语唤起 2 静默唤起
}
