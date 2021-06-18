<!--
 * @Description: 
 * @Version: 
 * @Autor: 
 * @Date: 2020-02-26 10:21:54
 * @LastEditTime: 2020-03-19 18:03:31

@任务名称: 2623/BIM协同-进度视图前端绑定
@开发人员: 董渊海
@修改日期: 2020-03-17
@任务类型: 复制修改代码，进度计划接口对接，数据格式化、绑定渲染，修改比例(60%)

@bug名称: 1601/BIM协同-进度视图-进度计划显示不完整
@开发人员: 董渊海
@修改日期: 2020-04-15
@任务类型: 修改代码，进度计划接口响应数据调整，修改比例(10%)

@bug名称: 1635/进度模块、计划进度-左侧筛选树时间不正确，且右侧筛选结果不正确
@开发人员: 董渊海
@修改日期: 2020-04-15
@任务类型: 修改代码，根据李建敏的进度模块，修复进度计划树显示bug，修改比例(10%)
 -->
<template>
  <div>
    <div class="aside-right m-h clearfix">
      <Block title="进度计划" subTitle="schedule">
        <el-tree
          :expand-on-click-node="false"
          default-expand-all
          :data="treeData"
          :props="defaultProps"
          @current-change="currentChange"
        ></el-tree>
      </Block>
    </div>
    <!-- 底部的table -->
    <div :class="['bottom-table', down ? 'turn-down' : '']">
      <BlockTabs :list="titleList" :activeKey="activeKey" @change="changeTab">
        <span slot="btn" :class="down ? 'down' : 'up'" @click="turnDown"><i class="el-icon-arrow-up"></i></span>
        <!-- 进度明细 -->
        <Details v-if="activeKey === 1" :listAll="listAll" :activeNode="activeNode" />
        <!-- 甘特图 -->
        <Gunter v-if="activeKey === 2" :listAll="listAll" :activeNode="activeNode" />
      </BlockTabs>
    </div>
  </div>
</template>

<script>
import Details from './components/details'
import Gunter from './components/gunter'
import Api from '@/api/schedule'
import _ from 'lodash'
export default {
  components: {
    Details,
    Gunter
  },
  data() {
    return {
      down: false,
      activeNode: null,
      activeKey: 1,
      titleList: [
        { title: '进度明细', desc: 'project Overview', value: 1 },
        { title: '甘特图', desc: 'point', value: 2 }
      ],
      // 总数据，禁止修改
      listAll: [],
      // tableData: [],
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /*
     * @任务编号: 2524 || 选中任务显示对应关联的模型高亮
     * @开发人员:申豪强
     * @日期:2020-03-19
     * @任务类型: 新代码
     */
    // 选择计划、更改进度明细、甘特图、模型
    watchModal(modals, dbids) {
      let app = this.$store.state.bim.bimfishApp
      app.hideAll()
      modals.forEach(id => {
        let model = app.findModelByid(id)
        app.viewer.show(dbids, model)
      })
    },
    currentChange(data) {
      this.activeNode = data
    },
    // 生成树
    renderTree(listAll) {
      let yearList = []
      let originList = listAll
      // 计算年月集合
	  function c(start, end) {
        const startYear = moment(start).year()
        const startMonth = moment(start).month()
        const endYear = moment(end).year()
        const endMonth = moment(end).month()
        let currentYear = startYear
        let currentMonth = startMonth
        while (currentYear === endYear && currentMonth <= endMonth) {
          let targetYear = _.find(yearList, { year: currentYear })
          if (targetYear) {
              if (!targetYear.children.includes(currentMonth)) {
                  targetYear.children.push(currentMonth)
              }
          } else {
              yearList.push({
                  year: currentYear,
                  children: [currentMonth]
              })
          }
          if (currentMonth + 1 === 12) {
              currentYear += 1
              currentMonth = 0
          } else {
              currentMonth += 1
          }
        }
      }

      _.sortBy(originList, 'planStartTime').forEach(e => {
        c(e.planStartTime, e.planEndTime)
      })
      yearList.forEach(e => {
        e.label = e.year + '年进度计划'
        e.children = e.children.map(month => ({
          label: e.year + '年' + (month + 1) + '月计划',
          year: e.year,
          month
        }))
      })

      this.treeData = [
        {
          label: '当前计划',
          children: yearList
        }
      ]
    },
    async getList() {
      let projectId = localStorage.getItem('projectId')
      let res = await Api.getTaskList(projectId)
      this.listAll = res.data.taskList
      //this.tableData = JSON.parse(JSON.stringify(this.listAll))
      //console.log(this.listAll)

      this.renderTree(_.cloneDeep(this.listAll))
    },
    turnDown() {
      this.down = !this.down
    },
    changeTab(e) {
      this.activeKey = e
      this.activeNode = null
    }
  }
}
</script>

<style lang="less" scoped></style>
