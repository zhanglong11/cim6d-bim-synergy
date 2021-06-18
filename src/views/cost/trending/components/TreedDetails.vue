<!--
 * @Description: 趋势明细
 * @Version:
 * @Autor:
 * @Date: 2020-02-24 16:16:15
 * @LastEditTime: 2020-02-24 17:14:55
 -->
<template>
  <div>
    <el-table :data="tableData">
      <!--
       /**
       任务名称：2621/BIM协同成本趋势+成本三算绑定
       开发人员：崔洛宜
       日期：2020-3-17
       任务类型：修改列数据
       **/
       -->
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="period" label="核算区间"> </el-table-column>
      <el-table-column prop="income" label="收入"> </el-table-column>
      <el-table-column prop="budgetCost" label="预算成本"> </el-table-column>
      <el-table-column prop="realCost" label="实际成本"> </el-table-column>
      <el-table-column prop="profitLossQuota" label="盈亏额"> </el-table-column>
      <!--
          /**
           任务名称：BUG 1227/ 智慧施工前台-成本视图-成本趋势明细-缺少一列【盈亏率】，【盈亏率】和【节超率】的数据应该
                    是百分数
           开发人员：崔洛宜
           日期：2020-03-20
           BUG类型：
            测试人员提出的系统性BUG
           **/
      -->
      <el-table-column prop="profitLossRate" label="盈亏率">
        <template v-slot="row">
          {{ row.profitLossRate ? row.profitLossRate + '%' : 0 + '%' }}
        </template>
      </el-table-column>
      <el-table-column prop="superSectionQuota" label="结超额"> </el-table-column>
      <el-table-column prop="superSectionRate" label="结超率">
        <template v-slot="row">
          {{ row.superSectionRate ? row.superSectionRate + '%' : 0 + '%' }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  /**
       任务名称：2621/BIM协同成本趋势+成本三算绑定
       开发人员：崔洛宜
       日期：2020-3-16
       任务类型：修改传参  31-36
       **/
  props: {
    tableData: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
