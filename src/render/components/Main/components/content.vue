<template>
    <v-container
        fluid
        class="pa-0 overflow-hidden fill-height"
        flex="1"
    >
      <router-view></router-view>
    </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({})
export default class Content extends Vue {
}
</script>

<style scoped>

</style>
