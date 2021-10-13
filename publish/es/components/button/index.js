import Button from './button';
import ButtonGroup from './button-group';

/* istanbul ignore next */
Button.install = function (Vue) {
  Vue.component(Button.name, Button);
};

export default Button;
export { Button, ButtonGroup };