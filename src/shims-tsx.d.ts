import Vue, { VNode } from 'vue'
declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {
      $api: any;
    }
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
  namespace NodeJS {
    interface Global {
      __static: string;
    }
  }
}
