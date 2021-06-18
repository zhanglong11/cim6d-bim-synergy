<!--
 * @Description: 项目模型
 * @Version:
 * @Autor:
 * @Date: 2020-02-24 11:15:35
 * @LastEditTime: 2020-04-03 16:44:38
 -->
<template>
  <div>
    <header class="btn-box">
      <el-button @click="addGroup">
        添加分组
      </el-button>
      <el-button @click="drawMark">
        绘制标注
      </el-button>
      <el-button @click="saveMark">
        保存标注
      </el-button>
    </header>
    <div class="content">
      <vxe-table
        @current-change="currentChange"
        resizable
        highlight-current-row
        row-id="id"
        :tree-config="{ children: 'children' }"
        :expand-config="{ expandAll: true }"
        :data="tableData"
      >
        <vxe-table-column field="groupName" width="100px" title="分组名称" tree-node></vxe-table-column>
        <vxe-table-column field="name" width="100px" title="视图名称"></vxe-table-column>
        <vxe-table-column title="标注缩略图">
          <template slot-scope="{ row }">
            <div v-if="row.groupName">
              <span class="btn" @click="addPoint(row)">添加视点</span>
              <span class="btn" @click="remove(row, true)">删除</span>
            </div>
            <div v-else>
              <span class="btn" @click="watchPoint(row)">视点</span>
              <span class="btn" @click="watchMark(row)">查看标注</span>
              <span class="btn" @click="cancelMark(row)">取消标注</span>
              <span class="btn" @click="remove(row)">删除</span>
            </div>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
  </div>
</template>

<script>
import api from '@/api/model/view'
export default {
  data() {
    return {
      tableData: [],
      selectColumn: null
    }
  },
  computed: {
    bimfish() {
      return this.$store.state.bim.bimfishApp
    }
  },
  watch: {
    bimfish() {}
  },
  created() {
    this.refresh()
  },
  methods: {
    refresh() {
      this.getTableTreeData()
    },
    async getTableTreeData() {
      let res = await api.list({})
      this.tableData = this.initData(res.data)
    },
    initData(data) {
      return data.map(d => {
        d.groupName = d.name
        delete d.name
        d.children = d.viewpointList || []
        return d
      })
    },
    currentChange(e) {
      this.cancelMark()
      this.selectColumn = e.row
    },
    // 用于添加分组+添加视角：props：是额外的参数
    showModal(title, msg, callBack, props) {
      this.$prompt(msg, title, {
        customClass: 'message',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '不能为空'
      })
        .then(({ value }) => {
          // 成功操作
          callBack(value, props)
        })
        .catch(() => {
          // 取消操作
        })
    },
    // 添加分组
    addGroup() {
      this.showModal('添加分组', '分组名称', this.addGroupSuccess)
    },
    /*
    * @任务编号:1222 | 完善模型交互接口
    * @开发人员:申豪强
    * @日期:2020-04-03
    * @任务类型: 未开发完引起的bug
    */
    async addGroupSuccess(name, row) {
      if (row) {
        let info=this.bimfish.viewer.getState()
        let viewInfo= JSON.stringify(info);
        await api.addView({ name, groupId: row.id,viewInfo })
      } else {
        await api.addGroup({ name })
      }
      this.refresh()
      console.log('添加分组成功，走接口')
    },
    // 绘制标注
    drawMark() {
      if (_.isEmpty(this.selectColumn)) {
        this.$message.error('请选择一个视点')
      } else {
        // 选择视点进行标注
        this.bimfish.activeAnnotateMode()
      }
    },
    // 保存标注
    async saveMark() {
      let mess = this.bimfish.getAnnotateState()
      let markInfo=JSON.stringify(mess)
      let obj={
        markInfo:markInfo,
        projectId:localStorage.getItem('projectId'),
        viewpointId:this.selectColumn.id
      }
      let res=await api.addMark(obj)
      
      this.$message.success("保存成功")
      this.cancelMark()
    },
    // table方法区
    async remove(item, isGroup) {
      if (item.children && item.children.length > 0) return this.$message.error('该分组底下有视图，禁止删除')
      isGroup ? await api.removeGroup(item.id) : await api.removeView(item.id)
      this.$message.success('操作成功')
      this.refresh()
    },
    // 添加视点
    addPoint(row) {
      this.showModal('添加视点', '视点名称', this.addGroupSuccess, { id: row.id })
    },
    // 查看视点
    watchPoint(row) {
      this.bimfish.viewer.restoreState(JSON.parse(row.viewInfo))
    },
    /*
    * @任务编号:1222 | 完善模型交互接口
    * @开发人员:申豪强
    * @日期:2020-04-03
    * @任务类型: 未开发完引起的bug
    */
    // 查看标注
    async watchMark(row) {
      let markList=await api.getMarkList(row.id)
      console.log(markList)
      if(markList.data.length>0){
        // 返回值不应该是数组
        this.bimfish.restoreAnnotateState(JSON.parse(markList.data[0].markInfo))
      }else{
        return this.$message.error("暂时没有标注")
      }
     
    },
    // 取消标注
    cancelMark() {
      this.bimfish.exitAnnotate()
    }
  }
}
</script>

<style lang="less" scoped>
.btn {
  padding: 0px 2px;
  color: #0171a4;
  cursor: pointer;
  font-size: 12px;
}
.btn-box {
  text-align: right;
  // margin-top: -20px;
  margin-bottom: 10px;
}
.content {
  height: calc(70vh - 140px);
  overflow-y: scroll;
  /deep/ .el-table--small td {
    padding: 2px 0;
  }
  /deep/ .el-table--small th {
    padding: 2px 0;
  }
  /deep/ .vxe-tree--btn-wrapper {
    background-color: transparent;
  }
  /deep/ .vxe-table .vxe-tree--node-btn {
    color: #5ea0e9;
  }
  .vxe-table {
    /deep/ .vxe-body--row.row--current,
    /deep/ .vxe-body--row.row--current .vxe-tree--btn-wrapper {
      background-color: #1c4b61;
    }
  }
}
</style>
<style lang="less">
.message {
  background-color: #fff !important;
}
.message .el-message-box__message {
  color: #303133;
}
.message .el-message-box__input input {
  color: #303133;
}
</style>
