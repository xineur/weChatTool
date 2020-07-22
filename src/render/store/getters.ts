import { WeChatState as State } from "@/interface/vuexInterface";

export default {
  status (state: State) {
    return state.status;
  },
  WeChatParams (state: State) {
    return state.WeChatParams
  }
}
