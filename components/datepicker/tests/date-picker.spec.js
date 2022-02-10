import {
  createDemoTest,
  mount,
  destroyVM,
  waitImmediate,
  triggerClick,
} from '@test/util';
const DemoContexts = require.context('./demo', true, /\.vue$/);
const DocContexts = require.context('../doc', true, /\.vue$/);
import { DatePicker } from '@/index';
import { RANGE_SEPARATOR } from '@/utils/date';

import { isArray } from '@/utils/type';
import dayjs from 'dayjs';

describe('DatePicker', function () {
  createDemoTest(DemoContexts);
  createDemoTest(DocContexts);
  let vm;
  afterEach(() => {
    destroyVM(vm);
  })

  describe('should display input when default value', function () {
    const valueCases = {
      'string': {
        type: 'date',
        value: '2020-04-01'
      },
      'string-array': {
        type: 'daterange',
        value: ['2020-04-01', '2021-04-01'],
      },
      'date': {
        type: 'date',
        value: '2020-04-01'
      },
      'string-array': {
        type: 'daterange',
        value: ['2020-04-01', '2021-04-01'],
      },
    }
    Object.keys(valueCases).forEach((title) => {
      const useCase = { ...valueCases[title] };
      it (`type '${title}'`, async function () {
        const valueStr = isArray(useCase.value) ? useCase.value.join(RANGE_SEPARATOR) : useCase.value;
        if (title.indexOf('date') !== -1) {
          let value = useCase.value;
          if (isArray(value)) {
            value = value.map((v) => dayjs(v, 'yyyy-MM-dd').toDate());
          } else {
            value = dayjs(value, 'yyyy-MM-dd').toDate();
          }
          useCase.value = value;
        }
        vm = mount(DatePicker, { props: useCase, attrs: useCase });
        const input = vm.$el.querySelector('.wt-input');
        expect(input.value).to.be.eql(valueStr, useCase.value);
      });
    });
    it ('type is week', async function () {
      const props = {
        value: dayjs('2021-04-01 12:00:00', 'yyyy-MM-dd HH:mm:ss').toDate(),
        format: 'yyyy年WW周'
      }
      vm = mount(DatePicker, { props: props, attrs: props });
      const input = vm.$el.querySelector('.wt-input');
      expect(input.value).to.be.eql('2021年13周');
    });
  });

  describe('should emit input event ', function () {
    const rangeType = ['daterange', 'monthrange', 'weekrange', 'yearrange'];
    const startDay = dayjs('2021-04-06 12:00:00', 'yyyy-MM-dd HH:mm:ss');
    const expectDay = dayjs('2021-04-01 12:00:00', 'yyyy-MM-dd HH:mm:ss');
    function click0401 () {
      const day0401 = document.querySelector('.wt-date-picker-cells-cell:nth-child(5)'); // 2021-04-01
      expect(day0401.innerText).to.be.eql('1');
      triggerClick(day0401);
    }
    function click0408 () {
      const day0408 = document.querySelector('.wt-date-picker-cells-cell:nth-child(12)'); // 2021-04-08
      expect(day0408.innerText).to.be.eql('8');
      triggerClick(day0408);
    }

    it('type \'date\'', async function () {
      const props = {
        type: 'date',
        value: startDay.toDate(),
        startDate: startDay.toDate(),
      };
      const handleInput = sinon.spy();
      const events = {
        input: handleInput,
      }
     vm = mount(DatePicker, {
        props: props,
        attrs: props,
        on: events,
      });
      vm.$children[0].focus(); // open date picker
      await waitImmediate();
      click0401();
      await waitImmediate();
      handleInput.should.have.been.calledOnce();
      const spyCall = handleInput.getCall(0);
      const callDay = dayjs(spyCall.args[0]);
      expect(callDay.isSame(expectDay, 'day'), 'exepct input date value is 2021-04-01 ').to.be.true();
    });
    it('type \'daterange\'', async function () {
      const props = {
        type: 'daterange',
        value: [startDay.toDate(), startDay.add(7, 'd').toDate()],
        startDate: startDay.toDate(),
      };
      const handleInput = sinon.spy();
      const events = {
        input: handleInput,
      }
     vm = mount(DatePicker, {
        props: props,
        attrs: props,
        on: events,
      });
      vm.$children[0].focus(); // open date picker
      await waitImmediate();
      click0401();
      await waitImmediate();
      click0408();
      await waitImmediate();
      handleInput.should.have.been.calledOnce();
      const spyCall = handleInput.getCall(0);
      const callDay = dayjs(spyCall.args[0]);

    });
  });
});
