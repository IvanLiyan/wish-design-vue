import Tag from './tag';
/* istanbul ignore next */
Tag.install = function (Vue) {
  Vue.component(Tag.name, Tag);
};
export default Tag;