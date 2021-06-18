/*
   任务名称：增加全局参数缓存
   开发人员：耿为刚
   日期：2020-04-20
   任务描述：全新代码
 */
import { systemConfigApi } from '../api/system-config'
import { removeToken } from '@/utils/auth'
import { getOrigin } from '@/utils/utils'
import router from '@/router'
const state = {
  config: JSON.parse(localStorage.getItem('systemConfig') || '{}') // 全局参数缓存
}

const mutations = {
  // 设置全局参数缓存
  /*
  通过value 获取系统参数label
  group 分组参数
  value 参数编码
  this.$getLabelFromArg(group, value)
  */
  async setSystemConfigStorage(state) {
    const result = await systemConfigApi.queryTreeArg({
      projectId: this.state.project.projectId
    })
    const datas = result.data || []
    const list = {}
    datas.map(items => {
      const listItems = {
        id: items.id,
        label: items.argText,
        value: items.argCode,
        argGroup: items.argGroup,
        children: []
      }
      if (items.children) {
        items.children.map(item => {
          listItems.children.push({
            label: item.argText,
            value: item.argCode,
            argGroup: item.argGroup,
            deleteFlag: item.deleteFlag
          })
        })
      }
      list[items.argCode] = listItems
    })
    console.log(222, list)
    localStorage.setItem('systemConfig', JSON.stringify(list))
    state.config = list
  },
  // 安全退出
  safeLogout() {
    this.state.user = {
      token: '',
      name: '',
      avatar: '',
      companyId: ''
    }
    localStorage.clear()
    sessionStorage.clear()
    removeToken()
    router.push('/')
  }
}

export default {
  state,
  mutations
}
