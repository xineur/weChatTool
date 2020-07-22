<template>
<div>
  <v-row>
    <v-col cols="3" md="3">
      <v-btn color="success" @click="inject" :disabled="!status">注入</v-btn>
    </v-col>
    <v-col cols="3" md="3">
      <v-btn color="success" @click="open" :disabled="!status">打开socket</v-btn>
    </v-col>
    <v-col cols="3" md="3">
      <v-btn color="error" @click="close" :disabled="!!status">关闭socket</v-btn>
    </v-col>
    <v-col cols="3" md="3">
      <v-btn color="success" @click="getFriend" :disabled="!!status">获取好友列表</v-btn>
    </v-col>

    <v-col cols="5" md="5">
      <v-text-field label="好友/群wxid" v-model="friendData.id" ></v-text-field>
    </v-col>
    <v-col cols="5" md="5">
      <v-text-field label="被@人的昵称(仅限群聊天)" v-model="friendData.AT" ></v-text-field>
    </v-col>
    <v-col cols="12" md="5">
      <v-textarea
          outlined
          name="input-7-4"
          label="消息内容(若发送图片则为图片路径)" v-model="friendData.content"
      ></v-textarea>
    </v-col>

    <v-col cols="3" md="3">
      <v-btn color="primary" @click="sendTextMsg" :disabled="!!status">向好友发送消息</v-btn>
    </v-col>
    <v-col cols="3" md="3">
      <v-btn color="primary" @click="sendPicMsg" :disabled="!!status">向好友发送图片</v-btn>
    </v-col>
    <v-col cols="3" md="3">
      <v-btn color="primary" @click="sendAttach" :disabled="!!status">向好友发送文件</v-btn>
    </v-col>
    <v-col cols="3" md="3">
      <v-btn color="primary" @click="getUserInfo" :disabled="!!status">获取微信个人信息</v-btn>
    </v-col>
    <v-col cols="3" md="3">
      <v-btn color="primary" @click="getChatRoom" :disabled="!!status">获取群好友列表</v-btn>
    </v-col>
    <v-col cols="3" md="3">
      <v-btn color="primary" @click="sendAtMsg" :disabled="!!status">发送群AT消息</v-btn>
    </v-col>
    <v-col cols="3" md="3">
      <v-btn color="primary" @click="getFriendInfo" :disabled="!!status">获取好友详细信息</v-btn>
    </v-col>
    <v-col cols="3" md="3">
      <v-btn color="primary" @click="destroy" :disabled="!!status">注销</v-btn>
    </v-col>
  </v-row>
</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
import { ipcRenderer } from "electron";
import { INJECT_STATUS } from "@/enum/ipc";
import { WeChatParam } from "@/interface/vuexInterface";
import { STATUS_CODE } from '@/enum/weChat';

@Component({})
export default class Home extends Vue {
  @State("status") private status!: number;
  @State("WeChatParams") private WeChatParams!: WeChatParam;
  @Watch("WeChatParams.count")
  private getWeChatParams (): void {
    switch (this.WeChatParams.type) {
      case STATUS_CODE.RECV_TXT_MSG: // 文字消息
        // listenText.call(this, data);
        break;
      case STATUS_CODE.RECV_PIC_MSG: // 图片消息
        break;
    }
    // console.log(this.WeChatParams)
  }
  private api = (this as any).$api.turing;
  private WeChat = (this.$root as any);
  private friendData: { id: string; content: string; AT: string } = {
    id: "",
    content: "",
    AT: ""
  };
  /* 生命周期钩子 */
  // created(): void {
  // }
  /* 生命周期钩子end */
  // 注入
  private inject (): void {
    ipcRenderer.send(INJECT_STATUS.INJECT);
  }
  // 打开
  private open (): void {
    console.log("运行打开WebSocket");
    this.WeChat.open();
  }
  // 关闭
  private close (): void {
    this.WeChat.close();
  }
  // 获取好友列表
  private getFriend (): void {
    this.WeChat.getFriend();
  }
  // 向你的好友发送微信文本消息
  public sendTextMsg (): void {
    this.WeChat.sendTextMsg(this.friendData.id, this.friendData.content)
  }
  // 向你的好友发送图片
  public sendPicMsg (): void {
    // E:\\github\\wechat-robot-electron\\public\\avatar.jpg
    this.WeChat.sendPicMsg(this.friendData.id, this.friendData.content)
  }
  // 向你的好友发送文件
  public sendAttach (): void {
    // E:\\github\\wechat-bot\\client\\readme.md wxid_0mfjqqqhfe3y22
    this.WeChat.sendAttach(this.friendData.id, this.friendData.content)
  }
  // 获取微信个人信息
  private getUserInfo (): void {
    this.WeChat.getUserInfo();
  }
  // 获取群好友列表
  private getChatRoom (): void {
    this.WeChat.getChatRoom(this.friendData.id).then((res: any) => {
      console.log(res)
    });
  }
  // 发送群AT消息
  private sendAtMsg (): void {
    this.WeChat.sendAtMsg(this.friendData.id, this.friendData.AT, this.friendData.content);
  }
  // 获取群成员昵称
  public getChatNick (): void {
    this.WeChat.getChatNick(this.friendData.id)
  }
  // 获取好友详细信息
  public getFriendInfo (): void {
    this.WeChat.getFriendInfo(this.friendData.id)
  }
  // 注销
  public destroy (): void {
    this.WeChat.destroy(this.friendData.id)
  }
  private listen (): void {
    ipcRenderer.on(INJECT_STATUS.SUCCESS, (event: Event, data: string) => {
      console.log(event, data);
    });
  }
}
</script>

<style scoped lang="less">

</style>
