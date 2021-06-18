<!--
 * @Description: 
 * @Version: 
 * @Autor: 
 * @Date: 2020-02-25 11:28:00
 * @LastEditTime: 2020-04-27 17:10:41
 -->

<!--
 * @Description:单体楼层组件替换
 * @Version:zhanglong11
 * @Autor:
 * @Date: 2020-03-13 19:14:03
 * @LastEditTime: 2020-02-26 16:25:43
 -->
<!-- 
  * @任务编号: 2525 || 树与模型交互:左侧树获取选中数据，上下树取交集显示
  * @开发人员:申豪强
  * @日期:2020-03-19
  * @任务类型: 新代码
-->
<!-- 
  * @任务编号: 2525 || 树与模型交互:优化重写整个取交集算法
  * @开发人员:申豪强
  * @日期:2020-03-19
  * @任务类型: 新代码
-->
<template>
  <div>
    <router-view v-if="hideAll"></router-view>
    <div class="project-box base-wrap" v-else>
      <aside class="m-h aside-left left">
        <Block title="单体楼层" sub-title="Single Floor">
          <div class="m-h-tree">
            <BimTree type="space" @checkChange="singleCheckChange" />
          </div>
        </Block>
        <Block title="专业构件类型" sub-title="Professional Build Type">
          <div class="m-h-tree">
            <BimTree type="special" @checkChange="majorCheckChange" />
          </div>
        </Block>
      </aside>
      <div class="center">
        <div class="main-title no-line">
          <span class="name">模型展示</span>
          <span class="sub">Model Display</span>
        </div>
        <div class="model-container">
          <span class="model-line top-left-line"></span>
          <span class="model-line top-right-line"></span>
          <span class="model-line bottom-left-line"></span>
          <span class="model-line bottom-right-line"></span>
          <div class="bim-wrap">
            <Bim class="bim"></Bim>
          </div>
        </div>
        <div class="working-procedure-list" v-if="isProcedureHome">
          <div class="main-title">
            <p class="tabs">
              <span class="name" :class="{ active: processTabIndex === 0 }" @click="clickProcessTab(0)"
                >已完成工序 <i>({{ finishedList.length }})</i></span
              >
              <span class="name" :class="{ active: processTabIndex === 1 }" @click="clickProcessTab(1)"
                >进行中工序 <i>({{ noFinishedList.length }})</i></span
              >
              <span class="name" :class="{ active: processTabIndex === 2 }" @click="clickProcessTab(2)"
                >未开始工序 <i>({{ notStartedList.length }})</i></span
              >
            </p>
          </div>
          <!-- 已完成工序 start -->
          <el-table :data="finishedList" stripe :max-height="240" v-if="processTabIndex === 0">
            <el-table-column prop="floorRule" label="序号" align="center" />
            <el-table-column prop="name" show-overflow-tooltip label="工序名称" align="center" />
            <el-table-column prop="duration" label="工期" align="center" />
            <el-table-column prop="startTime" show-overflow-tooltip label="开始时间" align="center">
              <template slot-scope="scope">{{ scope.row.startTime | formatData }}</template>
            </el-table-column>
            <el-table-column prop="startTime" show-overflow-tooltip label="结束时间" align="center">
              <template slot-scope="scope">{{ scope.row.endTime | formatData }}</template>
            </el-table-column>
          </el-table>
          <!-- 已完成工序 end -->
          <!-- 进行中工序 start -->
          <el-table :data="noFinishedList" stripe :max-height="240" v-if="processTabIndex === 1">
            <el-table-column prop="floorRule" label="序号" align="center" />
            <el-table-column prop="name" show-overflow-tooltip label="工序名称" align="center" />
            <el-table-column prop="duration" label="工期" align="center" />
            <el-table-column prop="startTime" show-overflow-tooltip label="开始时间" align="center">
              <template slot-scope="scope">{{ scope.row.startTime | formatData }}</template>
            </el-table-column>
            <el-table-column prop="startTime" show-overflow-tooltip label="结束时间" align="center">
              <template slot-scope="scope">{{ scope.row.endTime | formatData }}</template>
            </el-table-column>
          </el-table>
          <!-- 进行中工序 end -->
          <!-- 未开始工序 start -->
          <el-table :data="notStartedList" stripe :max-height="240" v-if="processTabIndex === 2">
            <el-table-column prop="floorRule" label="序号" align="center" />
            <el-table-column prop="name" show-overflow-tooltip label="工序名称" align="center" />
            <el-table-column prop="duration" label="工期" align="center" />
            <el-table-column prop="startTime" show-overflow-tooltip label="开始时间" align="center">
              <template slot-scope="scope">{{ scope.row.startTime | formatData }}</template>
            </el-table-column>
            <el-table-column prop="startTime" show-overflow-tooltip label="结束时间" align="center">
              <template slot-scope="scope">{{ scope.row.endTime | formatData }}</template>
            </el-table-column>
          </el-table>
          <!-- 未开始工序 end -->
        </div>
      </div>
      <aside class="m-h right">
        <template v-if="isProcedureHome">
          <div class="main-title">
            <span class="name">项目工序</span>
            <span class="sub">Project Process</span>
          </div>
          <el-tree
            :data="processList"
            :props="defaultProps"
            node-key="id"
            highlight-current
            default-expand-all
            :expand-on-click-node="false"
            @node-click="selectProcess"
            class="custom-tree-node"
          >
            <span class="custom-tree-extend" slot-scope="{ node, data }">
              <img src="../construction/images/file.png" class="tree-icon" />
              <span>{{ node.label }}</span>
            </span>
          </el-tree>
        </template>
        <router-view></router-view>
      </aside>
    </div>
  </div>
