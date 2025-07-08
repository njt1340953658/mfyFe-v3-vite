import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import axios from "axios"
import { ElMessage } from "element-plus"
import { get } from "lodash-es"
import { useUserStore } from "@/pinia/stores/user"
import { getToken } from "@/utils/cache/cookies"

// 请求配置接口
interface RequestConfig extends AxiosRequestConfig {
  url: string
  method?: "get" | "post" | "put" | "delete" | "patch"
  data?: any
  params?: any
}

export const baseURL = `${import.meta.env.VITE_BASE_API}/cdn-manager/admin`

const httpReg = /^(?=(http:\/\/|https:\/\/))/

const service = createService()

/**
 * 统一请求函数
 * @param config 请求配置
 * @returns Promise<ApiResponseData<T>>
 */
function request<T = any>(config: RequestConfig): Promise<ApiResponseData<T>> {
  // 处理 URL
  const { url } = config

  const requestConfig: AxiosRequestConfig = {
    ...config,
    url,
    timeout: 1000 * 60 * 5,
    baseURL: httpReg.test(config.url) ? undefined : import.meta.env.VITE_BASE_API,
    headers: {
      "Authorization": `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      ...config.headers
    }
  }

  return service(requestConfig).then(response => response.data)
}

/**
 * 错误消息处理
 * @param data 错误数据
 */
function showErrorMessage(data: { message: string }): void {
  if (getToken()) {
    ElMessage.error(data.message)
  } else {
    const userStore = useUserStore()
    userStore.resetToken()
    setTimeout(() => {
      location.reload()
    }, 1000)
  }
}

/**
 * 创建请求实例
 */
function createService(): AxiosInstance {
  // 创建一个 Axios 实例
  const service = axios.create()

  // 请求拦截
  service.interceptors.request.use(
    config => config,
    error => Promise.reject(error)
  )

  // 响应拦截
  service.interceptors.response.use(
    (response: AxiosResponse<ApiResponseData<any>>) => {
      const contentType = response.headers["content-type"]

      // 处理文件下载类型的响应
      if (contentType === "application/force-download" || contentType === "application/octet-stream") {
        return response
      }

      const apiData = response.data
      const code = apiData.code

      if (code === undefined) {
        ElMessage.error("非本系统的接口")
        return Promise.reject(new Error("非本系统的接口"))
      }

      switch (code) {
        case 0:
          return response // code === 0 代表没有错误，返回完整响应
        case 401:
          showErrorMessage(apiData)
          return Promise.reject(new Error(apiData.message || "Unauthorized"))
        case 403:
          showErrorMessage(apiData)
          return Promise.reject(new Error(apiData.message || "Forbidden"))
        default: // 不是正确的 Code
          ElMessage.error(apiData.message || "Error")
          return Promise.reject(new Error(apiData.message || "Error"))
      }
    },
    (error) => {
      // HTTP 状态码错误处理
      const status = get(error, "response.status")

      switch (status) {
        case 400:
          error.message = "请求错误"
          break
        case 401:
          // Token 过期时，直接退出登录并强制刷新页面（会重定向到登录页）
          useUserStore().logout()
          location.reload()
          break
        case 403:
          error.message = "拒绝访问"
          break
        case 404:
          error.message = "请求地址出错"
          break
        case 408:
          error.message = "请求超时"
          break
        case 500:
          error.message = "服务器内部错误"
          break
        case 501:
          error.message = "服务未实现"
          break
        case 502:
          error.message = "网关错误"
          break
        case 503:
          error.message = "服务不可用"
          break
        case 504:
          error.message = "网关超时"
          break
        case 505:
          error.message = "HTTP 版本不受支持"
          break
        default:
          break
      }

      ElMessage.error(error.message)
      return Promise.reject(error)
    }
  )

  return service
}

export { request, service }
