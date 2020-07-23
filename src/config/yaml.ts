import { read, writeSync } from "node-yaml";
import { app } from "electron";
import fs from "fs";
import config from "./index";
import { Config } from "@/interface/config"

export default class Yaml {
  private path = `${app.getPath("documents")}\\${app.getName()}\\`;
  private fileName = "config.yaml";
  constructor () {
    this.mkdir()
  }
  // 读取配置文件
  public readConfig () {
    return read(this.filePath).then((res: Config) => {
      res = Object.assign({}, config, res || {});
      console.log(res)
      writeSync(this.filePath, res);
      return Promise.resolve(res)
    }).catch((err: Error) => {
      console.log(err);
      writeSync(this.filePath, config);
      return this.readConfig()
    })
  }
  // 创建文件夹
  private mkdir () {
    if (!fs.existsSync(this.path)) {
      fs.mkdirSync(this.path);
    }
  }
  get filePath () {
    return this.path + this.fileName
  }
}
