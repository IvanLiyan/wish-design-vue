import Vue from 'vue';
import Main from './notification.vue';
import { isVNode } from '@/utils/vnode';
import { PopupManage } from '@/utils/popper';
import { getConfig } from '@/utils/config';

const NotificationConstructor = Vue.extend(Main);

const instances = [];
let seed = 1;
// notification的间隔距离px
const spacing = 12;

const Notification = function (options) {
  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options,
    };
  }
  const userOnClose = options.onClose;
  const id = 'notification_' + seed++;
  const position = options.position || 'top-right';

  options.onClose = function () {
    Notification.close(id, userOnClose);
  };
  const instance = new NotificationConstructor({
    data: options,
  });

  if (isVNode(options.message)) {
    instance.$slots.default = [options.message];
    instance.message = 'REPLACED_BY_VNODE';
  }
  instance.id = id;
  instance.$mount();

  const { getPopupContainer } = options;
  const parent = (getPopupContainer || getConfig().getPopupContainer)();
  parent.appendChild(instance.$el);

  instance.visible = true;
  instance.dom = instance.$el;
  instance.dom.style.zIndex = PopupManage.nextZIndex();
  PopupManage.open(instance);

  let verticalOffset = options.offset || 0;
  instances
    .filter((item) => item.position === position)
    .forEach((item) => {
      verticalOffset += item.$el.offsetHeight + spacing;
    });
  verticalOffset += spacing;
  instance.verticalOffset = verticalOffset;
  instances.push(instance);
  return instance;
};

['success', 'warning', 'info', 'error'].forEach((type) => {
  Notification[type] = (options) => {
    if (typeof options === 'string' || isVNode(options)) {
      options = {
        message: options,
      };
    }
    options.type = type;
    return Notification(options);
  };
});

Notification.close = function (id, userOnClose) {
  let index = -1;
  const len = instances.length;
  const instance = instances.filter((instance, i) => {
    if (instance.id === id) {
      index = i;
      return true;
    }
    return false;
  })[0];
  if (!instance) return;
  PopupManage.close(instance);

  if (typeof userOnClose === 'function') {
    userOnClose(instance);
  }
  instances.splice(index, 1);

  if (len <= 1) return;
  const position = instance.position;
  const removedHeight = instance.dom.offsetHeight;
  for (let i = index; i < len - 1; i++) {
    if (instances[i].position === position) {
      instances[i].dom.style[instance.verticalProperty] =
        parseInt(instances[i].dom.style[instance.verticalProperty], 10) - removedHeight - spacing + 'px';
    }
  }
};

Notification.closeAll = function () {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
};

Notification.com = Main;
export default Notification;
