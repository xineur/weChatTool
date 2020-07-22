/*
  ~/index.ts中同步
 */
import store from '~/store';
import { STATUS_CODE, USER_TYPE, WAKE_UP, SEND_FILE_TYPE } from '@/enum/weChat';
import { GLOBAL_STATUS } from '@/enum/ipc';
import { UserInfoParams, SendFormat, FriendInfoParams, UserInfoParamsContent, FriendType, SendAllParams } from '@/interface/weChatParams';
import { ipcRenderer } from 'electron';
import api from '@/render/api/weChat';
import turingApi from '@/render/api/turing';
import {
  SendAttachParams,
  GetMemberNickData,
  Destroy,
  TuringParams,
  TuringResponse,
  AxiosRes,
  PicMsg
} from "@/interface/api";
import { Config } from '@/interface/config';
import { TextMsg } from '@/interface/weChatParams';
import { setUserId } from '@/render/plugins/common';

export class WeChat {
  private socket!: WebSocket;
  private config: Config = {
    name: [],
    dllName: "",
    turingApiKey: "",
    replyType: "",
    baseUrl: "",
    open: [],
    close: [],
    custom: [],
    userOpen: 0,
  }; // 配置信息
  private api = api;
  private turingApi = turingApi;
  private userInfo!: UserInfoParamsContent; // 个人用户信息
  private friendInfo: FriendType = {
    user: [],
    gh: [],
    chatRoom: [],
    news: []
  }; // 好友列表
  private openState: {[p: string]: number} = {}; // 开启自动回复的群列表
  private timeout: any;
  private timeFlag = true;
  private ghData: TextMsg[] = [];
  private ghCode = "gh_10a9a9fa9be5";
  constructor () {
    this.init()
  }

  /**
   * 打开socket
   */
  public open () {
    this.socket = new WebSocket('ws://127.0.0.1:5555');
    this.timeFlag = true;
    clearTimeout(this.timeout);
    this.listenStatus();
  }

  /**
   * 关闭socket
   */
  public close () {
    this.timeFlag = false;
    this.socket.close();
  }

  /**
   * 初始化
   */
  private init () {
    ipcRenderer.on(GLOBAL_STATUS.GET_CONFIG, (event: Electron.IpcMessageEvent, data: Config) => {
      this.config = data;
    })
  }

  /**
   * 发送消息封装
   * @param data
   */
  public send <T>(data: T) {
    console.log(JSON.stringify(data));
    this.socket.send(JSON.stringify(data));
  }

  /**
   * 获取id
   */
  private getId(): string {
    return Date.now().toString();
  }
  // 注销 无效
  public destroy() {
    const data: Destroy = {
      id: this.getId(),
      content: 'null',
      wxid: 'null'
    };
    this.api.destroy(data).then((res: AxiosRes<Destroy>) => {
      console.log(res)
    })
  }

  /**
   * 获取好友列表
   */
  public getFriend () {
    const data: SendFormat = {
      id: this.getId(),
      type: STATUS_CODE.USER_LIST,
      content: 'user list',
      wxid: 'ROOT'
    };
    this.send(data)
  }

  /**
   * 发送全量数据
   * @param data
   */
  public sendAll (data: SendAllParams): any {
    if (data.content === "") {
      return Promise.reject("内容不可为空")
    }
    // 发送群@消息
    if (data.userType === "chatRoom" && data.At) {
      return this.sendAtMsg(data.wxid, data.At, data.content);
    }
    console.log(data.wxid, data.content)
    switch (data.msgType) {
      case "file": // 发送文件消息
        return this.sendAttach(data.wxid, data.content);
      case "img": // 发送图片消息
        return this.sendPicMsg(data.wxid, data.content);
      default: // 发送文字消息
        return this.sendTextMsg(data.wxid, data.content);
    }
  }
  /**
   * 向你的好友发送微信文本消息
   * @param wxid 微信id
   * @param content 文本信息
   */
  public sendTextMsg (wxid: string, content: string) {
    const data: Destroy = {
      id: this.getId(),
      type: STATUS_CODE.TXT_MSG,
      content,
      wxid
    };
    if (/https?:/.test(content)) return Promise.reject("禁止分享链接");
    return this.api.sendTextMsg(data)
  }
  /**
   * 向你的好友发送文件
   * @param wxid 微信id
   * @param filepath
   */
  public sendAttach (wxid: string, filepath: string) {
    const data: SendAttachParams = {
      id: this.getId(),
      filepath,
      wxid
    };
    return this.api.sendAttach(data);
  }

