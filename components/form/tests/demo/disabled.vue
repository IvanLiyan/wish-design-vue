<template>
  <div>
    <Form disabled>
      <Input ref="input1" />
      <Input ref="input2" :disabled="false" />
      <FormItem>
        <Input ref="input3" />
      </FormItem>
    </Form>
    <Form>
      <FormItem>
        <Input ref="input4" />
        <Input ref="input5" disabled />
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { Form, FormItem, Input } from '@/index';
import { findVM } from '@test/util';

export default {
  components: {
    Form,
    FormItem,
    Input,
  },
  methods: {
    assertDisabled (vm, disabled, message) {
      const input = findVM(vm, { name: 'Input' });
      expect(input.disabled).to.be.eql(disabled, message);
      const inputEl = input.$el.querySelector('input');
      expect(inputEl.disabled).to.be.eql(disabled, `input element should be ${disabled}`);
    },
    doTest (done) {
      const { input1, input2, input3, input4, input5 } = this.$refs;
      this.assertDisabled(input1, true, 'input1 should inherit Form.disabled');
      this.assertDisabled(input2, false, 'input2 should use input.disabled');
      this.assertDisabled(input3, true, 'input3 should inherit Form.disabled');
      this.assertDisabled(input4, false, 'input4');
      this.assertDisabled(input5, true, 'input5');
      done();
    },
  },
};
</script>
