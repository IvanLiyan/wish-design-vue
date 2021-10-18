
import { getConfig } from '@/utils/config';

const Manager = {
  open (instance) {
    getConfig().addPopup(instance);
  },

  close (instance) {
    getConfig().removePopup(instance);
  },

  nextZIndex: function () {
    return getConfig().getNextZIndex();
  },

  getLastPopup () {
    return getConfig().getLastPopup();
  },
};

window.addEventListener('keydown', function (event) {
  // keyCode is deprecated
  if (event.key === 'Escape' || event.keyCode === 27) {
    const topPopup = Manager.getLastPopup();
    if (topPopup) {
      topPopup.$emit('esc');
    }
  }
});
export default Manager;
