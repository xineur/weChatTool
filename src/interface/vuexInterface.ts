import { FriendDetInfo, FriendType, CheckActive } from "./weChatParams";
export interface WXData {
  name: string;
  wxid: string;
}

export interface UserInfo {
  city: string;
  country: string;
  headimg132: string;
  headimg959: string;
  mail: string;
  mobile: string;
  nick: string;
  province: string;
  wx_code: string;
  wxid: string;
}

// 微信参数
export interface WeChatParam {
  content?: UserInfo | WXData[] | FriendDetInfo | string;
  id?: string;
  sender?: string;
  receiver?: string;
  srvid?: number;
  status?: string; // SUCCESS ERROR
  time?: string;
  type?: number;
  wxid?: string;
  count?: number;
}

export interface WeChatState {
  status: number;
  WeChatParams: WeChatParam;
  barParams: BarParams;
}

// 提示框参数
export interface BarParams {
  count?: number;
  text: string
}

/* ----------------------------------------- */
/*                modules                    */
/* ----------------------------------------- */
// main.ts
export interface Navigation {
  expandOnHover: boolean;
  miniVariant: boolean;
  right: boolean;
  permanent: boolean;
  dark: boolean;
  value: boolean;
}
// userList.ts
export interface UserListState {
  checkActive: CheckActive;
  friendInfo: FriendType;
}
