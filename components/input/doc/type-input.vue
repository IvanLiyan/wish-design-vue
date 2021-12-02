<template>
  <div>
    <div class="demo-input-group">
      <wt-input placeholder="email" />
      <wt-input type="line" placeholder="email" />
    </div>
    <div class="demo-input-group">
      <wt-input label="email" placeholder="xxx@gmail.com" />
      <wt-input label="email" type="line" placeholder="xxx@gmail.com" />
    </div>

    <div class="demo-input-group">
      <wt-input placeholder="user name">
        <wt-icon name="user" slot="prefix" />
      </wt-input>
      <wt-input placeholder="user name">
        <wt-icon name="eye" slot="suffix" />
      </wt-input>
      <wt-input type="line" placeholder="user name">
        <wt-icon name="user" slot="prefix" />
      </wt-input>
      <wt-input type="line" placeholder="user name">
        <wt-icon name="eye" slot="suffix" />
      </wt-input>
    </div>

    <div class="demo-input-group">
      <wt-input placeholder="money">
        <span slot="prefix">¥</span>
      </wt-input>
      <wt-input placeholder="money">
        <span slot="suffix">RMB</span>
      </wt-input>
      <wt-input type="line" placeholder="money">
        <span slot="prefix">¥</span>
      </wt-input>
      <wt-input type="line" placeholder="money">
        <span slot="suffix">RMB</span>
      </wt-input>
    </div>

    <div class="demo-input-group">
      <wt-input placeholder="user name" clearable>
        <wt-icon name="user" slot="prefix" />
      </wt-input>
      <wt-input placeholder="user name" clearable>
        <wt-icon name="eye" slot="suffix" />
      </wt-input>
      <wt-input type="line" placeholder="user name" clearable>
        <wt-icon name="user" slot="prefix" />
      </wt-input>
      <wt-input type="line" placeholder="user name" clearable>
        <wt-icon name="eye" slot="suffix" />
      </wt-input>
    </div>
  </div>
</template>
