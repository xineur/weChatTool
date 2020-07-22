<template>
<!-- 底部 -->
<v-footer
    app
    color="blue-grey"
    class="white--text"
>
  <span>Vuetify</span>
  <v-spacer></v-spacer>
  <span>&copy; {{ new Date().getFullYear() }}</span>
</v-footer>
<!-- 底部end -->
</template>

<script>
import {Component, Vue} from 'vue-property-decorator';

@Component({})
export default class Footer extends Vue {
}
</script>

<style scoped>

</style>
