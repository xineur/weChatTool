<template>
<!-- 侧边栏 -->
  <v-list
      dense
      nav
      class="py-0"
  >
    <v-list-item two-line :class="miniVariant && 'px-0'">

      <v-tooltip right>
        <template v-slot:activator="{ attrs, on }">
          <v-list-item-avatar class="avatar off-drag" @click="goHome"  v-bind="attrs" v-on="on">
            <img :src="src">
          </v-list-item-avatar>
        </template>
        <span v-if="userInfo">{{userInfo.nick || '未登录'}}</span>
      </v-tooltip>
      <v-list-item-content>
        <v-list-item-title>未登录</v-list-item-title>
        <v-list-item-subtitle>null</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list-item-group v-model="active" mandatory>
      <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          class="off-drag" @click="router(item.href)"
      >
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-icon
                v-bind="attrs"
                v-on="on">
              <v-icon class="tab-icon">{{ item.icon }}</v-icon>
            </v-list-item-icon>
          </template>
          <span>{{item.title}}</span>
        </v-tooltip>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
<!-- 侧边栏 -->
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { NavigationItem } from "@/interface/views";
import { State } from "vuex-class";
import { UserInfo, WeChatParam } from "@/interface/vuexInterface";
import { STATUS_CODE } from "@/enum/weChat";
import routers from "~/router/routes";
import config from "@/config/config";

@Component({})
export default class Navigation extends Vue {
  private drawer = false;
  private src: any = require("~a/image/icon.png");
  private userInfo: UserInfo = {
    city: "",
    country: "",
    headimg132: "",
    headimg959: "",
    mail: "",
    mobile: "",
    nick: "",
    province: "",
    wx_code: "",
    wxid: "",
  };
  private active = -1;
  private items: NavigationItem[] = [];
  private color = 'blue';
  private colors: string[] = [
    'primary',
    'blue',
    'success',
    'red',
    'teal',
  ];
  private right = false;
  private permanent = true;
  private miniVariant = true;
  private expandOnHover = false;
  private background = true;
  @State("WeChatParams") private WeChatParams!: WeChatParam;
  @Watch("WeChatParams.count", {
    immediate: true
  })
  private getWeChatParams (): void {
    if (this.WeChatParams.type === STATUS_CODE.PERSONAL_INFO) {
      this.userInfo = (this.WeChatParams.content as UserInfo);
      this.src = (this.WeChatParams.content as UserInfo).headimg959
    }
  }
  public created(): void {
    this.init();
  }
  private init() {
    routers.map(m => {
      if (m.meta && m.meta.showChild) {
        m.children && m.children.map(n => {
          if(!n.meta.hide) {
            this.items.push({
              title: n.meta.title,
              icon: n.meta.icon,
              href: n.name || ""
            })
          }
        })
      } else if (m.meta) {
        this.items.push({
          title: m.meta.title,
          icon: m.meta.icon,
          href: m.name || ""
        })
      }
    });
    this.active = this.items.findIndex(m => m.href === this.$route.name);
  }
  private router (href: string): void {
    if (href === this.$route.name) {
      return;
    }
    this.$router.push({
      name: href
    });
    this.active = this.items.findIndex(m => m.href === this.$route.name);
  }
  private goHome (): void {
    this.router(config.home)
  }
}
</script>

<style scoped lang="sass">
.tab-icon
  font-size: 22px
  color: #f1f1f1
</style>
