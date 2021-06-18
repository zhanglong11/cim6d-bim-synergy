import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
let configEnv = process.env.VUE_APP_BASE_API // 环境变量
// configEnv = '-test'
let timeout = 10000
const service = axios.create({
  baseURL: `/cim6d-bim-synergy${configEnv}`,
  timeout
})
const system = axios.create({
  baseURL: `/cim6d-system${configEnv}`,
  timeout
})
const schedule = axios.create({
  baseURL: `/cim6d-schedule${configEnv}`,
  timeout
})

const iot = axios.create({
  baseURL: `/cim6d-iot${configEnv}`,
  timeout
})

const safety = axios.create({
  baseURL: `/cim6d-quality-safety${configEnv}`,
  timeout
})
const bimBaseUrl = `/cim6d-bim-light${configEnv}`
export const BimBaseUrl = bimBaseUrl
const gis = axios.create({
  baseURL: bimBaseUrl,
  timeout
})
const construction = axios.create({
  baseURL: `/cim6d-construction${configEnv}`,
  timeout
})

const constructionLabour = axios.create({
  baseURL: `/cim6d-construction${configEnv}`,
  timeout
})

const design = axios.create({
  baseURL: `/cim6d-design${configEnv}`,
  timeout
})
const global = axios.create({
  baseURL: `/cim6d-global${configEnv}`,
  timeout
})

const file = axios.create({
  baseURL: `/cim6d-file-storage${configEnv}`,
  timeout
})
addInterceptor(service)
addInterceptor(system)
addInterceptor(schedule)
addInterceptor(gis)
addInterceptor(design)
addInterceptor(safety)
addInterceptor(global)
addInterceptor(iot)
addInterceptor(construction)
addInterceptor(constructionLabour)
addInterceptor(file)

export const filePreviewUrl = `/cim6d-file-storage${configEnv}`

// 监听窗口改变
const onresize = () => {
  setTimeout(() => {
    document.getElementsByClassName('layout-main')[0].style.transform = ''
    let clientWidth = document.documentElement.clientWidth
    let clientHeight = document.documentElement.clientHeight
    window.onresize = () => {
      // 定义窗口大小变更通知事件
      clientWidth = document.documentElement.clientWidth //窗口宽度
      clientHeight = document.documentElement.clientHeight //窗口高度
      changeLayoutMain(clientWidth, clientHeight)
    }
    changeLayoutMain(clientWidth, clientHeight)
  }, 500)
}
// 自动缩放
const changeLayoutMain = (clientWidth, clientHeight) => {
  const defaultWidth = 1920
  let layoutMain = document.getElementsByClassName('layout-main')
  let mainHeight = layoutMain[0].clientHeight
  let proportion = clientWidth / defaultWidth
  if (clientHeight < mainHeight) {
    proportion = clientHeight / mainHeight
  }
  if (clientWidth < defaultWidth || clientHeight < mainHeight) {
    layoutMain[0].style.transform = `scale(${proportion})`
  } else {
    layoutMain[0].style.transform = ''
  }
}

function addInterceptor(service) {
  // request interceptor
  service.interceptors.request.use(
    config => {
      if (store.getters.token) {
        config.headers['x-access-token'] = getToken()
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  // response interceptor
  service.interceptors.response.use(
    response => {
      const res = response.data
      if (response.config.responseType === 'blob') {
        return response
      }
      if (response.config.type === 'prevention') {
        return response.data
      }
      if (response.config.url.indexOf('.json') > -1 && response.data instanceof Array) {
        return response.data
      }

      // if the custom code is not 20000, it is judged as an error.
      if (!res.success && res.code !== 200) {
        Message({
          message: res.message || res.msg || 'Error',
          type: 'error',
          duration: 2 * 1000
        })
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        onresize()
        return res
      }
    },
    error => {
      console.log('err' + error) // for debug
      Message({
        message: error.message,
        type: 'error',
        duration: 2 * 1000
      })
      return Promise.reject(error)
    }
  )
}
export const post = (url, data, config = {}) => {
  return service.post(url, data, config)
}
export const get = (url, data, baseURL = `/cim6d-system${configEnv}`) => {
  return service.get(url, {
    params: data,
    baseURL: baseURL
  })
}

service.service = service
service.schedule = schedule
service.system = system
service.gis = gis
service.design = design
service.safety = safety
service.global = global
service.iot = iot
service.construction = construction
service.constructionLabour = constructionLabour
service.file = file
export default service
