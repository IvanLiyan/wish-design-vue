/* Automatically generated by './build/bin/build-entry.js' TODO 打开下面注释 */
import Button from './components/button';
import Card from './components/card';
import Row from './components/row';
import Col from './components/col';
import Icon from './components/icon';
import ButtonGroup from './components/button-group';
import Input from './components/input';
import Radio from './components/radio';
import RadioGroup from './components/radio-group';
import Checkbox from './components/checkbox';
import CheckboxGroup from './components/checkbox-group';
import Switch from './components/switch';
import Tag from './components/tag';
import Dropdown from './components/dropdown';
import DropdownMenu from './components/dropdown-menu';
import DropdownMenuItem from './components/dropdown-menu-item';
import Popper from './components/popper';
import Datepicker from './components/datepicker';
import Timepicker from './components/timepicker';
import Form from './components/form';
import FormItem from './components/form-item';
import Notification from './components/notification';
import Select from './components/select';
import Option from './components/option';
import OptionGroup from './components/option-group';
import Loading from './components/loading';
import Upload from './components/upload';
import Alert from './components/alert';
import Tab from './components/tab';
import TabDrop from './components/tab-drop';
import TabPane from './components/tab-pane';
import CollapseTransition from './transitions/collapse-transition';

var components = [Button, Card, Row, Col, Icon, ButtonGroup, Input, Radio, RadioGroup, Checkbox, CheckboxGroup, Switch, Tag, Dropdown, DropdownMenu, DropdownMenuItem, Popper, Datepicker, Timepicker, Form, FormItem, Notification, Select, Option, OptionGroup, Loading, Upload, Alert, Tab, TabDrop, TabPane, CollapseTransition];

export function install(Vue) {
  components.map(function (component) {
    Vue.component(component.name, component);
  });

  var $wt = {
    // confirm: Confirm,
    notify: Notification
    // message: Message,
  };

  if (Vue.prototype) Vue.prototype.$wt = $wt;
  if (Vue.config.globalProperties) Vue.config.globalProperties.$wt = $wt;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export { Button, Card, Row, Col, Icon, ButtonGroup, Input, Radio, RadioGroup, Checkbox, CheckboxGroup, Switch, Tag, Dropdown, DropdownMenu, DropdownMenuItem, Popper, Datepicker, Timepicker, Form, FormItem, Notification, Select, Option, OptionGroup, Loading, Upload, Alert, Tab, TabDrop, TabPane, CollapseTransition };

export default {
  version: '0.0.2-alpha.18',
  install: install
};