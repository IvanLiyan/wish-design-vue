<template>
  <wt-form>
    <div>
      <p class="demo-form-title">形式一</p>
      <wt-form-item label="密码" helper="6-16个字符，请使用字母加数字的组合密码，不能包含*@#等符号" helper-placement="right">
        <wt-input type="password" />
      </wt-form-item>
    </div>
    <div>
      <p class="demo-form-title">形式二</p>
      <wt-form-item label="密码" helper="6-16个字符，请使用字母加数字的组合密码，不能包含*@#等符号">
        <wt-input type="password" />
      </wt-form-item>
    </div>
  </wt-form>
</template>
