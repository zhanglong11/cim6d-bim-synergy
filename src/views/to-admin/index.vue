<template>
  <div></div>
</template>

<script>
import { homeApi } from '@/views/construction/api/home-api'
export default {
  data() {
    //这里存放数据
    return {
      token: this.$route.query.token,
      projectId: this.$route.query.projectId
    }
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.init()
  },
  //方法集合
  methods: {
    // 初始化
    init() {
      if (!this.token) {
        return
      }
      this.$store.dispatch('user/toLogin', this.token)
      this.getProject()
    },
    // 查询项目详情
    async getProject() {
      if (!this.projectId) {
        return
      }
      const result = await homeApi.getProject(this.projectId)
      const datas = result.data
      datas.projectId = this.projectId
      this.selectProject(datas)
    },
    // 选择项目
    async selectProject(obj) {
      this.$store.commit('setProjectLocalStorage', {
        ...obj,
        ...{ projectLongitude: obj.longitude || null, projectLatitude: obj.latitude || null }
      })
      this.$store.commit('setSystemConfigStorage')
    }
  }
}
</script>
