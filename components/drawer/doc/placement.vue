<template>
  <div>
    <wt-button type="primary" @click="openTop">Top</wt-button>&nbsp;&nbsp;
    <wt-button type="primary" @click="openRight">Right</wt-button>&nbsp;&nbsp;
    <wt-button type="primary" @click="openBottom">Bottom</wt-button>&nbsp;&nbsp;
    <wt-button type="primary" @click="openLeft">Left</wt-button>
    <wt-drawer v-model="visible" :placement="placement" title="Basic Style">
      <div>
        <p>Wish is an American online e-commerce platform for transactions between sellers and buyers. </p>
        <p>Wish was founded in 2010 by Piotr Szulczewski (CEO) and Danny Zhang (former CTO).</p>
        <p>Wish is operated by ContextLogic Inc. in San Francisco, United States. </p>
        <p>The platform personalizes the shopping experience visually for each customer, rather than relying only on a search bar format. </p>
        <p>It allows sellers to list their products on Wish and sell directly to consumers.</p>
        <p>Wish works with payment service providers to handle payments and does not stock the products themselves or manage returns.</p>
      </div>
    </wt-drawer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      v: false,
      visible: false,
      placement: 'top',
    };
  },
  methods: {
    openTop () {
      this.visible = true;
      this.placement = 'top';
    },
    openRight () {
      this.visible = true;
      this.placement = 'right';
    },
    openBottom () {
      this.visible = true;
      this.placement = 'bottom';
    },
    openLeft () {
      this.visible = true;
      this.placement = 'left';
    },
  },
};
</script>
