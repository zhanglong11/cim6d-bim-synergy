<template>
  <div class="main">
    <img class="logo" src="/img/logo.png" @click="toUrl('/')" />
    <img v-if="!hideMenu && showLogo" class="logo" src="/img/white-logo.png" @click="toUrl('/')" />
    <div class="menu">
      <ul v-if="!hideMenu">
        <template v-for="(items, i) in routes[0].children">
          <li :key="i" v-if="!items.hidden" :class="{ active: `/${items.path}` === activeMenu }">
            <el-dropdown v-if="items.children">
              <span class="title" @click="toUrl(`/${items.path}`)">{{ items.meta.title }}</span>
              <el-dropdown-menu slot="dropdown" class="sub-menu">
                <el-dropdown-item
                  v-for="(item, j) in items.children"
                  :key="j"
                  @click.native="toUrl(`/${items.path}/${item.path}`)"
                  class="sub-menu-item"
                  :class="{ active: `/${items.path}/${item.path}` === $route.path }"
                  >{{ item.meta.title }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
            <router-link
              :to="`/${items.path}`"
              class="title"
              :class="{ active: `/${items.path}` === activeMenu }"
              v-else
              >{{ items.meta.title }}</router-link
            >
          </li>
        </template>
      </ul>
      <div v-if="hideMenu && showLogo" class="logoContainer"></div>
    </div>
    <div class="right" v-if="!hideRight">
      <ul class="nav-info">
        <li class="time">{{ nowTime }}</li>
        <li class="date">
          <p>Date</p>
          <p>{{ nowDate }}</p>
        </li>
        <li v-if="weatherData.weatherPic">
          <img :src="weatherData.weatherPic" style="width:18px;height:18px" alt="" />
        </li>
        <li v-if="weatherData.temperature" class="temperature">
          {{ weatherData.weather }}
          <span>{{ weatherData.temperature }}℃</span>
        </li>
        <li v-if="weatherData.windPower" class="wind">
          <span>风力</span>
          <span>{{ weatherData.windPower }}</span>
        </li>
        <li v-if="weatherData.aqi" class="wind">
          <span>AQI</span>
          <span>{{ weatherData.aqi }}</span>
        </li>
        <li v-if="weatherData.sd" class="wind">
          <span>湿度</span>
          <span>{{ weatherData.sd }}</span>
        </li>
        <li class="logout">
          <el-dropdown>
            <img src="@/assets/user.png" class="user" />
            <el-dropdown-menu slot="dropdown" class="sub-menu">
              <el-dropdown-item @click.native="logout()">安全退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
    <div id="container" style="display:none"></div>
  </div>
</template>

<script>
/*
   任务名称：task#2885 【智慧施工2.0-前端】首页切图及功能开发
   开发人员：耿为刚
   日期：2020-04-07
   任务类型：全新代码
 */
import { homeApi } from '@/views/construction/api/home-api'
export default {
  name: 'Navbar',
  data() {
    return {
      timer: null,
      nowTime: '',
      nowDate: '',
      activeMenu: '',
      hideMenu: false,
      hideRight: false,
      showLogo: false,
      weatherData: {}
    }
  },
  watch: {
    $route() {
      this.initRoute()
    },
    projectLongitude() {
      this.getWeather()
    },
    projectLatitude() {
      this.getWeather()
    },
    projectId() {
      this.getWeather()
    }
  },
  computed: {
    routes() {
      return this.$router.options.routes
    },
    projectLongitude() {
      return this.$store.state.project.projectLongitude
    },
    projectId() {
      return this.$store.state.project.projectId
    },
    projectLatitude() {
      return this.$store.state.project.projectLatitude
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 页面初始化
    init() {
      this.countDown()
      this.initRoute()
    },
    // 初始化路由
    initRoute() {
      if (this.$route.path === '/login') {
        this.hideMenu = true
        this.showLogo = false
        this.hideRight = true
      } else if (this.$route.path === '/home') {
        this.hideMenu = true
        this.hideRight = false
        this.showLogo = true
      } else {
        this.hideMenu = false
        this.hideRight = false
        this.getWeather()
      }
      this.activeMenu = this.$route.meta && this.$route.meta.activeMenu ? this.$route.meta.activeMenu : this.$route.path
    },
    // 倒计时
    countDown() {
      this.timer = setInterval(() => {
        this.nowTime = moment().format('LTS')
        this.nowDate = moment().format('YYYY[-]MM[-]DD')
      }, 1000)
    },
    // 跳转路由
    toUrl(path) {
      this.$router.push({ path })
    },
    // 安全退出
    logout() {
      this.$store.commit('safeLogout')
    },
    // 获取天气
    async getWeather() {
      if (!this.projectLongitude || !this.projectLatitude || !this.projectId) {
        return
      }

      const res = await homeApi.getWeather({
        lng: `${this.projectLongitude}`,
        lat: `${this.projectLatitude}`,
        projectId: this.projectId
      })
      this.weatherData = res.data
      this.$store.commit('setWeather', res.data)
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<style lang="less" scoped>
@import url('../../styles/common.less');
.active {
  color: #7fd8fd;
}
.main {
  margin: 0 auto;
  /*width: 100%;*/
  width: 1920px;
  padding-top: 10px;
  display: flex;
  position: relative;
  z-index: 10;
  .logo {
    width: 260px;
    height: 24px;
    margin-left: 15px;
    cursor: pointer;
    margin-top: 5px;
  }
  .menu {
    flex: 1;
    ul {
      display: flex;
      align-items: center;
      justify-content: center;
      li {
        position: relative;
        font-size: 16px;
        &:after {
          content: '';
          position: absolute;
          z-index: -2;
          background: url('../../views/construction/images/menu-hover.png') no-repeat;
          width: 209px;
          height: 80px;
          left: 50%;
          top: -50px;
          margin-left: -104.5px;
          transition: all 0.4s;
          transform: scale(0);
        }
        .title {
          padding: 0 25px;
          transition: all 0.4s;
          opacity: 0.9;
          color: #fff;
          cursor: pointer;
          outline: none;
          border: 0;
          box-shadow: none;
          z-index: 0;
        }
        &:hover,
        &.active {
          &:after {
            transform: scale(1);
            top: -20px;
          }
          .title {
            color: @main-color;
            opacity: 1;
            text-shadow: 0 0 5px @main-color;
            position: relative;
          }
        }
      }
    }
  }

  .right {
    .nav-info {
      display: flex;
      justify-content: space-between;
      li {
        // padding-top: 10px;
        color: #f2f0f0;
        display: flex;
        align-items: center;
      }
      .temperature {
        width: 80px;
      }
      .time {
        color: #fff;
        font-size: 18px;
        padding-right: 6px;
      }
      .date {
        margin-top: -2px;
        font-size: 12px;
        width: 82px;
        flex-direction: column;
        text-align: left;
        align-items: flex-start;
        justify-content: center;
        p:nth-child(2) {
          color: #59c5d7;
        }
      }
      .wind {
        width: 77px;
        span:nth-child(1) {
          font-size: 12px;
          color: #6d717a;
        }
      }
      .logout {
        cursor: pointer;
      }
    }
  }
}
.sub-menu {
  background: #030e20;
  box-shadow: 0 0 8px @main-color;
  li {
    color: #fff;
    transition: all 0.4s;
    opacity: 0.9;
    &:hover,
    &.active {
      color: @main-color;
      opacity: 1;
      text-shadow: 0 0 5px @main-color;
    }
  }
}
.logoContainer {
  height: 50px;
  width: 250px;
  background: url('../../assets/images/white-logo.png') no-repeat center center;
  margin: 0 auto;
  background-size: 100% auto;
}
</style>
