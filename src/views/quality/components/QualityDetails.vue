<!--
 * @Description: 质量视图详情
 * @Version:
 * @Autor: 申豪强
 * @Date: 2020-03-17 11:08:38
 * @LastEditTime: 2020-03-17 16:59:35
 -->
<!--
  * @任务编号: 2525 || 质量视图新增详情页
  * @开发人员:申豪强
  * @日期:2020-03-17
  * @任务类型: 复制修改代码 60%
  -->
<template>
  <div>
    <Block title="检查计划" sub-title="Security Risk">
      <span slot="btn" @click="goBack"><i class="el-icon-back"></i>返回</span>
      <ul>
        <li class="li-flex">
          <div>
            <p class="title"></p>
            <p class="desc ">建筑</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">检查项目</p>
            <p class="desc ">间距</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">检查数量</p>
            <p class="desc ">1</p>
          </div>
        </li>
        <li class="li-flex">
          <div>
            <p class="title">创建人</p>
            <p class="desc">落落</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">创建日期</p>
            <p class="desc ">2012-02-01</p>
          </div>
        </li>
        <li>
          <p class="title">验收要求</p>
          <p class="desc ">符合要求</p>
        </li>
        <li>
          <p class="title">备注</p>
          <p class="desc ">这是一段备注</p>
        </li>
        <li>
          <p class="title">附件</p>
          <p class="desc "><FileList :ids="orderInfo.fileIds" /></p>
        </li>
      </ul>
    </Block>
    <Block title="检查情况" sub-title="Security Risk">
      <ul>
        <li class="li-flex">
          <div>
            <p class="title">检查部位</p>
            <p class="desc key-pont">钢筋</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">负责人</p>
            <p class="desc key-pont">18798801298</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">时间</p>
            <p class="desc key-pont">2020-02-02</p>
          </div>
        </li>
        <li class="li-flex">
          <div>
            <p class="title">整改措施</p>
            <p class="desc ">建筑</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">负责人</p>
            <p class="desc ">李四</p>
          </div>
          <div class="p-l-10 b-l">
            <p class="title">复查日期</p>
            <p class="desc ">2012-02-01</p>
          </div>
        </li>
        <li>
          <p class="title">备注</p>
          <p class="desc ">洛轴改造项目，根据设计原则进行施工</p>
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
export default {
  methods: {
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
