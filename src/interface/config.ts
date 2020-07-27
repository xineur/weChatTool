import { msg_type, reply_type } from "@/type/weChat";

export interface Config {
  name: string[];
  dllName: string;
  turingApiKey: string;
  replyType: reply_type, // gh truing
  baseUrl: string;
  open: string[];
  close: string[];
  custom: {
    text: string;
    type: msg_type;
    content: string;
    exact: boolean;
    chart: boolean
  }[];
  userOpen: number;
}
