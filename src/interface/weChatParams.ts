import { user_type, msg_type } from "@/type/weChat";

export interface UserInfoParamsContent {
  nick: string; // 微信名
  headimg959: string; // 大图头像
  city?: string; // 所在城市
  country?: string; // 所在国家
  headimg132?: string; // 小图头像
  mail?: string; // 邮箱
  mobile?: string; // 手机号
  province?: string; //
  wx_code?: string; // 微信号
  wxid?: string; // 微信id
}

// 个人信息参数
export interface UserInfoParams {
  content: UserInfoParamsContent;
  count?: number; // 触发器
  id: string;
  sender: string; // 发送方
  srvid: number;
  status: string; // 状态
  time: string;
  type: number;
  wxid: string;
}
// 好友基本数据
export interface FriendInfoParamsContent {
  name: string; // 好友/群名
  wxid: string; // 微信id
  type?: string; // 好友类型 user 好友 chatRoom 群 gh 公众号 news 文件传输助手
  state?: number;
}
// 好友详细数据
export interface FriendDetInfo {
  big_headimg: string; // 大头像
  city: string; // 城市
  cover: string; // 朋友圈图片
  little_headimg: string;
  name1: string; // 备注
  name2: string;
  nation: string;
  provice: string;
  signature: string; // 个签
  v1: string;
  wxcode: string; // 微信号
}
// 好友类型分类
export interface FriendType {
  user: FriendInfoParamsContent[],
  gh: FriendInfoParamsContent[],
  chatRoom: FriendInfoParamsContent[],
  news: FriendInfoParamsContent[]
}
// 选中好友列表
export interface CheckActive {
  user?: number[],
  gh?: number[],
  chatRoom?: number[],
  news?: number[]
}

// 好友列表数据
export interface FriendInfoParams {
  content: FriendInfoParamsContent[];
  count?: number; // 触发器
  type: number;
}

// 发送消息参数
export interface SendFormat {
  id?: string;
  type?: number;
  wxid?: string;
  content?: string;
  filepath?: string;
  roomid?: string;
  nickname?: string;
}

// 接受到好友/群消息
export interface TextMsg {
  content: string;
  id: string;
  receiver: string; // self 为个人数据
  sender: string; // 发送方
  srvid: number;
  time: string;
  type: number;
  at?: string;
  count?: number;
  wxid?: string;
}

// 发送全量消息
export interface SendAllParams {
  wxid: string;
  content: string;
  userType?: user_type;
  msgType?: msg_type;
  At?: string;
}