</template>

<script>
import BimTree from './components/BimTree'
import Bim from '@/views/bimView/index'
import { processProgressApi } from '@/views/construction/api/process-api'
export default {
  components: { BimTree, Bim },
  data() {
    return {
      // 选中的单体模型
      singleModels: {},
      // /选中的专业模型
      majorModels: {},
      isProcedureHome: false, // 是否是工序首页
      hideAll: true, // 是否隐藏所有
      // 判断是否有底部table
      bottomFlag: false,
      // 判断右侧是否有空余
      rightFlag: false,
      processList: [], // 项目工序列表
      defaultProps: {
        children: 'children',
        label: 'name',
        level: 'level'
      },
      processTabIndex: 0,
      finishedList: [], // 已完成工序
      noFinishedList: [], // 进行中工序
      notStartedList: [] // 未开始工序
    }
  },
  watch: {
    $route() {}
  },
  mounted() {
    this.getRoute()
    this.classJudge()
    this.queryProcedureConfigSimulateWorking()
  },
  methods: {
    // 时间截取年月日
    formatData(str) {
      if (!str) {
        return ''
      }
      return str.substring(0, 10)
    },
    // 获取路由
    getRoute() {
      const pathRoute = this.$route.path
      this.isProcedureHome = pathRoute === '/working-procedure/procedure'
      this.hideAll = pathRoute === '/quality-safety/survey'
    },
    // 初始化工序
    initProcess(array) {
      const formatArray = newArray => {
        newArray.map(e => {
          if (e.type === 3) {
            e.childrenList = e.children
            e.children = []
            return
          }
          if (e.children && e.type && e.type < 3) {
            formatArray(e.children)
          }
        })
        return newArray
      }
      this.processList = formatArray(array)
    },
    // 监听窗口改变
    onresize() {
      this.$nextTick(() => {
        if (this.$parent.onresize) {
          this.$parent.onresize()
        }
      })
    },
    // 选择工序
    selectProcess(data) {
      let finishedList = []
      let noFinishedList = []
      let notStartedList = []
      if (data.childrenList) {
        data.childrenList.map(item => {
          // status 0 未开始 1 进行中 2 已完成
          if (item.status === 2) {
            finishedList.push(item)
          }
          if (item.status === 1) {
            noFinishedList.push(item)
          }
          if (!item.status) {
            notStartedList.push(item)
          }
        })
      }
      this.finishedList = finishedList
      this.noFinishedList = noFinishedList
      this.notStartedList = notStartedList
      this.onresize()
    },
    // 切换选项卡
    clickProcessTab(e) {
      this.processTabIndex = e
      this.onresize()
    },
    // 工序楼层查询
    async queryProcedureConfigSimulateWorking() {
      if (!this.isProcedureHome) {
        return
      }
      const result = await processProgressApi.queryProcedureConfigSimulateWorking({
        projectId: this.$store.state.project.projectId
      })
      const datas = result.data || []
      this.initProcess(datas)
    },
    // 各种情况class
    classJudge() {
      this.$nextTick(() => {
        if (this.$store.state.bim.bimfishApp) {
          this.$store.state.bim.bimfishApp.resize()
        }
      })
    },
    /*
     * @任务编号: 2525 || 树与模型交互
     * @开发人员:申豪强
     * @日期:2020-03-17
     * @任务类型: 新代码
     */
    // 取交集
    arrayIntersection(a, b) {
      let intersection = a.filter(function(val) {
        return b.indexOf(val) > -1
      })
      return intersection
    },
    /*
     * @任务编号: 2524 || 树与模型交互,获取模型id：dbids，然后取对象交集，再取数组交集
     * @开发人员:申豪强
     * @日期:2020-03-20
     * @任务类型: 新代码
     */
    // 模型展示
    watchModal() {
      let app = this.$store.state.bim.bimfishApp
      app.hideAll()
      // 是否关掉重影：参数false为关掉，反之开启
      // app.setGhosting(false)
      // return
      // 组成新的model：dbids对象，然后取交集
      let obj = {}
      //组成新对象:取对象交集
      if (_.isEmpty(this.singleModels)) {
        obj = JSON.parse(JSON.stringify(this.majorModels))
      } else if (_.isEmpty(this.majorModels)) {
        obj = JSON.parse(JSON.stringify(this.singleModels))
      } else {
        //对象交集、数组交集
        for (let modelId in this.singleModels) {
          let arr = this.arrayIntersection(this.singleModels[modelId], this.majorModels[modelId])
          obj[modelId] = arr
        }
      }
      for (let key in obj) {
        let model = app.findModelByid(key)
        app.showByDbid(obj[key], model)
      }
    },
    // 多维数组转一维数组
    flatten(arr) {
      return [].concat(...arr.map(x => (Array.isArray(x) ? this.flatten(x) : x)))
    },
    // 去重
    unique(arr) {
      if (!Array.isArray(arr)) {
        return
      }
      arr = arr.sort()
      var arrry = [arr[0]]
      for (var i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[i - 1]) {
          arrry.push(arr[i])
        }
      }
      return arrry
    },
    //生成modal：dbids
    checkedNodesFilter(checkedNodes) {
      let modelIds = []
      if (Object.prototype.hasOwnProperty.call(checkedNodes[0], 'singleFlag')) {
        modelIds = checkedNodes
          .filter(item => item.singleFlag)
          .map(item => {
            let id = item.bimResourceId.split('_')[0]
            return id
          })
      } else {
        modelIds = this.unique(
          checkedNodes.map(item => {
            let id = item.modelId.split('_')[0]
            return id
          })
        )
      }
      let obj = {}
      modelIds.forEach(id => {
        let ids = checkedNodes
          .filter(item => item.modelId === id && item.components.length > 0)
          .map(item => item.components)
        let dbids = this.flatten(ids)
        // modelId:dbids
        obj[id] = dbids
      })
      return obj
    },
    // 单体楼层选中
    singleCheckChange(e, data) {
      // tree组件有个问题，获取checkNodes不能获取全部的
      let checkedNodes = data.checkedNodes
      // 模型ids
      if (checkedNodes.length === 0) {
        this.singleModels = {}
        this.watchModal()
        return
      }
      let obj = this.checkedNodesFilter(checkedNodes)
      this.singleModels = obj || {}
      this.watchModal()
    },
    // 专业构件选择
    majorCheckChange(e, data) {
      // tree组件有个问题，获取checkNodes不能获取全部的
      let checkedNodes = data.checkedNodes
      // 模型ids
      if (checkedNodes.length === 0) {
        this.majorModels = {}
        this.watchModal()
        return
      }
      let obj = this.checkedNodesFilter(checkedNodes)
      this.majorModels = obj || {}
      this.watchModal()
    }
  },
  computed: {
    showModelByTreeFlag() {
      return this.$store.state.bim.showModelByTreeFlag
    }
  },
  watch: {
    // 自己发现的bug 这样写就是为了每次从进度管理中转换路由的时候进行模型展示 2020-04-23 申豪强
    showModelByTreeFlag() {
      let app = this.$store.state.bim.bimfishApp
      // if (_.isEmpty(this.singleModels) && _.isEmpty(this.majorModels)) {
      //   app.showAll()
      // } else {
      //   this.watchModal()
      // }
      app.showAll()
    }
  }
}
</script>

