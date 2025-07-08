import type * as Users from "./type"
import { request } from "@/utils/service"

const api = {
  getCurrentUser: () => "users/me" // 获取当前登录用户详情
}

/** 获取当前登录用户详情 */
function getCurrentUser() {
  return request<Users.CurrentUserResponseData>({
    url: api.getCurrentUser(),
    method: "get"
  })
}

export default {
  getCurrentUser
}

// 向后兼容，保留原有导出方式
export const getCurrentUserApi = getCurrentUser
