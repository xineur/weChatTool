<template>
<ul class="fill-height pa-0 send-msg-wrapper">
  <li class="fill-height overflow-y-auto user-list-wrapper">
    <UserList @checkUser="checkUser"></UserList>
  </li>
  <li class="send-msg">
    <SetParams :userInfo="userInfo" :userList="userList"></SetParams>
  </li>
</ul>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FriendInfoParamsContent } from '@/interface/weChatParams';

@Component({
  components: {
    UserList: () => import("./SendMsgPage/userList.vue"),
    SetParams: () => import("./SendMsgPage/setParams.vue"),
  }
})
export default class SendMsgPage extends Vue {
  private userInfo: FriendInfoParamsContent = {
    name: '',
    wxid: '',
    state: 0,
    type: ''
  };
  private userList: FriendInfoParamsContent[] = [];
  /**
   * 获取当前选中和点击的好友 用于发送消息
   * @param userInfo 当前选中的好友
   * @param userList 当前check为true的好友列表
   */
  private checkUser(userInfo: FriendInfoParamsContent, userList: FriendInfoParamsContent[]) {
    this.userInfo = userInfo;
    this.userList = userList;
  }
}
</script>

<style scoped lang="sass">
.send-msg-wrapper
  width: 100%
  display: flex
  .user-list-wrapper
    width: 250px
  .send-msg
    flex: 1
</style>
