<template>
  <div>
    <div class="demo-input-group">
      <wt-input placeholder="邮箱" />
      <wt-input type="line" placeholder="邮箱" />
    </div>
    <div class="demo-input-group">
      <wt-input label="邮箱" placeholder="如xxx@gmail.com" />
      <wt-input label="邮箱" type="line" placeholder="如xxx@gmail.com" />
    </div>

    <div class="demo-input-group">
      <wt-input placeholder="用户名">
        <wt-icon name="user" slot="prefix" />
      </wt-input>
      <wt-input placeholder="用户名">
        <wt-icon name="eye" slot="suffix" />
      </wt-input>
      <wt-input type="line" placeholder="用户名">
        <wt-icon name="user" slot="prefix" />
      </wt-input>
      <wt-input type="line" placeholder="用户名">
        <wt-icon name="eye" slot="suffix" />
      </wt-input>
    </div>

    <div class="demo-input-group">
      <wt-input placeholder="金额">
        <span slot="prefix">¥</span>
      </wt-input>
      <wt-input placeholder="金额">
        <span slot="suffix">RMB</span>
      </wt-input>
      <wt-input type="line" placeholder="金额">
        <span slot="prefix">¥</span>
      </wt-input>
      <wt-input type="line" placeholder="金额">
        <span slot="suffix">RMB</span>
      </wt-input>
    </div>

    <div class="demo-input-group">
      <wt-input placeholder="用户名" clearable>
        <wt-icon name="user" slot="prefix" />
      </wt-input>
      <wt-input placeholder="用户名" clearable>
        <wt-icon name="eye" slot="suffix" />
      </wt-input>
      <wt-input type="line" placeholder="用户名" clearable>
        <wt-icon name="user" slot="prefix" />
      </wt-input>
      <wt-input type="line" placeholder="用户名" clearable>
        <wt-icon name="eye" slot="suffix" />
      </wt-input>
    </div>
  </div>
</template>
