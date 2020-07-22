<template>
  <div>
    <v-list-item @dblclick="setValue">
      <v-list-item-content class="py-0">
        <v-list-item-subtitle class="text-caption">{{text}}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn text small depressed icon @click.stop="getFriend" :loading="loading">
          <v-icon class="font-weight-thin ">we-update</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-list-item-group color="primary" v-model="checkActive" multiple>
      <Item
          v-for="(item, index) in friendInfo"
          :key="index" :item="item" @checkUser="checkUser"></Item>
    </v-list-item-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { FriendInfoParamsContent } from "@/interface/weChatParams";

@Component({
  components: {
    Item: () => import("./listItem.vue"),
  }
})
export default class ListWrapper extends Vue {
  private loading = false;
  private timeout: any;
  private checkActive: number[] = [];
  private value = false;
  @Prop({ required: true })
  private text!: string;
  @Prop({ required: true })
  private friendInfo!: FriendInfoParamsContent[];
  @Watch("friendInfo", { immediate: true })
  private getWeChatParams (): void {
    setTimeout(() => {
      this.loading = false
    }, 200)
  }
  @Watch("checkActive")
  private setCheckActive() {
    this.value = this.checkActive.length === this.friendInfo.length;
    this.$emit("setCheckActive", this.checkActive);
  }
  private getFriend() {
    this.loading = true;
    (this.$root as any).getFriend()
  }
  private setValue() {
    this.value = !this.value;
    // 当用户点击全选按钮的时候
    if (this.value) {
      this.checkActive = this.friendInfo.map((m, i) => i);
    } else {
      this.checkActive = [];
    }
    this.$emit("checkUser", this.friendInfo[this.checkActive[0] || 0])
    this.$emit("setCheckActive", this.checkActive);
  }
  /**
   * 点击好友后获取好友详细信息
   * @param item 好友基本信息
   */
  private checkUser(item: FriendInfoParamsContent): void {
    this.$emit("checkUser", item)
  }
}
</script>

<style scoped>

</style>
