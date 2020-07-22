<template>
  <v-list-item
      height="30px"
      min-height="30px"
      :title="item.name"
      @click="getFriendInfo(item)"
  >
    <template v-slot:default="{ active }">
      <v-list-item-action class="mr-3 ml-1">
        <v-checkbox :input-value="active"></v-checkbox>
      </v-list-item-action>
      <v-list-item-content class="py-0">
        <v-list-item-subtitle class="text-caption" :color="'#000'">{{item.name}}</v-list-item-subtitle>
      </v-list-item-content>
    </template>
  </v-list-item>
</template>

<script lang="ts">
import {Component, Vue, Prop} from "vue-property-decorator";
import { FriendInfoParamsContent } from "@/interface/weChatParams";

@Component({})
export default class ListItem extends Vue {
  @Prop({required: true}) private item!: FriendInfoParamsContent;
  private getFriendInfo(item: FriendInfoParamsContent): void {
    this.$emit("checkUser", item)
  }
}
</script>

<style scoped>

</style>
