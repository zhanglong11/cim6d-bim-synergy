/*
 * @Description:
 * @Version:
 * @Autor:
 * @Date: 2020-02-24 17:24:32
 * @LastEditTime: 2020-02-24 17:24:51
 */
import { JSEncrypt } from 'jsencrypt'
/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function() {
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()
// 登录加密
export const userEncryption = obj => {
  let PUBLIC_KEY =
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQChqImB8Pz4nTh3UBbA5m9zb+YCIwvop1Zxr8Bii6xoEt6+znWy/2WVXMV/NH28Yq34cH68VdcKSikEQlGnAqhci+9rrjVo0/vS2/D6RJcihXqfST9ZOMFsRJgxAQWyIbjL/Gf7HD5NrCM54TE+YOk/P6eI5Nc8lbkxXEavrLDtOwIDAQAB'

  // 使用公钥加密
  let encrypt = new JSEncrypt()
  encrypt.setPublicKey(PUBLIC_KEY)
  let loginName = encrypt.encrypt(obj.loginName)
  let password = encrypt.encrypt(obj.password)
  return {
    loginName,
    password
  }
}

// 获取其他平台地址
export const getOrigin = (num = 1, port) => {
  const origin = location.origin
  const lastOrigin = parseInt(origin[origin.length - 1]) + num
  const newOrigin = origin.substring(0, origin.length - 1) + lastOrigin
  let url = `${newOrigin}/#`
  if (port) {
    // 跳转指定系统端口
    url = `http://${location.hostname}:${port}/#`
  }
  return url
}

export default {
  off,
  on,
  getOrigin
}
