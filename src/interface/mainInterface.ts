import { Library } from "ffi-napi";

export interface DllInject extends Library {
  Inject: (WeChatDll: string, exePath: string) => number;
}
