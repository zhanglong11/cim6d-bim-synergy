<template>
  <div class="m-h">
    <div class="aside-right clearfix">
      <BlockTabs :list="titleList" :activeKey.sync="activeKey" @change="changeTab" class="m-h-group">
        <!-- 项目概况 -->
        <Overview v-if="activeKey === 1" />
        <!-- 项目模型 -->
        <Modal v-if="activeKey === 2" />
      </BlockTabs>
      <Block title="模型版本" sub-title="project Overview" v-if="activeKey === 2" class="m-h-version">
        <!-- <div slot="btn">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link"> 更多版本<i class="el-icon-caret-right" /> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">版本1</el-dropdown-item>
              <el-dropdown-item command="2">版本2</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div> -->
        <span slot="btn" class="goDetails" @click="moreVersion">更多版本 <i class="el-icon-caret-right"/></span>
        <header class="versions">
          <p class="title">
            当前版本
          </p>
          <p class="key-point versions-number">{{ orderInfo.versionCode }}</p>
        </header>
        <div class="flex">
          <p>
            <span class="title">模型名称</span>
            <span>{{ orderInfo.versionName }}</span>
          </p>
          <p>
            <span class="title">更新时间</span>
            <span>{{ moment(orderInfo.createTime).format('YYYY-MM-DD') }}</span>
          </p>
        </div>
      </Block>
    </div>
    <!-- /*
     * @任务编号: 无任务号 | 新增版本信息预览
     * @开发人员:申豪强
     * @日期:2020-03-19
     * @任务类型: 新代码
     -->
    <el-dialog class="version" title="版本信息" :visible.sync="dialogVisible" width="70%">
      <el-table :data="versionData" style="width: 100%">
        <el-table-column type="index" label="序号" align="center"> </el-table-column>
        <el-table-column prop="versionCode" label="模型版本编号" width="230" align="center"> </el-table-column>
        <el-table-column prop="versionName" label="模型版本名称" width="230" align="center"> </el-table-column>
        <el-table-column prop="creatorName" label="变更人" align="center"> </el-table-column>
        <el-table-column prop="createTime" label="变更日期" align="center"> </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import Modal from './components/Modal'
import Overview from './components/Overview'
import api from '@/api/model'
export default {
  name: 'ProjectData',
  components: {
    Modal,
    Overview
  },
  data() {
    return {
      versionData: [],
      dialogVisible: false,
      version: '',
      orderInfo: {},
      moment,
      options: [
        {
          label: '0.01',
          value: 1
        },
        {
          label: '0.02',
          value: 2
        }
      ],
      activeKey: 1,
      titleList: [
        { title: '项目概况', desc: 'project Overview', value: 1 },
        { title: '视点', desc: 'point', value: 2 }
      ],
      treeData: [
        {
          label: 'XXX楼',
          children: [
            {
              label: '9.22一下结构',
              children: [
                {
                  label: '二层钢梁顶'
                },
                {
                  label: '首层夹层4.720'
                },
                {
                  label: '基础项'
                }
              ]
            },
            {
              label: '9.22一下结构',
              children: [
                {
                  label: '二层钢梁顶'
                },
                {
                  label: '首层夹层4.720'
                },
                {
                  label: '基础项'
                }
              ]
            },
            {
              label: '9.22一下结构',
              children: [
                {
                  label: '二层钢梁顶'
                },
                {
                  label: '首层夹层4.720'
                },
                {
                  label: '基础项'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  mounted() {
    // this.getVersion()
    this.refresh()
  },
  methods: {
    /*
     * @任务编号: 无任务号 | 新增版本信息预览
     * @开发人员:申豪强
     * @日期:2020-03-19
     * @任务类型: 新代码
     */

    /*
     * @任务编号:项目资料模型版本接口数据对接，目前后端正在修改接口
     * @开发人员:张龙
     * @日期:2020-03-20
     * @任务类型: 新代码
     */
    /*
     * @任务编号:项目资料模型版本接口数据绑定
     * @开发人员:张龙
     * @日期:2020-03-23
     * @任务类型: 新代码
     */
    refresh() {
      this.getCurVersionData()
      this.getVersionList()
    },
    async getCurVersionData() {
      const res = await api.curVersion()
      this.orderInfo = res.data
    },

    async getVersionList() {
      const res = await api.versionList()
      this.versionData = res.data.records
    },

    // 版本信息点击预览
    rowClick(e) {
      console.log(e)
      const a = document.createElement('a')
      a.target = '_blank'
      a.href = 'http://www.baidu.com'
      a.click()
    },

    // /获取版本信息
    getVersion() {
      this.versionData = [
        {
          number: 'v 5.23',
          name: '进度模型',
          auther: '百里守约',
          date: '2020-02-21'
        }
      ]
    },
    moreVersion() {
      this.dialogVisible = true
    },
    // 版本选择
    handleCommand(e) {
      if (e === '1') {
        this.$store.commit('bim/load3dviewer', {
          id: 'lo-viewer',
          arr: [{ id: 1, modelUrl: location.origin + '/models/V1/3d.svf' }]
        })
      } else {
        this.$store.commit('bim/load3dviewer', {
          id: 'lo-viewer',
          arr: [{ id: 2, modelUrl: location.origin + '/models/V2/3d.svf' }]
        })
      }
    },
    changeTab(e) {
      this.activeKey = e
      // 还有其他操作
    }
  },
  created() {
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
.m-h-group {
  // height: calc(70vh - 100px);
  // overflow-y: scroll;
}
.m-h-version {
  height: calc(20vh - 12px);
  overflow-y: scroll;
}
.version-select {
  width: 100px;
}
.aside-right {
  float: right;
  width: 400px;
  .block {
    // padding: 10px;
  }
}
.title {
  color: #356294;
}
.key-point {
  color: #dcc51d;
}
.versions {
  text-align: center;
  padding-bottom: 10px;
  .title {
    font-size: 13px;
  }
  &-number {
    padding-top: 4px;
    font-size: 20px;
  }
}
.flex {
  display: flex;
  justify-content: space-between;
  .title {
    font-size: 14px;
    padding-right: 8px;
  }
  p {
    flex: 1;
    text-align: center;
  }
}
/*.version .el-table {*/
/*  thead {*/
/*    background: red;*/
/*  }*/
/*}*/
.version {
  /deep/.el-dialog {
    background: #253446;
    .el-dialog__title {
      color: #5ea0e9;
    }
  }
}
</style>
