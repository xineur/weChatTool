## 前言

本项目主要是基于微信hook制作的windows 微信助手工具,基于[wechat-bot](https://github.com/cixingguangming55555/wechat-bot)开发的

## 技术栈

vue-cli3 + vuetify + sass + electron-builder + electron-update + node-ffi-napi

## 版本要求

```
node: 12.16.0-x86
node-gyp: 7.0.0
ffi-napi: 2.4.5
```

## 运行

```
git clone https://github.com/suruixin/weChatTool.git

yarn or npm i

npm run serve:e
```

## 功能

- [x] 基于图灵机器人的自动回复

- [x] 基于微信公众号进行自动回复(微软小冰)

- [x] 发送消息/图片/文字

- [x] 指定人员发送消息/图片/文字

- [x] 根据指定语/关键字回复文字/图片/文件

- [x] 自动升级(目前版本稳定性未知,将使用强制更新)

- [ ] <s>手动升级</s>

- [x] 禁止分享链接(防止群发集赞/砍一刀等行为)

- [ ] 微信消息右侧弹窗提醒

- [ ] 快捷配置微信助手相关信息

- [ ] 自动回复图片消息

- [ ] 托盘美化

- [ ] 快捷启动微信

- [ ] 错误日志


## 配置文件说明

```
# 文档\weChatTool\config.yaml
name: []
# 机器人名称 群交流格式为 `@机器人昵称 要说的话`||`机器人名称 要说的话`为空时且不@群消息不做回复,好友交流格式为`要说的话`
turingApiKey: xxxxxxxx
# turingApiKey: 图灵apiKey 为空时不启用图灵机器人
open: []
#  - 呼叫小熊
# open: 唤起机器人快捷语 为空时默认关闭
close: []
# - 撤退!小熊
# close: 关闭机器人快捷语 为空时不可关闭机器人
custom:
  - text: '小熊,发送配置文件'
    type: "file"
    exact: false
    content: 'C:\Users\86176\Documents\wechat-robot-electron\config.yaml'
  - text: '小熊,发送图片'
    type: "image"
    exact: false
    content: 'C:\Users\86176\Documents\wechat-robot-electron\1.jpg'
  - text: '小熊,发送图片文件'
    type: "file"
    content: 'C:\Users\86176\Documents\wechat-robot-electron\1.jpg'
    exact: true
  - text: '你好'
    type: "text"
    content: '你好呀!'
    exact: true
# 当回复关键字发送快捷语(无需开启好友消息自动回复)
# text: 接受到的关键字
# type: 发送类型 分为 image(图片), file(不大于100M的文件), text(自定义文本)
# content: 发送的快捷语
# exact: 是否精确匹配快捷语
userOpen: 2
# userOpen: 聊天是否使用机器人(仅限好友) 0 不使用 1 使用快捷语唤起 2 静默唤起
```

## 警告

<b>本项目初衷为解决生活中需要被动回复消息/发送文件,严禁用于打广告/推广等行为</b>

## 成品下载地址

[百度网盘](https://pan.baidu.com/s/1-bjFgPO2vGMTh6uj9411Gg)

提取码：vir6

[gitee](https://gitee.com/suapril/weChatTool/tree/master/application)
