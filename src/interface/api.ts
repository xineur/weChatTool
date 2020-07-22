import { AxiosResponse } from "axios"
export interface TuringParams {
  reqType: number; // 输入类型:0-文本(默认)、1-图片、2-音频
  perception: {
    inputText?: { // 文本信息
      text: string;
    };
    inputImage?: { // 图片信息
      url: string;
    };
    inputMedia?: { // 音频信息
      url: string;
    };
    selfInfo?: { // 客户端属性
      location: { // 地理位置信息
        city: string;
        province?: string;
        street?: string;
      };
    };
  };
  userInfo: { // 用户参数
    apiKey: string; // 机器人标识
    userId: string; // 用户唯一标识
    groupId?: string; // 群聊唯一标识
    userIdName?: string; // 群内用户昵称
  };
}

// 图灵机器人返回参数
export interface TuringResponse extends AxiosResponse {
  data: {
    emotion: {robotEmotion: any; userEmotion: any}[];
    intent: {
      actionName: string;
      code: number;
      intentName: string;
    };
    results: Array<{
      groupType: number;
      resultType: string;
      values: {
        text: string;
      };
    }>;
  };
}

// 发送附件
export interface SendAttachParams {
  id: string;
  wxid: string;
  filepath: string;
  type?: number;
}

// 获取群成员昵称
export interface GetMemberNickParams {
  id: string;
  type: number;
  roomid: string;
}

export interface Destroy {
  id: string;
  wxid: string;
  content: string;
  type?: number
  roomid?: string;
  nick?: string;
}

// 发送图片
export interface PicMsg{
  id: string;
  wxid: string;
  path: string;
  type: number
}

// 发送@消息
export interface AtMsg {
  id: string;
  wxid: string;
  content: string;
  type?: number
}

// 获取群好友昵称数据
export interface GetMemberNickData {
  content: {
    nickname: string; // 昵称
    roomid: string; // 房间号
    wxid: string; // 微信id
  }[];
  id: string;
  sender: number;
  status: string;
  time: string;
  type: number;
  wxid: string;
}

export interface AxiosRes<T> extends AxiosResponse{
  data: T;
}
