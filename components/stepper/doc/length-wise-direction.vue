<template>
  <div style="width: 200px; text-align: left">
    <div style="height: 350px">
      <wt-stepper :active="1" direction="vertical" :space="100">
        <wt-step title="Step 1" description="This is a detailed description of this step" />
        <wt-step title="Step 2" description="This is a detailed description of this step" />
        <wt-step title="Step 3" description="This is a detailed description of this step" />
      </wt-stepper>
    </div>
  </div>
</template>
