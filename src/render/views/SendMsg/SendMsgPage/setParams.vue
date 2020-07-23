<template>
  <v-card
      :loading="loading"
      class="mx-auto mt-2"
      max-width="500"
      v-if="data.name2 || userList.length > 0"
      elevation="0"
  >
    <v-img
        :src="banner"
        height="260"
        class="grey darken-4"
    ></v-img>

    <v-list-item three-line>
      <v-list-item-content>
        <div class="mt-2 caption">{{typeName[userInfo.type]}}</div>
        <v-list-item-title class="mt-2 headline mb-1">{{data.name2}}</v-list-item-title>
        <v-list-item-subtitle class="mt-2 caption" v-if="data.name1">{{ data.name1 }}</v-list-item-subtitle>
        <v-list-item-subtitle class="mt-1 caption" v-if="data.signature">{{ data.signature }}</v-list-item-subtitle>
        <v-list-item-subtitle class="mt-1 caption" v-if="data.wxcode">{{ data.wxcode }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
          tile
          size="80"
          color="grey"
          :src="data.big_headimg"
      ></v-list-item-avatar>
    </v-list-item>

    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      <v-textarea
          name="input-7-1"
          outlined
          label="待发送消息"
          v-model="content"
          dense
          :rows="3"
          :loader-height="3"
          :hide-details="true"
      ></v-textarea>
    </v-card-text>
    <v-card-actions>
      <v-btn
          color="deep-purple lighten-2"
          text
          @click="sendMsg('only', 'text')"
      >
        发送消息
      </v-btn>
      <v-btn
          color="deep-purple lighten-2"
          v-if="userList.length > 1"
          text
          @click="sendMsg('all', 'text')"
      >
        群发消息
      </v-btn>
      <v-btn
          color="deep-purple lighten-2"
          text
          @click="sendFileMsg('only', 'img')"
      >
        <input type="file" style="display: none">
        发送图片
      </v-btn>
      <v-btn
          color="deep-purple lighten-2"
          text
          v-if="userList.length > 1"
          @click="sendFileMsg('all', 'img')"
      >
        群发图片
      </v-btn>
      <v-btn
          color="deep-purple lighten-2"
          text
          @click="sendFileMsg('only', 'file')"
      >
        发送附件
      </v-btn>
      <v-btn
          color="deep-purple lighten-2"
          text
          v-if="userList.length > 1"
          @click="sendFileMsg('all', 'file')"
      >
        群发附件
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { ipcRenderer, OpenDialogOptions } from "electron";
import { State } from "vuex-class";
import { WeChatParam } from "@/interface/vuexInterface";
import { STATUS_CODE } from '@/enum/weChat';
import { FriendInfoParamsContent, FriendDetInfo } from '@/interface/weChatParams';
import { GLOBAL_STATUS } from '@/enum/ipc';
const banner = require("~a/image/banner.png");

@Component({})
export default class SetParams extends Vue {
  private loading = true;
  private content = "";
  private banner: any = banner;
  private typeName: { [p: string]: string } = {
    user: "好友",
    chatRoom: "群", // 群
    gh: "公众号", // 公众号
    news: "文件传输助手", // 文件传输助手
    unknown: "好友", // 其他不明身份的用户 部分好友的wxid不已wxid_开头 捕捉异常
  };
  private data: FriendDetInfo = {
    big_headimg: "",
    city: "",
    cover: "",
    little_headimg: "",
    name1: "",
    name2: "",
    nation: "",
    provice: "",
    signature: "",
    v1: "",
    wxcode: ""
  };
  @Prop({ required: true }) private userInfo!: FriendInfoParamsContent; // 当前选中好友
  @Prop({ required: true }) private userList!: FriendInfoParamsContent[]; // 当前check为true的好友
  @State("WeChatParams") private WeChatParams!: WeChatParam;
  @Watch("userInfo", { immediate: true })
  private setLoading() {
    this.loading = true;
  }
  @Watch("WeChatParams.count", { immediate: true })
  private getWeChatParams (): void {
    // socket表现形式不好,暂时放弃该功能,后续dll更新再修改该功能
    if (this.WeChatParams.type === STATUS_CODE.PERSONAL_DETAIL) {
      this.data = (this.WeChatParams.content as FriendDetInfo);
      this.loading = false
    }
  }
  public created(): void {
    ipcRenderer.on(GLOBAL_STATUS.SET_FILE_PATH, (event: Electron.IpcMessageEvent, data: string[], type: string, msgType: string) => {
      switch (type) {
        case "only":
          return (this.$root as any).sendAll({
            wxid: this.userInfo.wxid,
            content: data[0],
            msgType
          });
        case "all":
          this.callBack(0, data[0], msgType);
          break;
      }
    })
  }

  /**
   * 发送文字消息
   * @param type
   * @param msgType
   */
  private sendMsg(type: string, msgType: string): void {
    switch (type) {
      case "only":
        return (this.$root as any).sendAll({
          wxid: this.userInfo.wxid,
          content: this.content,
          msgType
        });
      case "all":
        this.callBack(0, this.content, msgType);
        break;
    }
    this.content = "";
  }

  /**
   * 发送文件/图片
   * @param type
   * @param msgType
   */
  private sendFileMsg(type: string, msgType: string) {
    let option: OpenDialogOptions = {};
    switch (msgType) {
      case "file":
        option = {
          title: "请选择文件",
          filters: []
        };
        break;
      case "img":
        option = {
          title: "请选择图片",
          filters: [
            {
              name: "img", extensions: ["ico", "bmp", "jpg", "jpeg", "png", "tif", "gif", "pcx", "tga", "exif", "fpx", "svg", "psd", "cdr", "pcd", "dxf", "ufo", "eps", "ai", "raw", "WMF"]
            }
          ]
        };
        break;
    }
    ipcRenderer.send(GLOBAL_STATUS.OPEN_FILE, option, type, msgType)
  }
  private callBack(index: number, content: string, msgType: string) {
    (this.$root as any).sendAll({
      wxid: this.userList[index].wxid,
      content,
      msgType
    }).then(() => {
      ++index;
      if (this.userList[index]) this.callBack(index, content, msgType);
    });
  }
}
</script>

<style scoped>

</style>
