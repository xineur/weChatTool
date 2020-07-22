import ffi from "ffi-napi";
import { DllInject } from "@/interface/mainInterface";

export default class Inject {
  private Handel: DllInject;

  public constructor(dllPath: string) {
    this.Handel = ffi.Library(dllPath, {
      Inject: ['int', ["string", "string"]]
    })
  }

  public Inject(dllPath: string, exePath: string): number {
    return this.Handel.Inject(dllPath, exePath);
  }
  public StatusCode(code: number): string {
    const StatusCode: {
      [p: number]: string;
    } = {
      0: "成功",
      1: "没有找到微信进程,请确认微信是否打开",
      2: "打开进程失败",
      3: "分配内存空间失败",
      4: "写入内存失败",
      5: "查找LoadLibraryA失败",
      6: "启动远程线程失败"
    };
    return StatusCode[code]
  }
}
