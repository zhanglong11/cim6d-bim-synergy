<!--
 * @Description: 登录页
 * @Version:
 * @Autor:
 * @Date: 2020-03-12 11:46:41
 * @LastEditTime: 2020-03-12 15:13:17
 -->
<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>
      <el-form-item prop="loginName">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="loginName"
          v-model="loginForm.loginName"
          placeholder="用户名"
          name="loginName"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="showProject"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="showProject"
        >登录</el-button
      >
    </el-form>
    <el-dialog title="提示" :visible.sync="visible" width="860px">
      <div>
        <el-row :gutter="12">
          <el-col v-for="item in projectList" :key="item.id" :span="8" style="padding-top:6px">
            <el-card class="box-card" @click.native="selectProject(item)">
              <el-image :src="item.thumb"> </el-image>
              <div style="padding: 14px;">
                <span>{{ item.name }}</span>
                <div class="bottom clearfix">
                  <time class="time">{{ item.createTime }}</time>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </div>
</template>

<script>
import { getProjectList } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      // 展示项目列表
      visible: false,
      loginForm: {
        // loginName: process.env.VUE_APP_USERNAME,
        loginName: 'laotan',
        password: '123456'
      },
      loginRules: {
        loginName: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', min: 6, message: '密码最少6位' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      // 项目列表
      projectList: []
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
  created() {
    // this.getProject()
  },
  methods: {
    selectProject(item) {
      this.visible = false
      localStorage.setItem('projectId', item.id)
      localStorage.setItem('projectType', item.type)
      localStorage.setItem('projectName', item.name)
      localStorage.setItem('lng', item.longitude)
      localStorage.setItem('lat', item.latitude)
      this.$router.push({ path: this.redirect || '/' })
    },
    async getProject() {
      let res = await getProjectList({})
      this.projectList = res.data
      this.visible = true
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    showProject() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.getProject()
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    handleSubmit() {
      this.loading = true
      this.$store
        .dispatch('user/login', this.loginForm)
        .then(() => {
          this.$router.push({ path: this.redirect || '/' })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="less">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
.login-container .el-dialog__body {
  max-height: 500px;
  overflow-y: scroll;
}
.box-card {
  cursor: pointer;
  .el-image {
    width: 100%;
    height: 200px;
  }
}

@bg: #283443;
@light_gray: #fff;
@cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: @cursor)) {
  .login-container .el-input input {
    color: @cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: @light_gray;
      height: 47px;
      caret-color: @cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px @bg inset !important;
        -webkit-text-fill-color: @cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    margin-bottom: 40px;
    .el-form-item__error {
      margin-top: 10px;
    }
  }
}
</style>

<style lang="less" scoped>
.login-container {
  /deep/ .el-dialog {
    background-color: #fff;
  }
  /deep/ .el-image {
    .el-image__error,
    .el-image__placeholder {
      background-color: #f5f7fa;
      color: #c0c4cc;
    }
  }
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
.image-slot {
  font-size: 30px;
}
@bg: #2d3a4b;
@dark_gray: #889aa4;
@light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: @bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: @dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: @light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: @dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
