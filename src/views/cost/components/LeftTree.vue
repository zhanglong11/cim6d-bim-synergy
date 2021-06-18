<!--
 * @Description: 左侧树
 * @Version: 
 * @Autor: 
 * @Date: 2020-02-24 16:09:48
 * @LastEditTime: 2020-02-24 16:10:11
 -->
<template>
  <div>
    <Block title="单体楼层" sub-title="Individual floor">
      <el-tree default-expand-all show-checkbox :data="treeData"></el-tree>
    </Block>
    <Block title="专业构件" sub-title="Professional building blocks">
      <el-tree default-expand-all show-checkbox :data="treeData"></el-tree>
    </Block>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  }
}
</script>

<style lang="scss" scoped></style>
