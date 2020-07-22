<template>
  <v-list dense class="v-alert__border--right pt-0">
    <!-- 传输助手 -->
<!--    <v-list-item-group color="primary" v-model="checkActive.news" multiple>-->
<!--      <v-subheader>传输助手</v-subheader>-->
<!--        <Item-->
<!--            v-for="item in friendInfo.news"-->
<!--            :key="item.wxid" :item="item" @checkUser="checkUser"></Item>-->
<!--    </v-list-item-group>-->
    <!-- 传输助手end -->

    <!-- 好友  -->
    <ListWrapper
        :text="'好友'"
        :checkActive="checkActive.user"
        :friendInfo="friendInfo.user"
        @checkUser="checkUser"
        @setCheckActive="setCheckActive($event, 'user')"
    ></ListWrapper>
    <v-divider></v-divider>
    <!-- 好友end  -->

    <!-- 群  -->
    <ListWrapper
        :text="'群'"
        :checkActive="checkActive.chatRoom"
        :friendInfo="friendInfo.chatRoom"
        @checkUser="checkUser"
        @setCheckActive="setCheckActive($event, 'chatRoom')"
    ></ListWrapper>
    <v-divider></v-divider>
    <!-- 群end  -->

    <!-- 公众号  -->
    <ListWrapper
        :text="'公众号'"
        :checkActive="checkActive.gh"
        :friendInfo="friendInfo.gh"
        @checkUser="checkUser"
        @setCheckActive="setCheckActive($event, 'gh')"
    ></ListWrapper>
    <!-- 公众号 end  -->
  </v-list>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
import { WeChatParam } from "@/interface/vuexInterface";
import { STATUS_CODE } from '@/enum/weChat';
import { FriendType, FriendInfoParamsContent, CheckActive } from '@/interface/weChatParams';
import { wx_member_type } from '@/type/views';

@Component({
  components: {
    Item: () => import("./userList/listItem.vue"),
    ListWrapper: () => import("./userList/listWrapper.vue"),
  }
})
export default class UserList extends Vue {
  private timeout: any; // 防抖
  private friendInfo: FriendType = { // 好友列表
    user: [],
    chatRoom: [],
    news: [],
    gh: []
  };
  private checkActive: { // 选中好友列表
    user: number[];
    chatRoom: number[];
    news: number[];
    gh: number[];
  } = {
    user: [],
    chatRoom: [],
    news: [],
    gh: []
  };
  @State("WeChatParams") private WeChatParams!: WeChatParam;
  @Watch("WeChatParams.count", { immediate: true })
  private getWeChatParams (): void {
    if (this.WeChatParams.type === STATUS_CODE.PERSONAL_INFO) {
      this.friendInfo = {
        user: [],
        chatRoom: [],
        news: [],
        gh: []
      };
      this.friendInfo = (this.$root as any).FriendInfo;
    }
  }

  /**
   * 点击好友后获取好友详细信息
   * @param item 好友基本信息
   */
  private checkUser(item: FriendInfoParamsContent): void {
    // socket表现形式不好,暂时放弃该功能,后续dll更新再修改该功能
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      (this.$root as any).getFriendInfo(item.wxid);
    }, 500);
    // 选中好友数据更新
    setTimeout(() => {
      const friendList: FriendInfoParamsContent[] = [];
      Object.keys(this.checkActive).map(m => {
        (this.checkActive as any)[m].map((n: number) => {
          friendList.push((this.friendInfo as any)[m][n])
        })
      });
      console.log(friendList, this.checkActive)
      this.$emit("checkUser", item, friendList)
    })
  }
  private setCheckActive(data: number[], type: wx_member_type) {
    this.checkActive[type] = data;
  }
}
</script>

<style scoped>

</style>
