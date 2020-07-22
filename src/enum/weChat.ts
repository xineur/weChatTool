export enum STATUS_CODE {
  HEART_BEAT = 5005, // 检测心跳
  RECV_TXT_MSG = 1, // 接受到好友消息文字
  RECV_PIC_MSG = 3, // 接受到好友消息图片
  USER_LIST = 5000, // 发送获取好友列表
  GET_USER_LIST_SUCCESS = 5001, // 获取到好友列表
  GET_USER_LIST_FAIL = 5002,
  TXT_MSG = 555, // 发送文本消息
  PIC_MSG = 500, // 发送图片消息
  AT_MSG = 550, // 发送@消息
  CHAT_ROOM_MEMBER = 5010, // 获取群好友列表及回调
  CHAT_ROOM_MEMBER_NICK = 5020, // 获取群成员 nickname 用于@群成员
  PERSONAL_INFO = 6500, // 获取微信个人信息及回调
  DEBUG_SWITCH = 6000, // debug模式
  PERSONAL_DETAIL = 6550, // 获取好友详细信息
  DESTROY_ALL = 9999
}

// 唤起机器人状态
export enum WAKE_UP {
  OFF = 0,
  MANUALLY = 1,
  ON = 2
}

// 唤起机器人状态
export enum USER_TYPE {
  USER = 'user', // 好友
  CHAT_ROOM = 'chatRoom', // 群
  GH = 'gh', // 公众号
  NEWS = 'news', // 文件传输助手
  UNKNOWN = 'unknown', // 其他不明身份的用户 部分好友的wxid不已wxid_开头 捕捉异常
}

// 发送的文件类型
export enum SEND_FILE_TYPE {
  FILE = 'file',
  IMG = 'image'
}