<style lang="less" scoped>
.m-h-tree {
  max-height: calc(50vh - 130px);
  overflow-y: auto;
}
.project-box {
  display: flex;
  justify-content: space-between;
  .aside-left {
    > .block {
      margin-bottom: 30px;
    }
  }
  .left {
    width: 380px;
  }
  .center {
    margin: 0 25px;
    flex: 1;
  }
  .right {
    width: 400px;
  }
}
.model-container {
  padding: 20px;
  width: 100%;
  height: 700px;
  position: relative;
  z-index: 2;
  .model-line {
    position: absolute;
    background: url('../construction/images/model-line.png');
    width: 152px;
    height: 143px;
    z-index: -1;
    &.top-left-line {
      top: 0;
      left: 0;
    }
    &.top-right-line {
      top: 0;
      right: 0;
      transform: rotate(90deg);
    }
    &.bottom-right-line {
      bottom: 0;
      right: 0;
      transform: rotate(180deg);
    }
    &.bottom-left-line {
      bottom: 0;
      left: 0;
      transform: rotate(-90deg);
    }
  }
}
// bim
.bim-wrap {
  height: 100%;
  .bim {
    width: 100%;
    height: 100%;
  }
}
.working-procedure-list {
  margin-top: 30px;
  /deep/.el-table {
    margin-top: 15px;
  }
}

/deep/.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #082758;
}
.custom-tree-node {
  font-size: 14px;
  color: #acd1f2;
  /deep/.el-tree-node__content {
    height: 40px;
    transition: all 0.4s;
  }
  .custom-tree-extend {
    display: flex;
    align-items: center;
    .tree-icon {
      margin-right: 10px;
      width: 14px;
      height: 14px;
    }
  }
}
</style>
