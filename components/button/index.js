import Button from './button.vue';
import ButtonGroup from './button-group.vue';

/* istanbul ignore next */
Button.install = function (Vue) {
  Vue.component(Button.name, Button);
};

export default Button;
export {
  Button,
  ButtonGroup,
};
