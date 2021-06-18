<!--
 * @Description:
 * @Version:
 * @Autor:
 * @Date: 2020-03-02 16:21:09
 * @LastEditTime: 2020-03-02 16:34:58
 -->
<!--
* @任务编号:安全-根据原型修改静态页面
* @开发人员:张龙
* @日期:2020-03-20
* @任务类型: 修改代码
-->

<!--
* @任务编号: 2620 || 安全详情接口对接
* @开发人员:张龙
* @日期:2020-03-25
* @任务类型: 新代码
-->
<template>
  <div>
    <Block title="问题整改" sub-title="Security Risk">
      <span slot="btn" @click="goBack"><i class="el-icon-back"></i>返回</span>
      <ul>
        <li class="li-flex">
          <div>
            <p class="title">整改措施</p>
            <p class="desc key-pont">{{ orderInfo.rectificationRequire }}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">负责人</p>
            <p class="desc key-pont">{{ orderInfo.rectificationerName }}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">整改时间</p>
            <p class="desc key-pont">{{ orderInfo.rectificationTime }}</p>
          </div>
        </li>
        <li class="li-flex">
          <div>
            <p class="title">复查结果</p>
            <p class="desc ">{{ orderInfo.checkResult }}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">复查人</p>
            <p class="desc ">{{ orderInfo.recheckerName }}</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">复查日期</p>
            <p class="desc ">{{ orderInfo.checkDate }}</p>
          </div>
        </li>
        <li>
          <p class="title">备注</p>
          <p class="desc ">{{ orderInfo.remark }}</p>
        </li>
        <li>
          <p class="title">附件</p>
          <p class="desc "><FileList :ids="orderInfo.fileIds" /></p>
        </li>
      </ul>
    </Block>
  </div>
</template>

<script>
import api from '@/api/safe'
export default {
  props: {
    id: {}
  },
  data() {
    return {
      orderInfo: {}
    }
  },
  created() {
    this.refresh()
  },
  methods: {
    async refresh() {
      let res = await api.checkDetail({ checkId: this.id })
      this.orderInfo = res.data.length ? res.data[0] : {}
    },
    goBack() {
      this.$emit('goBack')
    }
  }
}
</script>

<style lang="less" scoped>
.add {
  padding-left: 9px;
  color: red;
}
.reduce {
  padding-left: 9px;
  color: green;
}
ul {
  font-size: 13px;
  background-color: #030e25;
  li {
    padding: 14px 16px;
    border-bottom: 1px dashed #3f4654;

    .title {
      color: #356294;
      padding-bottom: 10px;
    }
    .desc {
      color: #85add2;
      &.key-pont {
        color: #dcc51d;
      }
    }
  }
  .li-flex {
    display: flex;
    justify-content: space-between;
    div {
      flex: 1;
    }
    .center {
      border-left: 1px solid #3f4654;
      border-right: 1px solid #3f4654;
      padding: 0 10px;
    }
    .b-l {
      border-left: 1px solid #3f4654;
    }
  }
}
</style>