  /**
   * 向你的好友发送图片
   * @param wxid 微信id
   * @param path 图片地址
   */
  public sendPicMsg (wxid: string, path: string) {
    const data: PicMsg = {
      id: this.getId(),
      type: STATUS_CODE.PIC_MSG,
      path,
      wxid
    };
    return this.api.sendPic(data);
  }

  /**
   * 获取微信个人信息
   */
  public getUserInfo () {
    const data: SendFormat = {
      id: this.getId(),
      type: STATUS_CODE.PERSONAL_INFO,
      content: 'op:personal info',
      wxid: 'ROOT'
    };
    this.send(data)
  }

  /**
   * 获取群好友列表
   */
  public getChatRoom (roomid: string): Promise<GetMemberNickData> {
    const data: any = {
      id: this.getId(),
      type: STATUS_CODE.CHAT_ROOM_MEMBER_NICK,
      roomid
    };
    return this.api.getMemberNick(data).then((res: AxiosRes<GetMemberNickData>) => {
      console.log(res.data)
      return Promise.resolve(res.data)
    }).catch((err: Error) => {
      return Promise.reject(err)
    })
    // const data: SendFormat = {
    //   id: this.getId(),
    //   type: STATUS_CODE.CHAT_ROOM_MEMBER,
    //   content: 'op:list member',
    //   wxid: 'null'
    // };
    // this.send(data)
  }
  /**
   * 获取好友详细信息
   * @param wxid 好友id
   */
  public getFriendInfo (wxid: string): void {
    const data: SendFormat = {
      id: this.getId(),
      type: STATUS_CODE.PERSONAL_DETAIL,
      content: 'op:personal detail',
      wxid
    };
    this.send(data)
  }

  /**
   * 发送群AT消息
   * @param roomid 微信群id
   * @param AT 被@人 微信昵称
   * @param content 文本信息
   */
  public sendAtMsg (roomid: string, AT: string,  content: string): void {
    const data: SendFormat = {
      id: this.getId(),
      type: STATUS_CODE.AT_MSG,
      content,
      wxid: "wxid",
      roomid,
      nickname: AT
    };
    if (!/https?:/.test(content)) {
      this.send(data)
    }
  }
  /**
   * 获取群成员 nickname 用于@群成员
   * @param content 群id
   */
  public getChatNick (content: string): void {
    const data: SendFormat = {
      id: this.getId(),
      type: STATUS_CODE.CHAT_ROOM_MEMBER_NICK,
      wxid: "ROOT",
      content
    };
    this.send(data)
  }

  /**
   * 设置好友的自动回复状态
   * @param data
   * @constructor
   */
  public SetOpenState (data: {[p: string]: number}): void {
    Object.assign(this.openState, data)
  }

  /**
   * 监听状态
   */
  private listenStatus (): void {
    // 链接成功
    this.socket.onopen = () => {
      console.log("open");
      // 获取配置文件
      ipcRenderer.send(GLOBAL_STATUS.SEND_CONFIG);
      store.commit("setStatus", 0);
      this.getUserInfo();
      this.getFriend();
    };
    // 接收消息
    this.socket.onmessage = (res: MessageEvent) => {
      const data = JSON.parse(res.data);
      data.count = Math.random();
      store.commit("setStatus", 0);
      if (data.status === "FAIL") {
        console.log(data.status, data)
        this.errorCallBack({
          type: data.type,
          error: data.content
        });
        return;
      }
      switch (data.type) {
          // 心跳检测
        case STATUS_CODE.PERSONAL_INFO: // 获取微信个人信息
          store.commit("setWeChatParams", data);
          this.setUserInfo(data);
          break;
        case STATUS_CODE.USER_LIST: // 获取好友
          this.setFriendInfo(data);
          break;
        case STATUS_CODE.HEART_BEAT:
          console.log("心跳检测");
          break;
        case STATUS_CODE.RECV_TXT_MSG: // 接受到好友文字消息
          store.commit("setWeChatParams", data);
          this.sendMsg(data);
          break;
        case STATUS_CODE.CHAT_ROOM_MEMBER: // 获取群好友列表
        case STATUS_CODE.PERSONAL_DETAIL: // 获取群好友列表
        case STATUS_CODE.RECV_PIC_MSG: // 接受到好友图片消息
          store.commit("setWeChatParams", data);
          console.log(data);
          break;
        default:
          console.log("message", data);
          break;
      }
    };
    // 接收到关闭
    this.socket.onclose = () => {
      store.commit("setStatus", 1);
      console.log("close");
      clearTimeout(this.timeout);
      if (!this.timeFlag) return;
      // 非正常关闭,重新打开webSocket
      this.timeout = setTimeout(() => {
        this.open();
      }, 5000)
    };
  }

