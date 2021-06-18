<!--
 * @Description:
 * @Version:
 * @Autor:
 * @Date: 2020-02-25 18:07:29
 * @LastEditTime: 2020-03-17 11:50:18
 -->
<template>
  <div class="m-h aside-right clearfix">
    <BlockTabs :list="tabs" :activeKey="activeKey" @change="changeTab" v-if="!detailsFlag"> </BlockTabs>
    <QualityTesting v-if="activeKey === 1" @goDetails="detailsFlag = true" @goBack="detailsFlag = false" />
    <QualityCheck v-if="activeKey === 2" @goDetails="detailsFlag = true" @goBack="detailsFlag = false" />
  </div>
</template>

<script>
// 质检
import QualityTesting from './qualityTesting'
import QualityCheck from './qualityCheck'
export default {
  components: {
    QualityTesting,
    QualityCheck
  },
  data() {
    return {
      detailsFlag: false,
      activeKey: 1,
      tabs: [
        {
          title: '质量问题',
          value: 1,
          desc: 'quality Problem'
        },
        {
          title: '质量验收',
          desc: 'quality Check',
          value: 2
        }
      ]
    }
  },
  methods: {
    changeTab(e) {
      this.activeKey = e
    }
  }
}
</script>

<style lang="less" scoped>
.aside-right {
  width: 400px;
  float: right;
}
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
