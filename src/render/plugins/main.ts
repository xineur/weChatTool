import module from './tool';
const myPlugin: any = {};

myPlugin.install = (Vue: any) => {
  Object.keys(module).forEach((m, i) => {
    Vue.prototype[`$${m}`] = Object.values(module)[i];
  });
};
export default myPlugin
