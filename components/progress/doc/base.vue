<template>
    <div class="demo-box">
      <wt-progress :percentage="75" class="progress-base" />
      <wt-progress :percentage="75" class="progress-base" text="custom" />
      <wt-progress :percentage="100" class="progress-base" status="success" />
      <wt-progress :percentage="75" class="progress-base" status="error" />
    </div>
</template>
