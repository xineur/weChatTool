import { WeChatState as State, BarParams, WeChatParam } from "@/interface/vuexInterface";

export default {
  setStatus (state: State, data: string | number) {
    state.status = Number(data);
  },
  setWeChatParams (state: State, data: WeChatParam) {
    state.WeChatParams = data;
  },
  setBarParams(state: State, data: BarParams) {
    Object.assign(state.barParams, {
      count: state.barParams.count && ++state.barParams.count
    }, data);
    console.log(state.barParams)
  }
}
