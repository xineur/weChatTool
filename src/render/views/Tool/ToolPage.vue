<template>
<v-row align="center" >
  <v-item-group
      v-model="window"
      class="shrink ml-2"
      mandatory
      tag="v-flex"
  >
    <v-item
        v-for="n in tooltip"
        :key="n.index"
        v-slot:default="{ active, toggle }"
    >
      <div>
        <v-tooltip right>
          <template v-slot:activator="{ attrs, on }">
            <v-list-item-avatar class="avatar off-drag" v-bind="attrs" v-on="on">
              <v-btn
                  :input-value="active"
                  icon
                  @click="toggle"
              >
                <v-icon>mdi-record</v-icon>
              </v-btn>
            </v-list-item-avatar>
          </template>
          <span>{{n.title}}</span>
        </v-tooltip>
      </div>
    </v-item>
  </v-item-group>

  <v-col>
    <v-window
        v-model="window"
        class="elevation-1"
        vertical
    >
      <v-window-item
          v-for="n in tooltip"
          :key="n.index"
      >
        <v-card>
          <v-responsive :aspect-ratio="10/9">
            <v-card-text>
              <div>1111</div>This card will always be 16:9 (unless you put more stuff in it)
            </v-card-text>
          </v-responsive>
        </v-card>
      </v-window-item>
    </v-window>
  </v-col>
</v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ToolTip } from "@/interface/views";

@Component({})
export default class ToolPage extends Vue {
  private length = 3;
  private tooltip: ToolTip[] = [
    {
      index: 0,
      title: '基础设置',
      active: 'basics'
    },
    {
      index: 1,
      title: '回复设置',
      active: 'reply'
    },
    {
      index: 2,
      title: '高级设置',
      active: 'advanced'
    },
  ];
  private window = 0;
}
</script>

<style scoped>

</style>
