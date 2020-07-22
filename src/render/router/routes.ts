import { RouteConfig } from "vue-router";
import Main from '~c/Main/index.vue'

const routes: Array<RouteConfig> = [
  { path: '/', redirect: '/sendMsg' },
  {
    path: '/',
    name: 'Home',
    component: Main,
    meta: {
      showChild: true
    },
    children: [
      {
        path: '/home',
        name: 'HomePage',
        meta: {
          hide: true
        },
        component: () => import(/* webpackChunkName: "Home" */ "../views/Home/index.vue")
      },
      // {
      //   path: '/tool',
      //   name: 'Tool',
      //   meta: {
      //     title: '设置',
      //     icon: 'we-tool'
      //   },
      //   component: () => import(/* webpackChunkName: "ToolPage" */ "../views/Tool/ToolPage.vue")
      // },
      {
        path: '/sendMsg',
        name: 'SendMsg',
        meta: {
          title: '群发消息',
          icon: 'we-sendMsg'
        },
        component: () => import(/* webpackChunkName: "SendMsgPage" */ "../views/SendMsg/SendMsgPage.vue")
      },
      {
        path: '/about',
        name: 'About',
        meta: {
          title: '关于',
          icon: 'we-about'
        },
        component: () => import(/* webpackChunkName: "SendMsgPage" */ "../views/About/AboutPage.vue")
      }
    ]
  }
];


export default routes
