<template>
  <wt-stepper :active="2" dot>
    <wt-step title="步骤 1" description="这是点状步骤条中关于此步骤的具体描述" />
    <wt-step status="process" title="步骤 2" description="这是点状步骤条中关于此步骤的具体描述" />
    <wt-step status="error" title="步骤 3" description="这是点状步骤条中关于此步骤的具体描述" />
    <wt-step title="步骤 4" description="这是点状步骤条中关于此步骤的具体描述" />
    <wt-step title="步骤 5" description="这是点状步骤条中关于此步骤的具体描述" />
  </wt-stepper>
</template>
