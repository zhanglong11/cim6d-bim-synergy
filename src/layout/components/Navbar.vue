<template>
  <div class="main">
    <img class="logo" src="/img/logo.png" />
    <div class="center">
      <nav>
        <div :key="e.path" v-for="e in list">
          <template v-if="_.size(e.children)">
            <span :class="e.children.some(item => item.path === active) ? 'active' : ''" @click="turn(e)">{{
              e.title
            }}</span>
            <div class="sub" v-if="active === e.path">
              <a
                href="javascript:;"
                :class="f.path == subActive ? 'active' : ''"
                @click="go(f)"
                :key="f.path"
                v-for="f in e.children"
                >{{ f.title }}</a
              >
            </div>
          </template>
          <template v-else>
            <!--/**
     任务名称：BUG 1230/保存下级目录点击状态
     开发人员：崔洛宜
     日期：2020-03-20
     BUG类型：
     测试人员提出的系统性BUG
            **/-->
            <router-link :to="e.path" @click.native="turna()">{{ e.title }}</router-link>
          </template>
        </div>
      </nav>
    </div>
    <div class="right">
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
          <i class="el-icon-s-flag"></i>
          <span>{{ weatherData.temperature }}℃</span>
        </li>
        <li v-if="weatherData.windPower" class="wind">
          <span>风力</span>
          <span>{{ weatherData.windPower }}</span>
        </li>
        <li v-if="weatherData.aqi" class="wind">
          <span>pm值</span>
          <span>{{ weatherData.aqi }}</span>
        </li>
        <li v-if="weatherData.sd" class="wind">
          <span>湿度</span>
          <span>{{ weatherData.sd }}</span>
        </li>
        <li>
          <div style="margin-right: 10px;">
            <el-button @click="logout" type="text">退出登录</el-button>
          </div>
          <!--          <el-dropdown class="avatar-container" trigger="click">-->
          <!--            <div class="avatar-wrapper">-->
          <!--              <span class="user-name">{{ userName }}</span>-->
          <!--              <i class="el-icon-caret-bottom" />-->
          <!--              <img :src="avatar || '/img/avatar.jpg' + '?imageView2/1/w/80/h/80'" class="user-avatar" />-->
          <!--            </div>-->
          <!--            <el-dropdown-menu slot="dropdown" class="user-dropdown">-->
          <!--              <router-link to="/">-->
          <!--                <el-dropdown-item>首页</el-dropdown-item>-->
          <!--              </router-link>-->
          <!--              <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>-->
          <!--            </el-dropdown-menu>-->
          <!--          </el-dropdown>-->
        </li>
      </ul>
    </div>
    <div id="container" style="display:none"></div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      subActive: '',
      timer: null,
      nowTime: '',
      nowDate: '',
      active: '',
      weatherData:{},
      list: [
        { path: '/', title: '首页' },
        { path: '/project/projectData/index', title: '项目资料' },
        {
          path: '/project/cost',
          title: '成本视图',
          children: [
            { path: '/project/cost/trending', title: '成本趋势' },
            { path: '/project/cost/treeCalculate', title: '成本三算' },
            { path: '/project/cost/change', title: '成本变更' }
          ]
        },
        {
          path: '/project/schedule',
          title: '进度视图',
          children: [
            { path: '/project/schedule/view', title: '进度视图' },
            { path: '/project/schedule/simulation', title: '进度模拟' },
            { path: '/project/schedule/change', title: '进度变更' }
          ]
        },
        { path: '/project/quality/index', title: '质量视图' },
        { path: '/project/safety/index', title: '安全视图' }
      ]
    }
  },
  watch: {
    $route() {
      this.active = this.$route.path
    }
  },
  // computed: {
  //   userName() {
  //     return this.$store.state.user.name
  //   }
  // },
  methods: {
    turn(e) {
      this.active = e.path
    },
    /**
     任务名称：BUG 1230/保存下级目录点击状态
     开发人员：崔洛宜
     日期：2020-03-20
     BUG类型：
     测试人员提出的系统性BUG
     **/
    turna() {
      this.subActive = ''
    },
    /**
     任务名称：BUG 1230/保存下级目录点击状态
     开发人员：崔洛宜
     日期：2020-03-20
     BUG类型：
     测试人员提出的系统性BUG
     **/
    go(a) {
      this.active = a.path
      this.subActive = a.path
      this.$router.push({ path: a.path })
    },
    // 退出登录
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    }
  },
  created() {
    this.axios.system
      .post(`/weather/info`, { lng: localStorage.getItem('lng'), lat: localStorage.getItem('lat') })
      .then(res => {
        this.weatherData = res.data
      })
  },
  mounted() {
    this.timer = setInterval(() => {
      this.nowTime = moment().format('LTS')
      this.nowDate = moment().format('YYYY[-]MM[-]DD')
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<style lang="less" scoped>
.active {
  color: #7fd8fd;
}
.main {
  display: flex;
  margin-top: 10px;
  .logo {
    width: 260px;
    height: 34px;
    margin-left: 15px;
  }
  .center {
    flex: 1;
    display: flex;
    justify-content: center;
    min-width: 960px;
    nav {
      display: flex;
      color: #fff;
      > div {
        cursor: pointer;
        font-size: 18px;
        padding: 0 30px;
        position: relative;
        > .sub {
          top: 35px;
          left: 15px;
          position: absolute;
          display: block;
          white-space: nowrap;
          > a {
            padding: 0 15px;
          }
        }

        .router-link-exact-active {
          color: #7fd8fd;
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
    }
    .temperature {
      width: 60px;
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
  }
}
</style>
