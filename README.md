## 前言

本项目主要是基于微信hook制作的windows微信助手工具,基于[wechat-bot](https://github.com/cixingguangming55555/wechat-bot)
最初是因为看到[微信每日说](https://github.com/gengchen528/wechatBot),想使用,发现web接口不对2017年后的微信开放,各方找资料,最终确定了本方案

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

## 目录

```
./
├ public                   // 公共文件存放地址
├ src
│  ├ config                // 配置文件存放地址
│  │  ├ config.ts          // 系统中需要用到的不对外公开的配置信息
│  │  ├ index.ts           // 系统中需要用到的初始化配置信息
│  │  └ yaml.ts            // 将初始化配置存放到用户电脑上,并生成yarm文件
│  ├ enum                  // 数据类型文件存放地址
│  │  ├ ipc.ts             // 主进程和渲染进程通信
│  │  ├ mainEnum.ts        // 主进程中用到的数据类型
│  │  └ weChat.ts          // 调用微信hook进行数据传输的数据类型
│  ├ interface             // 接口存放地址
│  │  ├ api.ts             // 数据请求接口
│  │  ├ config.ts          // 初始化配置信息接口
│  │  ├ mainInterface.ts   // 主进程中用到的接口
│  │  ├ views.ts           // 渲染进程中用到的接口
│  │  ├ vuexInterface.ts   // vuex用到的接口
│  │  └ weChatParams.ts    // 微信hook用到的接口
│  ├ mainProcess            // 主进程存放地址
│  │  ├ BrowserWindow      // 主进程配置文件
│  │  │  └ index.ts
│  │  ├ Inject             // 注入文件
│  │  │  ├ Inject.ts      // 注入文件封装
│  │  │  └ manage.ts      // 注入文件使用
│  │  ├ ipc                // 主进程与渲染进程通讯
│  │  │  └ index.ts
│  │  ├ tray               // 托盘
│  │  │  └ index.ts
│  │  ├ update             // 升级
│  │  │  └ index.ts
│  │  └ index.ts           // 主进程输出文件
│  ├ render                 // 渲染进程存放地址
│  │  ├ api                // 数据请求
│  │  │  ├ index.ts       // 数据请求出口文件
│  │  │  ├ turing.ts      // 图灵机器人数据请求
│  │  │  └ weChat.ts      // 微信hook数据请求
│  │  ├ assets             // 渲染进程静态文件
│  │  │  ├ icon           // icon
│  │  │  ├ images         // 图片
│  │  │  └ sass           // 全局sass文件
│  │  ├ components         // 组件
│  │  │  ├ Common
│  │  │  │  └ Snackbar.vue // 错误提醒
│  │  │  ├ Main             // 通用主页面
│  │  │  │  ├ components
│  │  │  │  │  ├ content.vue        // 内容区域
│  │  │  │  │  ├ footer.vue         // 底部
│  │  │  │  │  ├ navigation.vue     // 左侧边栏
│  │  │  │  │  └ title.vue          // 头部
│  │  │  │  └ index.vue  // 通用主页面入口文件
│  │  │  └ Socket
│  │  │     └ Socket
│  │  │         └ WeChat.ts // 微信hook websocket监听
│  │  ├ mixins             // 混入
│  │  │  └ index.ts
│  │  ├ plugins            // 插件
│  │  │  ├ tool
│  │  │  │  ├ api.ts     // api文件输出
│  │  │  │  └ index.ts   // 输出本目录下所有文件
│  │  │  ├ common.ts      // 通用方法
│  │  │  ├ main.ts        // vue全局注入
│  │  │  └ vuetify.ts     // vuetify配置
│  │  ├ router             // 路由
│  │  │  ├ index.ts
│  │  │  └ routes.ts
│  │  ├ store              // vuex
│  │  │  ├ modules
│  │  │  │  ├ index.ts
│  │  │  │  ├ main.ts
│  │  │  │  └ userList.ts
│  │  │  ├ actions.ts
│  │  │  ├ getters.ts
│  │  │  ├ index.ts
│  │  │  ├ mutations.ts
│  │  │  └ mutations.ts
│  │  ├ utils              // 工具封装
│  │  │  ├ axios.ts       // axios封装
│  │  │  ├ ipc.ts         // 通用主进程通讯分装
│  │  │  └ require.ts     // get post等请求封装
│  │  └ views              // 页面
│  │      ├ About          // 关于页面
│  │      │ └ AboutPage.vue          // 关于页面
│  │      ├ Home           // 首页(未想好做什么样的)
│  │      ├ SendMsg        // 发送消息页面
│  │      │ ├ SendMsgPage            // 发送消息页面相关信息
│  │      │ │ ├ userList            // 好友列表相关
│  │      │ │ │ ├ listItem.vue     // 单好友页面
│  │      │ │ │ └ listWrapper.vue  // 好友组页面
│  │      │ │ ├ setParams.vue       // 右侧发送消息
│  │      │ │ └ userList.vue        // 好友列表
│  │      │ └ SendMsgPage.vue        // 发送消息页面入口
│  │      └ Tool           // 配置页面(未想好做什么样的)
│  ├ type                   // 类型别名文件存放地址
│  ├ App.vue
│  ├ background.ts          // 主进程入口
│  ├ main.ts
│  ├ registerServiceWorker.ts
│  ├ shims-node.d.ts
│  ├ shims-tsx.d.ts
│  └ shims-vue.d.ts
├ static
│  ├ dll // 动态链接库(hook和注入)存放地址
│  └ icon // 打包icon存放地址
├ package.json
├ tsconfig.json
└ vue.config.js
```

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

<b>微信助手不属于腾讯认可的助手工具,所以用于营销,发广告等行为会导致封号,这也是我说严禁用于打广告/推广的原因,希望大家可以在腾讯允许的范围内进行使用</b>

如二次开发给女朋友查询干湿垃圾,每日天气播报等等,同时欢迎各位it朋友加好友一起研究前端 c++知识(本人前端一枚,会一些简单的c++)

## 成品下载地址

[百度网盘](https://pan.baidu.com/s/1-bjFgPO2vGMTh6uj9411Gg)

提取码：vir6

[gitee](https://gitee.com/suapril/weChatTool/tree/master/application)
