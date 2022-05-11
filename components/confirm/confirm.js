import Vue from 'vue';
import confirmVue from './confirm.vue';
import { isVNode } from '@/utils/vnode';
import { isPromise } from '@/utils/type';
import { getConfig } from '@/utils/config';

const ConfirmConstructor = Vue.extend(confirmVue);
export const instances = [];

let seed = 0;
function remove(id) {
  let index = -1;
  for (let i = 0; i < instances.length; i++) {
    if (instances[i].id === id) {
      index = i;
      break;
    }
  }
  if (index > -1) {
    instances.splice(index, 1);
  }
}

const Confirm = (options) => {
  return new Promise((resolve, reject) => {
    const id = 'confirm_' + seed++;

    options = options || {};
    if (typeof options === 'string') {
      options = {
        message: options,
      };
    }

    const data = {
      ...options,
      onOk: function (params) {
        const result = options.onOk && options.onOk(params);
        const promise = isPromise(result) ? result : Promise.resolve(params);
        return promise
          .then(function (r) {
            remove(id);
            return r;
          })
          .then(resolve);
      },
      onCancel: function (params) {
        const result = options.onCancel && options.onCancel(params);
        const promise = isPromise(result) ? result : Promise.resolve(params);
        return promise
          .then(function (r) {
            remove(id);
            r.$$wt = true;
            return r;
          })
          .then(reject);
      },
    };
    const instance = new ConfirmConstructor({
      data: data,
    });
    instance.id = id;
    if (isVNode(data.message)) {
      instance.$slots.default = [options.message];
      instance.message = null;
    }
    // see https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/41067412
    options.onCreate && options.onCreate(instance, options);
    instance.$mount();
    const { getPopupContainer } = options;
    const parent = (getPopupContainer || getConfig().getPopupContainer)();
    parent.appendChild(instance.$el);
    instances.push(instance);
    Vue.nextTick(() => {
      instance.visible = true;
    });
  });
};

Confirm.closeAll = function () {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].handleCancel();
  }
  instances.splice(0, instances.length);
};

Confirm.COMPONENT = confirmVue;

export default Confirm;
export { Confirm };
