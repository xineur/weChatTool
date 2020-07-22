import { TuringParams, TuringResponse } from "@/interface/api";

export function listenText(this: any, data: TuringParams) {
  let text = "";
  if (typeof this.WeChatParams.content === "string") text = this.WeChatParams.content;
  Object.assign(data, {
    reqType: 0,
    perception: {
      inputText: {
        text
      }
    }
  });
  // if (this.WeChatParams.receiver !== "self" ) {
  //   text
  // }
  this.api.turing(data).then((res: TuringResponse) => {
    // 群消息
    if (this.WeChatParams.receiver !== "self") {
      // Object.assign(this.friendData, {
      //   id: this.WeChatParams.receiver,
      //   content: res.data.results[0].values.text,
      //   AT: ""
      // });
    } else { // 个人消息
      Object.assign(this.friendData, {
        id: this.WeChatParams.sender,
        content: res.data.results[0].values.text,
        AT: null
      });
    }
    this.sendTextMsg();
    console.log(res.data.results[0].values.text)
  });
}