  /**
   * 全局错误处理
   * @param err
   */
  private errorCallBack(err: { type: number; error: Error }) {
    console.error("error", err);
  }

  /**
   * 获取并记录用户信息
   * @param data
   */
  private setUserInfo(data: UserInfoParams) {
    this.userInfo = data.content;
    console.log(data)
  }

  /**
   * 获取并记录好友列表数据
   * @param data
   */
  private setFriendInfo(data: FriendInfoParams) {
    Object.keys(this.friendInfo).map(m => (this.friendInfo as any)[m] = []);
    data.content.map(m => {
      if (/@chatroom/.test(m.wxid)) {
        m.type = USER_TYPE.CHAT_ROOM;
        m.state = WAKE_UP.OFF;
        this.openState[m.wxid] = WAKE_UP.OFF;
        this.friendInfo.chatRoom.push(m);
      } else if (/gh_/.test(m.wxid)) {
        m.type = USER_TYPE.GH;
        m.state = WAKE_UP.OFF;
        this.friendInfo.gh.push(m);
      } else if (/newsapp/.test(m.wxid)) {
        m.type = USER_TYPE.NEWS;
        m.state = WAKE_UP.OFF;
        m.name = "文件传输助手";
        this.friendInfo.news.push(m);
      } else {
        m.type = USER_TYPE.USER;
        m.state = this.config.userOpen;
        // 如果好友手动开启的话,则将人员也添加进监控列表
        if (this.config.userOpen === WAKE_UP.ON) {
          this.openState[m.wxid] = WAKE_UP.ON;
        } else {
          this.openState[m.wxid] = WAKE_UP.OFF;
        }
        // fmessage"朋友推荐消息" medianote "语音记事本" weixinguanhaozhushou "微信公众平台" floatbottle "漂流瓶" 部分好友微信id不已wxid_开头 无法匹配,目前只能通过这种笨办法来排除了
        if (m.wxid !== "fmessage" && m.wxid !== "medianote" &&  m.wxid !== "weixinguanhaozhushou" && m.wxid !== "floatbottle") {
          this.friendInfo.user.push(m);
        }
      }
      return m;
    });
    console.log('好友列表', this.friendInfo);
  }

  /**
   * 接收到好友/群消息
   * @param data
   */
  private sendMsg(data: TextMsg) {
    if(data.sender === this.ghCode && this.ghData.length) {
      this.sendRobotMsg(this.ghData.splice(0, 1)[0], data.content);
    } else if (data.receiver === "self") { // 个人消息处理
      this.userText(data)
    } else { // 群消息处理
      this.chatRoomText(data)
    }
  }

