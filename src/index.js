/* Automatically generated by './build/bin/build-entry.js' TODO 打开下面注释 */
import Button from 'components/button';
import Row from 'components/row';
import Col from 'components/col';
import Icon from 'components/icon';
import ButtonGroup from 'components/button-group';
import Input from 'components/input';
import Radio from 'components/radio';
import RadioGroup from 'components/radio-group';
import Checkbox from 'components/checkbox';
import CheckboxGroup from 'components/checkbox-group';
import Switch from 'components/switch';
import Tag from 'components/tag';
import Dropdown from 'components/dropdown';
import DropdownMenu from 'components/dropdown-menu';
import DropdownMenuItem from 'components/dropdown-menu-item';
import Popper from 'components/popper';
import CollapseTransition from './transitions/collapse-transition';

const components = [
  Button,
  Row,
  Col,
  Icon,
  ButtonGroup,
  Input,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Switch,
  Tag,
  Dropdown,
  DropdownMenu,
  DropdownMenuItem,
  Popper,
  CollapseTransition,
];

export function install (Vue) {
  components.map(function (component) {
    Vue.component(component.name, component);
  });

  const $wt = {
    // confirm: Confirm,
    // notify: Notification,
    // message: Message,
  };

  if (Vue.prototype) Vue.prototype.$wt = $wt;
  if (Vue.config.globalProperties) Vue.config.globalProperties.$wt = $wt;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  Button,
  Row,
  Col,
  Icon,
  ButtonGroup,
  Input,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Switch,
  Tag,
  Dropdown,
  DropdownMenu,
  DropdownMenuItem,
  Popper,
  CollapseTransition,
};

export default {
  version: '0.0.1-alpha.6',
  install,
};
