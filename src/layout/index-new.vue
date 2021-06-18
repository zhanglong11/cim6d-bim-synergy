<!--
  * @任务编号: task#2885 【智慧施工2.0-前端】首页切图及功能开发
  * @开发人员: 耿为刚
  * @日期: 2020-04-10
  * @任务类型: 新代码
-->
<template>
  <div class="layout-main">
    <Navbar v-if="showNav"></Navbar>
    <div class="content-wrap">
      <router-view :key="key"></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar-new'
export default {
  name: 'LayoutNew',
  components: { Navbar },
  data() {
    return {
      showNav: true // 是否显示导航
    }
  },
  watch: {
    $route() {
      this.initNav()
    }
  },
  computed: {
    key() {
      let pathRoute = this.$route.path
      return pathRoute
    }
  },
  mounted() {
    this.initNav()
  },
  methods: {
    // 初始化导航
    initNav() {
      let pathRoute = this.$route.path
      if (pathRoute === '/home') {
        document.body.style.background = `url(${require('../views/construction/images/map/cloud-bg2.png')}) center`
        document.body.style.backgroundSize = 'cover'
        this.$store.commit('setSystemConfigStorage')
      } else if (pathRoute === '/login') {
        document.body.style.background = `url('/img/login/login-bg.png') center`
        document.body.style.backgroundSize = 'cover'
      } else {
        document.body.style.background = `url('/img/main.jpg') center #030e20`
        document.body.style.backgroundSize = 'cover'
      }
    },
    // 监听窗口改变
    onresize() {
      document.getElementsByClassName('layout-main')[0].style.transform = ''
      this.$nextTick(() => {
        let clientWidth = document.documentElement.clientWidth
        let clientHeight = document.documentElement.clientHeight
        window.onresize = () => {
          // 定义窗口大小变更通知事件
          clientWidth = document.documentElement.clientWidth //窗口宽度
          clientHeight = document.documentElement.clientHeight //窗口高度
          this.changeLayoutMain(clientWidth, clientHeight)
        }
        this.changeLayoutMain(clientWidth, clientHeight)
      })
    },
    // 自动缩放
    changeLayoutMain(clientWidth, clientHeight) {
      const defaultWidth = 1920
      let layoutMain = document.getElementsByClassName('layout-main')
      let mainHeight = layoutMain[0].clientHeight
      let proportion = clientWidth / defaultWidth
      if (clientHeight < mainHeight) {
        proportion = clientHeight / mainHeight
      }
      if (clientWidth < defaultWidth || clientHeight < mainHeight) {
        layoutMain[0].style.transform = `scale(${proportion})`
      } else {
        layoutMain[0].style.transform = ''
      }
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
.content-wrap {
  padding-top: 32px;
}
</style>
