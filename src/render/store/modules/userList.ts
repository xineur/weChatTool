import { UserListState as State } from "@/interface/vuexInterface";
import { CheckActive, FriendType } from "@/interface/weChatParams";

export default {
  namespaced: true,
  state: {
    checkActive: { // 选中的用户列表
      user: [],
      chatRoom: [],
      news: [],
      gh: [],
    },
    friendInfo: { // 好友列表
      user: [],
      chatRoom: [],
      news: [],
      gh: [],
    }
  },
  getters: {

  },
  mutations: {
    setCheckActive(state: State, data: CheckActive) {
      Object.assign(state.checkActive, data)
    },
    friendInfo(state: State, data: FriendType) {
      Object.assign(state.friendInfo, data)
    },
  },
  actions: {

  }
}
