/* Automatically generated by './build/bin/build-ts.js' */
import { Button } from './button';
import { Card } from './card';
import { Row } from './row';
import { Col } from './col';
import { Icon } from './icon';
import { ButtonGroup } from './button-group';
import { Input } from './input';
import { Radio } from './radio';
import { RadioGroup } from './radio-group';
import { Checkbox } from './checkbox';
import { CheckboxGroup } from './checkbox-group';
import { Switch } from './switch';
import { Tag } from './tag';
import { Dropdown } from './dropdown';
import { DropdownMenu } from './dropdown-menu';
import { DropdownMenuItem } from './dropdown-menu-item';
import { Popper } from './popper';
import { Datepicker } from './datepicker';
import { Timepicker } from './timepicker';
import { Form } from './form';
import { FormItem } from './form-item';
import { Select } from './select';
import { SelectInput } from './select-input';
import { Option } from './option';
import { OptionGroup } from './option-group';
import { Loading } from './loading';
import { Alert } from './alert';
import { Tab } from './tab';
import { TabDrop } from './tab-drop';
import { TabPane } from './tab-pane';
import { Confirm as WTConfirm } from './confirm';
import {
  Message as WTMessage,
  MessageOptions
} from './message';
import {
  Notification as WTNotification,
  NotificationOptions
} from './notification';
import { FormRule, FormRules } from './form';
import CollapseTransition from './collapse-transition';

export const Message: WTMessage;
export const Notification: WTNotification;
export const Confirm: WTConfirm;

export {
  Button,
  Card,
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
  Datepicker,
  Timepicker,
  Form,
  FormItem,
  Select,
  SelectInput,
  Option,
  OptionGroup,
  Loading,
  Alert,
  Tab,
  TabDrop,
  TabPane,
  FormRule,
  FormRules,
  NotificationOptions,
  MessageOptions,
  CollapseTransition,
};

export declare function install(vue: any): void;

declare module 'vue/types/vue' {
  interface Vue {
    $wt: {
      confirm: WTConfirm
      message: WTMessage
      notify: WTNotification
    }
  }
}
