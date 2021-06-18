<template>
  <div class="login-container">
    <div class="login-gear">
      <img src="/img/login/gear-bg.png" class="gear-bg" />
      <img src="/img/login/gear-1.png" class="gear-1" />
      <img src="/img/login/gear-2.png" class="gear-2" />
      <img src="/img/login/gear-3.png" class="gear-3" />
      <img src="/img/login/gear-4.png" class="gear-4" />
    </div>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        用户登录
      </div>
      <el-form-item prop="loginName">
        <el-input
          ref="loginName"
          v-model="loginForm.loginName"
          placeholder="用户名"
          name="loginName"
          type="text"
          tabindex="1"
          auto-complete="on"
          suffix-icon="el-icon-user-solid"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="login()"
          suffix-icon="el-icon-lock"
        />
      </el-form-item>
      <div class="login-btn">
        <el-checkbox v-model="keepPassword">记住密码</el-checkbox>
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native="login()"
          >登录</el-button
        >
      </div>
      <div class="logoContainer"></div>
    </el-form>
  </div>
</template>

<script>
/*
 * @Author: 耿为刚 创建
 * @Date: 2020-04-20
 * @Last Modified by: gengweigang
 */
import { userEncryption } from '@/utils/utils'
export default {
  name: 'Login',
  data() {
    return {
      // 展示项目列表
      visible: false,
      loginForm: {
        loginName: '',
        password: ''
      },
      loginRules: {
        loginName: [{ required: true, trigger: 'blur', message: '必填' }],
        password: [{ required: true, trigger: 'blur', min: 6, message: '密码最少6位' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      // 项目列表
      projectList: [],
      keepPassword: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    // 登录
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 登录加密
          let params = userEncryption(this.loginForm)
          this.loading = true
          this.$store
            .dispatch('user/login', params)
            .then(() => {
              this.$router.push({ path: this.redirect || '/home' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../../styles/common.less');
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  .login-gear {
    width: 850px;
    height: 850px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      &.gear-1,
      &.gear-3 {
        animation: rotateAnimation 5s infinite;
      }
      &.gear-2,
      &.gear-4 {
        animation: rotateReversalAnimation 5s infinite;
      }
    }
    //animation: rotateScaleAnimation 5s infinite;
  }
  .login-form {
    margin-bottom: -260px;
    padding: 50px 50px 0;
    background: url('/img/login/login-form.png');
    width: 375px;
    height: 577px;
    .title-container {
      margin-bottom: 15px;
      text-align: center;
      color: #1daeeb;
    }
    /deep/.el-input {
      .el-input__inner {
        border: 1px #13acc4 solid;
        height: 40px;
        line-height: 40px;
        border-radius: 0;
      }
    }
    /deep/.el-checkbox__inner {
      border-color: #13acc4;
    }
    /deep/.el-checkbox__label {
      color: #13acc4;
    }
    .login-btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      /deep/.el-checkbox {
        display: flex;
        align-items: center;
      }
      button {
        margin: 0 !important;
        border: 1px #13acc4 solid;
        border-radius: 0;
        background: #156a86;
        width: 90px !important;
      }
    }
  }
}
.logoContainer {
  height: 50px;
  width: 250px;
  background: url('../../assets/images/white-logo.png') no-repeat center center;
  margin-top: 80px;
  background-size: 100% auto;
}
</style>
