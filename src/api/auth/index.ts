import type * as Auth from "./type"
import { request } from "@/utils/service"

const api = {
  captcha: () => "auth/captcha", // 获取登录验证码
  login: () => "auth/login" // 用户登录
}

/** 获取登录验证码 */
function getCaptcha() {
  return request<Auth.CaptchaResponseData>({
    url: api.captcha(),
    method: "get"
  })
}

/** 登录并返回 Token */
function login(data: Auth.LoginRequestData) {
  return request<Auth.LoginResponseData>({
    url: api.login(),
    method: "post",
    data
  })
}

export default {
  getCaptcha,
  login
}

// 向后兼容，保留原有导出方式
export const getCaptchaApi = getCaptcha
export const loginApi = login
