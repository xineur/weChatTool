<template>
<!-- 头部 -->
<div>
  <button class="pa-2" @click="minimize">
    <v-icon class="off-drag icon">we-min</v-icon>
  </button>
  <!--  <v-btn text icon >-->
  <!--    <v-icon class="off-drag icon">we-max</v-icon>-->
  <!--  </v-btn>-->
  <button class="pa-2"  @click="close">
    <v-icon class="off-drag icon">we-close</v-icon>
  </button>
</div>
<!-- 头部end -->
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ipcRenderer } from "electron";
import { GLOBAL_STATUS } from "@/enum/ipc";

@Component({})
export default class Title extends Vue {
  private minimize(): void {
    ipcRenderer.send(GLOBAL_STATUS.MINIMIZE)
  }
  private close(): void {
    ipcRenderer.send(GLOBAL_STATUS.CLOSE)
  }
}
</script>

<style scoped lang="sass">
</style>
