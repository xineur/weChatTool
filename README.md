## 前言

本项目主要是基于微信hook制作的windows微信助手工具,基于[wechat-bot](https://github.com/cixingguangming55555/wechat-bot)

<b>微信助手不属于腾讯认可的助手工具,在使用的过程中有导致封号的危险,不推荐使用大号使用!!!!如因使用导致微信封号概不负责</b>

[使用文档](https://github.com/suruixin/weChatTool/tree/master/doc/using.md)

<s>[api]()未编写</s>


## 技术栈

vue-cli3 + vuetify + sass + electron-builder + electron-update + node-ffi-napi

## 版本要求

```
node: 12.16.0-x86
node-gyp: 7.0.0
ffi-napi: 2.4.5
微信版本: 2.9.0.123
```
微信: [2.9.0.123](https://pan.baidu.com/share/init?surl=zRJzwlZ1r8aRBeEc0lg1sw)
提取码：j4m0

## 注入器及hook文件地址

[hook](https://github.com/cixingguangming55555/wechat-bot/tree/master/server)

[注入器](https://github.com/suruixin/WeChatInject)

## 回复方式

公众号(使用的微软小冰)

![gh](./doc/img/gh.jpg)

[图灵机器人](http://www.turingapi.com/)

不过机器人都很傻,不要抱有太大希望

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

- [x] 好友设置是否自动回复

- [ ] 微信消息右侧弹窗提醒

- [ ] 快捷配置微信助手相关信息

- [ ] 自动回复图片消息

- [ ] 托盘美化

- [ ] 快捷启动微信

- [ ] 手动注入(目前为自动注入,后续优化界面时,修改为手动注入)


## 配置文件说明

```
# 文档\wechat-tool\config.yaml
name: []
# 回复方式 gh为微信公众号方式回复 需先关注 苏某人的日常 truing为图灵机器人的方式回复,需先申请图灵机器人
replyType: "gh", // gh truing
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
    content: 'C:\config.yaml'
  - text: '小熊,发送图片'
    type: "image"
    exact: false
    content: 'C:\1.jpg'
  - text: '小熊,发送图片文件'
    type: "file"
    content: 'C:\1.jpg'
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

<b>微信助手不属于腾讯认可的助手工具,在使用的过程中有导致封号的危险,不推荐使用大号使用!!!!</b>

## 成品下载地址

[百度网盘](https://pan.baidu.com/s/1-bjFgPO2vGMTh6uj9411Gg)

提取码：vir6

[gitee](https://gitee.com/suapril/weChatTool/tree/master/application)
