const { join } = require('path');
const resolve = dir => join(__dirname, dir);

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('~', resolve('src/render'))
      .set('~a', resolve('src/render/assets'))
      .set('~c', resolve('src/render/components'))
      .set('~v', resolve('src/render/views'))
  },
  configureWebpack: {
    devtool: 'source-map',
  },
  "lintOnSave": false,
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        productName: "微信助手",
        publish: [
          {
            "provider": "generic",
            "url": "http://www.ningning.cloud:3011/wechat/" // 被更新文件存放位置
          }
        ],//此处写入github 就好，不用添加其他内容
        extraResources: [
          {
            from: './static/dll',
            to: './static/dll',
            filter: ["**.dll"]
          },
          {
            from: './static/icon',
            to: './static/icon',
            filter: ["**.**"]
          }
        ],
        nsis: {
          "installerIcon": "./static/icon/icon.ico", // 安装图标
          "uninstallerIcon": "./static/icon/icon.ico", //卸载图标
          "installerHeaderIcon": "./static/icon/icon.ico",
          "shortcutName": "微信助手"
        }
      },
      fileAssociations: [
        {
          "name": "微信助手",
          "icon": "./static/icon/icon.ico"
        }
      ],
      mainProcessWatch: [
        'src/mainProcess'
      ],
      mainProcessArgs: [],
      externals: ['ffi-napi']
    },
    'style-resources-loader': {
      preProcessor: 'sass',
      patterns: [
        './src/render/assets/sass/index.sass'
      ]
    }
  }
};
