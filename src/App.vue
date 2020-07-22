<template>
  <div id="app">
    <router-view></router-view>
    <Snackbar></Snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import { ipcRenderer } from "electron";
import {BarParams, WeChatParam} from "@/interface/vuexInterface";
import { STATUS_CODE } from "@/enum/weChat";
import { INJECT_STATUS, GLOBAL_STATUS } from "@/enum/ipc";

@Component({
  components: {
    Snackbar: () => import("~/components/Common/Snackbar.vue")
  }
})
export default class App extends Vue {
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
  @Mutation("setBarParams")
  private setBarParams!: (data: BarParams) => void;
  public mounted(): void {
    this.inject();
    this.$nextTick(() => {
      ipcRenderer.send(GLOBAL_STATUS.RENDER_SUCCESS, true);
    })
  }
  // 注入
  private inject (): void {
    ipcRenderer.send(INJECT_STATUS.INJECT);
  }
}
</script>

<style lang="sass">
#app
  position: relative
  overflow: hidden
  transform: translate(0, 0)
</style>
