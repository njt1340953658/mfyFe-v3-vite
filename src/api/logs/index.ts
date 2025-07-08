import type * as Logs from "./type"
import { request } from "@/utils/service"

const api = {
  logslist: () => "/api/openresty/access/getlist", // 获取日志列表
  logstaskid: () => "/api/openresty/access/download", // 下载日志获取任务id
  downloadUrl: () => "/api/openresty/access/task/status" // 下载url获取
}

/** 获取日志列表 */
function logslist(params: Logs.LogsListRequestData = {}) {
  return request<Logs.LogsListResponseData>({
    url: api.logslist(),
    method: "get",
    params
  })
}

/** 下载日志获取任务id */
function logstaskid(data: Logs.DownloadTaskRequestData) {
  return request<Logs.DownloadTaskResponseData>({
    url: api.logstaskid(),
    method: "post",
    data
  })
}

/** 获取下载url */
function downloadUrl(data: Logs.DownloadStatusRequestData) {
  return request<Logs.DownloadStatusResponseData>({
    url: api.downloadUrl(),
    method: "post",
    data
  })
}

export default {
  logslist,
  logstaskid,
  downloadUrl
}
