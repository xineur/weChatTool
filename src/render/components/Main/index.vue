<template>
  <v-app>
    <v-navigation-drawer
        app
        class="on-drag"
        :value="navigation.value"
        :color="color"
        :expand-on-hover="navigation.expandOnHover"
        :mini-variant="navigation.miniVariant"
        :right="navigation.right"
        :permanent="navigation.permanent"
    >
      <Navigation></Navigation>
    </v-navigation-drawer>

    <v-main class="overflow-y-hidden main">
      <v-app-bar app class="accent-4 on-drag" elevation="0" flex="0" dense color="f9f9f9" >
        <v-spacer></v-spacer>
        <Title></Title>
      </v-app-bar>
      <Content></Content>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";
import { namespace } from 'vuex-class';
import { Navigation } from '@/interface/vuexInterface';

const MainStore = namespace("main");

@Component({
  components: {
    Title: () => import('./components/title.vue'),
    Navigation: () => import('./components/navigation.vue'),
    Content: () => import('./components/content.vue'),
    Footer: () => import('./components/footer.vue'),
  }
})
export default class Main extends Vue {
  private drawer = true;
  @MainStore.State("navigation") navigation!: Navigation;
  @MainStore.State("color") color!: string;
  @Emit("setDrawer")
  private setDrawer (drawer: boolean) {
    console.log(drawer);
    this.drawer = drawer
  }
  created(): void {
    console.log(this.navigation)
  }
}
</script>

<style scoped lang="sass">
.main
  height: 100%
</style>
