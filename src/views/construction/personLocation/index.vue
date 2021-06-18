<template>
  <div>
    <div class="tool-menu">
      <!-- 现场人员 start -->
      <div class="menu-card">
        <div class="card-title">现场人员</div>
        <el-table :data="personList" height="100%">
          <el-table-column label="姓名" prop="name" align="center" min-width="80"></el-table-column>
          <el-table-column label="班组" prop="group" align="center" min-width="80"></el-table-column>
          <el-table-column label="定位及轨迹" prop="guid" align="center" min-width="120">
            <template>
              <div class="person-icon">
                <img src="../images/personLocation/guid.png" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="电子围栏预警" prop="sex" align="center" min-width="120">
            <template slot-scope="{ row }">
              <div class="person-icon">
                <img src="../images/personLocation/man.png" v-if="row.sex === 1" />
                <img src="../images/personLocation/woman.png" v-else />
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 现场人员 end -->
      <!-- 电子围栏预警记录 start -->
      <div class="menu-card early-warning">
        <div class="card-title">电子围栏预警记录</div>
        <el-table :data="earlyWarningList" height="100%">
          <el-table-column label="姓名" prop="name" align="center" min-width="80"></el-table-column>
          <el-table-column label="班组" prop="group" align="center" min-width="80"></el-table-column>
          <el-table-column label="距离" prop="distance" align="center" min-width="100"></el-table-column>
          <el-table-column label="时间" prop="updateTime" align="center" min-width="120"></el-table-column>
        </el-table>
      </div>
      <!-- 电子围栏预警记录 end -->
    </div>
    <Map
      :map-type="mapType"
      :address="addressDetail"
      :selected-position="selectedPostion"
      @choosedLocation="changeLocation"
    />
  </div>
</template>

