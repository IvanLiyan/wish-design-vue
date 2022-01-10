<template>
  <div>
    <Form ref="form" :model="data">
      <FormItem prop="input1" required>
        <Input :value="data.input1" />
      </FormItem>
      <FormItem prop="input2" required>
        <Input :value="data.input2" />
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { Form, FormItem, Input } from '@/index';
import { waitImmediate, wait } from '@test/util';

export default {
  components: {
    Form,
    FormItem,
    Input,
  },
  data () {
    return {
      data: {
        input1: '',
        input2: '',
      },
    };
  },
  methods: {
    async doTest (done) {
      const { form } = this.$refs;
      try {
        await form.validator((valid, errors) => {
          expect(valid).to.be.eql(false, 'not set any value, form must not pass the verification');
        });
      } catch (errors) {}

      this.data.input1 = 'xxxx';
      await waitImmediate();

      form.validateFields('input1', (valid, errors) => {
        expect(valid).to.be.eql(true, 'only validate input1, it must pass the verification');
      });
      await wait(200);

      form.validateFields(['input1', 'input2'], (valid, errors) => {
        expect(valid).to.be.eql(false, 'validate input1, input2, it must not pass the verification');
      });
      await wait(200);

      this.data.input2 = 'xxx';
      await waitImmediate();
      form.validateFields(['input1', 'input2'], (valid, errors) => {
        expect(valid).to.be.eql(true, 'must not pass the verification');
      });
      await wait(200);

      done();
    },
  },
};
</script>
