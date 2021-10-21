
import { getConfig } from '@wish/wd-vue/es/utils/config';

var Manager = {
  open: function open(instance) {
    getConfig().addPopup(instance);
  },
  close: function close(instance) {
    getConfig().removePopup(instance);
  },


  nextZIndex: function nextZIndex() {
    return getConfig().getNextZIndex();
  },

  getLastPopup: function getLastPopup() {
    return getConfig().getLastPopup();
  }
};

window.addEventListener('keydown', function (event) {
  // keyCode is deprecated
  if (event.key === 'Escape' || event.keyCode === 27) {
    var topPopup = Manager.getLastPopup();
    if (topPopup) {
      topPopup.$emit('esc');
    }
  }
});
export default Manager;