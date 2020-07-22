<template>
  <v-card class="mx-auto"
          max-width="600">
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline">当前版本: {{packages.version}}</div>
        <v-list-item-title class="headline">微信助手</v-list-item-title>
        <v-list-item-subtitle class="mt-0">关注右侧公众号,可开启gh方式自动回复</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
          tile
          size="200"
          color="grey"
      >
        <v-img :src="gh"></v-img>
      </v-list-item-avatar>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle class="mt-4">使用文档: https://github.com/suruixin/weChatTool/doc/document.md</v-list-item-subtitle>
        <v-list-item-subtitle class="mt-4">github地址: https://github.com/suruixin/weChatTool</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
const gh = require("~a/image/gh.jpg");
const packages = require("../../../../package.json");

@Component({})
export default class AboutPage extends Vue {
  private packages: any = packages;
  private gh: any = gh;
  public mounted(): void {
    console.log(gh)
  }
}
</script>

<style scoped>

</style>
