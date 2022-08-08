<template>
  <div>
    <wt-stepper :active="1">
      <wt-step title="Success" />
      <wt-step status="cancel" title="Undo" />
      <wt-step title="Step 3" />
    </wt-stepper>
    <br />
    <wt-stepper :active="1">
      <wt-step title="Success" />
      <wt-step status="error" title="Fail" />
      <wt-step title="Step 3" />
    </wt-stepper>
  </div>
</template>
