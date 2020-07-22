<template>
  <v-snackbar
      v-model="snackbar"
      :vertical="vertical"
      :top="true"
      :timeout="timeout"
      class="snackbar-wrapper"
  >
    {{ barParams.text }}
    <template v-slot:action="{ attrs }">
      <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbar = false"
      >
        关闭
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import { ipcRenderer } from "electron";
import { BarParams } from "@/interface/vuexInterface";
import { INJECT_STATUS } from "@/enum/ipc";

@Component({})
export default class Snackbar extends Vue {
  private snackbar = false;
  private vertical = true;
  private timeout = 10000;
  @State("barParams")
  private barParams!: BarParams;
  @Mutation("setBarParams")
  private setBarParams!: (data: BarParams) => void;
  @Watch("barParams.count")
  private setSnackbar() {
    this.snackbar = true
  }
  public created(): void {
    this.ipcListen()
  }
  private ipcListen() {
    // 监听注入情况
    ipcRenderer.on(INJECT_STATUS.ERR, (event: Electron.IpcMessageEvent, data: string) => {
      this.setBarParams({
        text: data
      });
    });
  }
}
</script>

<style lang="sass">
.snackbar-wrapper
  margin-top: 40px
</style>
