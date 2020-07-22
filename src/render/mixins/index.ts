import { Component, Vue } from "vue-property-decorator";
import { Mutation } from "vuex-class";
import { WeChat as WeChatInject } from "@/render/components/Socket/WeChat";
import { GetMemberNickData } from "@/interface/api";
import { ipcRenderer } from "electron";
import { INJECT_STATUS } from "@/enum/ipc";
import { SendAllParams } from "@/interface/weChatParams";
import { BarParams } from "@/interface/vuexInterface";

@Component({})
export class WeChat extends Vue{
  private WeChatSocket!: WeChatInject;
  @Mutation("setBarParams")
  private setBarParams!: (data: BarParams) => void;
  /* 生命周期钩子 */
  public created (): void {
    this.WeChatSocket = new WeChatInject();
    this.ipcListen();
  }
  /* 生命周期钩子end */

  /**
   * 打开socket服务
   */
  public open (): void {
    this.WeChatSocket.open()
  }

  /**
   * 关闭socket服务
   */
  public close (): void {
    this.WeChatSocket.close()
  }

  /**
   * 获取好友列表
   */
  public getFriend (): void {
    this.WeChatSocket.getFriend()
  }
  public sendAll (data: SendAllParams) {
    return this.WeChatSocket.sendAll(data).then((res: any) => {
      return Promise.resolve(res)
    }).catch((err: string) => {
      this.setBarParams({
        text: err
      })
    })
  }
  /**
   * 向你的好友发送微信文本消息
   * @param wxid 微信id
   * @param content 文本信息
   */
  public sendTextMsg (wxid: string, content: string): void {
    this.WeChatSocket.sendTextMsg(wxid, content)
  }
  /**
   * 向你的好友发送文件
   * @param wxid 微信id
   * @param content 文件地址
   */
  public sendAttach (wxid: string, content: string): void {
    this.WeChatSocket.sendAttach(wxid, content)
  }
  /**
   * 向你的好友发送图片
   * @param wxid 微信id
   * @param content 图片地址
   */
  public sendPicMsg (wxid: string, content: string): void {
    this.WeChatSocket.sendPicMsg(wxid, content)
  }
  /**
   * 获取微信个人信息
   */
  public getUserInfo (): void {
    this.WeChatSocket.getUserInfo()
  }
  /**
   * 获取群好友列表
   */
  public getChatRoom (roomid: string): Promise<GetMemberNickData> {
    return this.WeChatSocket.getChatRoom(roomid)
  }
  /**
   * 发送群AT消息
   * @param roomid 微信群id
   * @param AT 被@人 微信昵称
   * @param content 文本信息
   */
  public sendAtMsg (roomid: string, AT: string, content: string): void {
    this.WeChatSocket.sendAtMsg(roomid, AT, content)
  }
  /**
   * 获取群成员 nickname 用于@群成员
   * @param content 群id
   */
  public getChatNick (content: string): void {
    this.WeChatSocket.getChatNick(content)
  }
  /**
   * 获取好友详细信息
   * @param content 好友id
   */
  public getFriendInfo (content: string): void {
    this.WeChatSocket.getFriendInfo(content)
  }
  /**
   *
   */
  public destroy (): void {
    this.WeChatSocket.destroy()
  }

  /**
   * 监听ipc
   */
  public ipcListen (): void {
    // 注入成功 重新打开socket
    ipcRenderer.on(INJECT_STATUS.SUCCESS, () => {
      this.open();
    });
  }

  /**
   * 设置好友的自动回复状态
   * @param data
   * @constructor
   */
  public SetOpenState (data: {[p: string]: number}): void {
    this.WeChatSocket.SetOpenState(data)
  }

  /**
   * 好友列表
   * @constructor
   */
  get FriendInfo() {
    return this.WeChatSocket.FriendInfo
  }

  /**
   * 用户信息
   * @constructor
   */
  get UserInfo() {
    return this.WeChatSocket.UserInfo
  }

  /**
   * 获取好友的自动回复状态
   * @constructor
   */
  get OpenState() {
    return this.WeChatSocket.OpenState
  }
}


// export default {
//   data () {
//     return {
//       WeChatSocket: ''
//     }
//   },
//   created () {
//     (this as any).$data.WeChatSocket = new WeChat()
//   },
//   methods: {
//     getUser () {
//       console.log(this);
//       (this as any).$data.WeChatSocket.getUser()
//     }
//   }
// }
