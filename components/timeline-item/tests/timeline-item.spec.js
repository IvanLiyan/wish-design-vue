import { mount } from '@vue/test-utils';
import TiemlineItem from '../index';

describe('TiemlineItem', function () {
  it('create', () => {
    const wrapper = mount(TiemlineItem);
    expect(wrapper.vm).to.exist;
  });
});