<script>
import Map from './components/map'
export default {
  name: 'PersonLocation',
  components: {
    Map
  },
  data() {
    //这里存放数据
    return {
      personList: [
        {
          name: '陈双双',
          group: '施工一组',
          guid: '',
          sex: 2
        },
        {
          name: '王江中',
          group: '施工一组',
          guid: '',
          sex: 1
        },
        {
          name: '李小荷',
          group: '施工一组',
          guid: '',
          sex: 2
        },
        {
          name: '赵杰',
          group: '施工二组',
          guid: '',
          sex: 1
        },
        {
          name: '项天浩',
          group: '施工二组',
          guid: '',
          sex: 1
        },
        {
          name: '赵晓婷',
          group: '施工二组',
          guid: '',
          sex: 2
        },
        {
          name: '李依伊',
          group: '施工二组',
          guid: '',
          sex: 2
        },
        {
          name: '向梅',
          group: '施工三组',
          guid: '',
          sex: 2
        },
        {
          name: '谭伟良',
          group: '施工三组',
          guid: '',
          sex: 1
        },
        {
          name: '张丙武',
          group: '施工三组',
          guid: '',
          sex: 1
        },
        {
          name: '陈一木',
          group: '施工三组',
          guid: '',
          sex: 1
        },
        {
          name: '张鼎智',
          group: '施工三组',
          guid: '',
          sex: 1
        },
        {
          name: '陈德光',
          group: '施工三组',
          guid: '',
          sex: 1
        },
        {
          name: '张国强',
          group: '施工三组',
          guid: '',
          sex: 1
        },
        {
          name: '赵浩博',
          group: '施工三组',
          guid: '',
          sex: 1
        },
        {
          name: '刘熙君',
          group: '施工三组',
          guid: '',
          sex: 2
        },
        {
          name: '王二丫',
          group: '施工三组',
          guid: '',
          sex: 2
        },
        {
          name: '王德刚',
          group: '施工四组',
          guid: '',
          sex: 1
        },
        {
          name: '赵炳奎',
          group: '施工四组',
          guid: '',
          sex: 1
        },
        {
          name: '冯晓明',
          group: '施工四组',
          guid: '',
          sex: 1
        },
        {
          name: '赵德仁',
          group: '施工四组',
          guid: '',
          sex: 1
        },
        {
          name: '赵谦仁',
          group: '施工四组',
          guid: '',
          sex: 1
        },
        {
          name: '肖政疏',
          group: '施工四组',
          guid: '',
          sex: 1
        },
        {
          name: '赵晓辉',
          group: '施工四组',
          guid: '',
          sex: 1
        },
        {
          name: '王晓峰',
          group: '施工四组',
          guid: '',
          sex: 1
        },
        {
          name: '郑小兰',
          group: '施工四组',
          guid: '',
          sex: 2
        },
        {
          name: '刘海勇',
          group: '施工四组',
          guid: '',
          sex: 1
        },
        {
          name: '马小虎',
          group: '施工四组',
          guid: '',
          sex: 1
        },
        {
          name: '赵大勇',
          group: '施工四组',
          guid: '',
          sex: 1
        }
      ], // 现场人员数据
      earlyWarningList: [
        {
          name: '陈双双',
          group: '施工一组',
          distance: '265m',
          updateTime: '2020-11-03'
        },
        {
          name: '王江中',
          group: '施工一组',
          distance: '152m',
          updateTime: '2020-11-03'
        },
        {
          name: '李小荷',
          group: '施工一组',
          distance: '256m',
          updateTime: '2020-11-03'
        },
        {
          name: '赵杰',
          group: '施工二组',
          distance: '565m',
          updateTime: '2020-11-03'
        },
        {
          name: '项天浩',
          group: '施工二组',
          distance: '3m',
          updateTime: '2020-11-03'
        },
        {
          name: '赵晓婷',
          group: '施工二组',
          distance: '500m',
          updateTime: '2020-11-03'
        },
        {
          name: '李依伊',
          group: '施工二组',
          distance: '300m',
          updateTime: '2020-11-03'
        },
        {
          name: '向梅',
          group: '施工三组',
          distance: '6542m',
          updateTime: '2020-11-03'
        },
        {
          name: '谭伟良',
          group: '施工三组',
          distance: '125m',
          updateTime: '2020-11-02'
        },
        {
          name: '张丙武',
          group: '施工三组',
          distance: '412m',
          updateTime: '2020-11-02'
        },
        {
          name: '陈一木',
          group: '施工三组',
          distance: '325m',
          updateTime: '2020-11-02'
        },
        {
          name: '张鼎智',
          group: '施工三组',
          distance: '2650m',
          updateTime: '2020-11-02'
        },
        {
          name: '陈德光',
          group: '施工三组',
          distance: '2650m',
          updateTime: '2020-11-02'
        },
        {
          name: '张国强',
          group: '施工三组',
          distance: '356m',
          updateTime: '2020-11-02'
        },
        {
          name: '赵浩博',
          group: '施工三组',
          distance: '85m',
          updateTime: '2020-11-02'
        },
        {
          name: '刘熙君',
          group: '施工三组',
          distance: '326m',
          updateTime: '2020-11-02'
        },
        {
          name: '王二丫',
          group: '施工三组',
          distance: '322m',
          updateTime: '2020-11-02'
        },
        {
          name: '王德刚',
          group: '施工四组',
          distance: '198m',
          updateTime: '2020-11-02'
        },
        {
          name: '赵炳奎',
          group: '施工四组',
          distance: '187m',
          updateTime: '2020-11-02'
        },
        {
          name: '冯晓明',
          group: '施工四组',
          distance: '200m',
          updateTime: '2020-11-02'
        },
        {
          name: '赵德仁',
          group: '施工四组',
          distance: '215m',
          updateTime: '2020-11-02'
        },
        {
          name: '赵谦仁',
          group: '施工四组',
          distance: '400m',
          updateTime: '2020-11-01'
        },
        {
          name: '肖政疏',
          group: '施工四组',
          distance: '800m',
          updateTime: '2020-11-02'
        },
        {
          name: '赵晓辉',
          group: '施工四组',
          distance: '820m',
          updateTime: '2020-11-02'
        },
        {
          name: '王晓峰',
          group: '施工四组',
          distance: '152m',
          updateTime: '2020-11-02'
        },
        {
          name: '郑小兰',
          group: '施工四组',
          distance: '156m',
          updateTime: '2020-11-02'
        }
      ], // 电子围栏预警记录
      mapType: 'contactAddress',
      selectedPostion: {
        lng: this.$store.state.project.projectLongitude,
        lat: this.$store.state.project.projectLatitude
      },
      addressDetail: '' // 详细位置
    }
  },
  //方法集合
  methods: {
    changeLocation() {}
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.tool-menu {
  .menu-card {
    position: fixed;
    z-index: 3;
    width: 420px;
    left: 15px;
    height: calc(100vh - 120px);
    padding: 10px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    &.early-warning {
      left: inherit;
      right: 15px;
    }
    /deep/ .el-table {
      flex: 1;
    }
    .card-title {
      margin: 5px 10px 15px;
      font-size: 18px;
      color: #fff;
    }
  }
}
.person-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 14px;
    height: auto;
  }
}
</style>