  /**
   * 自定义发送文件/图片/文字处理
   */
  private sendFileCallBack(wxid: string, content: string): number {
    // 检测接受到的消息是否需要发送文件
    let fileIndex = -1;
    fileIndex = this.config.custom.findIndex(m => m.exact && m.text === content);
    fileIndex === -1 && (fileIndex = this.config.custom.findIndex(m => new RegExp(m.text).test(content)));
    if (fileIndex !== -1) {
      this.sendAll({
        content: this.config.custom[fileIndex].content,
        wxid,
        msgType: this.config.custom[fileIndex].type
      });
      return 1;
    }
    return 0;
  }
  /**
   * 群消息回复
   * @param data
   */
  private async chatRoomText (data: TextMsg) {
    // 检测接受到的消息是否需要发送文件
    if (this.sendFileCallBack(data.receiver, data.content)) return;
    // 开启机器人
    if (this.config.open.find(m => m === data.content)) {
      this.openState[data.receiver] = WAKE_UP.ON;
      this.getatUser(data).then(at => {
        this.sendAtMsg(data.receiver, at, '我在');
      }).catch(err => {
        console.log(err)
      });
      return;
    }
    // 关闭机器人
    if (this.config.close.find(m => m === data.content)) {
      this.openState[data.receiver] = WAKE_UP.OFF;
      this.getatUser(data).then(at => {
        this.sendAtMsg(data.receiver, at, '我走了!拜拜');
      });
      return
    }
    // 判断是否为@消息
    if (/^@.*?\s.*$/.test(data.content)) {
      const name = data.content.replace(/^@(.*?)\s(.*)$/, '$1');
      data.content = data.content.replace(/^@(.*?)\s(.*)$/, '$2');
      if (name !== this.userInfo.nick) {
        return
      } else {
        // 获取群成员名称
        const res = await this.getChatRoom(data.receiver);
        //匹配群成员名称
        res.content.map(m => {
          if (m.wxid === data.sender) {
            data.at = m.nickname
          }
        })
      }
    }
    // 处理开头为机器人名称的消息
    const index = this.config.name.findIndex(m => m === data.content.substring(0, m.length));
    // 未呼叫机器人
    if (index === -1) {
      return
    } else { // 呼叫机器人
      data.content = data.content.substring(this.config.name[index].length)
    }
    // 检测是否开启机器人
    if (this.openState[data.receiver] === WAKE_UP.ON) {
      Object.assign(data, {
        wxid: data.receiver
      });
      this.turing(data)
    }
  }
  /**
   * 个人消息处理
   * @param data
   */
  private userText (data: TextMsg) {
    switch (this.config.userOpen) {
      case WAKE_UP.OFF: // 如果关闭好友自动回复
        return;
      case WAKE_UP.MANUALLY: // 如果需要手动开启关闭好友自动回复
        if (this.config.open.find(m => m === data.content)) {
          this.openState[data.sender] = WAKE_UP.ON;
          this.sendTextMsg(data.sender, '我在');
          return;
        }
        if (this.config.close.find(m => m === data.content)) {
          this.openState[data.sender] = WAKE_UP.OFF;
          this.sendTextMsg(data.sender, '我走了!拜拜');
          return
        }
        break;
    }
    // 检测接受到的消息是否需要发送文件
    if (this.sendFileCallBack(data.sender, data.content)) return;
    // 检测是否开启机器人
    if (this.openState[data.sender] === WAKE_UP.ON) {
      Object.assign(data, {
        wxid: data.sender
      });
      this.turing(data)
    }
  }

  /**
   * 图灵自动回复
   * @param data // 消息处理
   */
  private turing (data: TextMsg) {
    // 图灵机器人回复
    if (this.config.turingApiKey && this.config.replyType === "turing") {
      // 自动回复消息
      const content: TuringParams = {
        reqType: 0,
        perception: {
          inputText: {
            text: data.content
          }
        },
        userInfo: {
          apiKey: this.config.turingApiKey,
          userId: setUserId(data.sender)
        }
      };
      this.turingApi.turing(content).then((res: TuringResponse) => {
        this.sendRobotMsg(data, res.data.results[0].values.text)
      });
    }
    // 公众号回复
    const index = this.friendInfo.gh.findIndex(m => m.wxid === this.ghCode);
    if (index !== -1 && this.config.replyType === "gh") {
      this.sendTextMsg(this.ghCode, data.content);
      this.ghData.push(data)
    }
  }

  /**
   * 图灵机器人 微信公众号机器人 自动回复
   * @param data
   * @param content
   */
  private sendRobotMsg(data: TextMsg, content: string) {
    console.log(data)
    if (data.at) { // @消息回复
      this.sendAtMsg(data.receiver, data.at, content)
    } else { // 非@消息回复
      this.sendAll({
        wxid: (data.wxid as string),
        content:  content
      });
    }
  }
  /**
   * 获取@机器人的人
   * @param data
   */
  private async getatUser(data: TextMsg) {
    const res = await this.getChatRoom(data.receiver);
    let at = '';
    console.log(res.content, data)
    //匹配群成员名称
    res.content.map(m => {
      if (m.wxid === data.sender) {
        at = m.nickname
      }
    });
    if (at) {
      return Promise.resolve(at)
    } else {
      return Promise.reject(at)
    }
  }

  /**
   * 个人信息
   * @constructor
   */
  get UserInfo(): UserInfoParamsContent {
    return this.userInfo
  }

  /**
   * 好友列表
   * @constructor
   */
  get FriendInfo(): FriendType {
    return this.friendInfo
  }

  /**
   * 获取好友的自动回复状态
   * @constructor
   */
  get OpenState(): {[p: string]: number} {
    return this.openState
  }
}
