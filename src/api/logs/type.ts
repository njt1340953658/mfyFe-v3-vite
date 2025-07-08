/// <reference path="../../../types/api.d.ts" />

/** 日志列表请求参数 */
export interface LogsListRequestData {
  page?: number
  size?: number
  startTime?: string
  endTime?: string
}

/** 日志列表响应数据 */
export type LogsListResponseData = ApiResponseData<{
  list: LogItem[]
  total: number
}>

/** 日志项 */
export interface LogItem {
  id: string
  timestamp: string
  level: string
  message: string
  ip?: string
  userAgent?: string
}

/** 下载任务请求参数 */
export interface DownloadTaskRequestData {
  startTime: string
  endTime: string
  filters?: Record<string, any>
}

/** 下载任务响应数据 */
export type DownloadTaskResponseData = ApiResponseData<{
  taskId: string
  status: string
}>

/** 下载状态请求参数 */
export interface DownloadStatusRequestData {
  taskId: string
}

/** 下载状态响应数据 */
export type DownloadStatusResponseData = ApiResponseData<{
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress?: number
  downloadUrl?: string
  errorMessage?: string
}>
