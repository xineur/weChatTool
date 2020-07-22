import { get, url } from "@/render/utils/require";
import { SendAttachParams, GetMemberNickParams, Destroy, PicMsg } from "@/interface/api";

const urls: {[p: string]: string} = {
  sendAttach: `${url}/api/sendattatch`, // 发送附件
  getMemberNick: `${url}/api/getmembernick`, // 获取群成员昵称
  destroy: `${url}/api/destroy`, // 获取群成员昵称
  sendTextMsg: `${url}/api/sendtxtmsg`, // 发送文字消息
  sendPic: `${url}/api/sendpic`, // 发送图片
  sendAtMsg: `${url}/api/sendatmsg`, // 发送文件
};

export default {
  sendAttach (params: SendAttachParams) {
    return get(urls.sendAttach, params)
  },
  getMemberNick (params: GetMemberNickParams) { // SendAttach
    return get(urls.getMemberNick, params)
  },
  destroy (params: Destroy) { // SendAttach
    return get(urls.destroy, params)
  },
  sendTextMsg (params: Destroy) { // SendAttach
    return get(urls.sendTextMsg, params)
  },
  sendPic (params: PicMsg) { // SendAttach
    return get(urls.sendPic, params)
  },
  sendAtMsg (params: Destroy) { // SendAttach
    return get(urls.sendAtMsg, params)
  }
}
