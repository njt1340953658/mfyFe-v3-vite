import { ElBadge, ElMessage, ElMessageBox } from "element-plus"
import { h } from "vue"
import { useUserStore } from "@/pinia/stores/user"
import { isArray } from "@/utils/validate"

// 异步函数
export const sleep = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms))

export function BadgeRender(type: any, content: string) {
  return [h(ElBadge, { isDot: true, type, style: { marginTop: "8px", marginRight: "5px" } }), h("span", content)]
}

export function _isPcScreen() {
  const rect = document.body.getBoundingClientRect()
  return rect.width - 1 < 1670
}

/** 全局权限判断函数，和权限指令 v-permission 功能类似 */
export function checkPermission(permissionRoles: string[]): boolean {
  if (isArray(permissionRoles) && permissionRoles.length > 0) {
    const { roles } = useUserStore()
    return roles.some(role => permissionRoles.includes(role))
  } else {
    console.error("参数必须是一个数组且长度大于 0，参考：checkPermission(['admin', 'editor'])")
    return false
  }
}

/** 将全局 CSS 导入 JS 中使用 没有拿到值时，会返回空串 */
export function getCssVariableValue(cssVariableName: string) {
  let cssVariableValue = ""
  try {
    cssVariableValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariableName)
  } catch (error) {
    console.error(error)
  }
  return cssVariableValue
}

// 字符串拼接a=1&b=2
export function stringify(obj: object) {
  if (!obj) return false
  return Object.entries(obj)
    .map(item => `${item[0]}=${item[1]}`)
    .join("&")
}

/**
 * @param {object} props
 * @description 针对搜索值做统一处理
 */
export function convertParams(props: any) {
  const newParams: any = {}
  for (const index in props) {
    const item = props[index]
    const type = typeof item
    if (item || item === 0) {
      if (item && type === "string") {
        newParams[index] = item.replace(/(^\s+)|(\s+$)/g, "")
      } else if (Object.prototype.toString.call(item) === "[object Object]") {
        newParams[index] = convertParams(item)
      } else {
        newParams[index] = item
      }
    }
  }
  return newParams
}

// 拷贝复制内容
export function onCopyText(content: string) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(content).then(
      () => {
        ElMessage.success("复制成功！")
      },
      () => ElMessage.error("复制失败！")
    )
  } else {
    const textArea = document.createElement("textarea")
    textArea.value = content
    textArea.style.position = "absolute"
    textArea.style.opacity = "0"
    textArea.style.left = "-999999px"
    textArea.style.top = "-999999px"
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    document.execCommand("copy")
    ElMessage.success("复制成功！")
    textArea.remove()
  }
}

// 全局信息提示弹框提醒
export function publicMessageBox({ content, httpApi, message, fetch }: any) {
  return ElMessageBox.confirm(content, "提示", {
    confirmButtonText: "确 定",
    cancelButtonText: "取 消",
    type: "warning",
    beforeClose: async (action, instance, done) => {
      if (action === "confirm") {
        instance.confirmButtonLoading = true
        try {
          const res: any = await httpApi()
          instance.confirmButtonLoading = false
          if (res?.code === 0) {
            done()
          }
        } catch (err) {
          instance.confirmButtonLoading = false
          throw err
        }
      } else {
        done()
      }
    }
  })
    .then(() => {
      fetch()
      ElMessage.success(message)
    })
    .catch(() => {})
}

/**
 * @param {number} timelong 时间
 * @param {string} format 格式类型
 * @description 时间转换格式方法
 */
export function formatDateTime(timelong: any, format = "YYYY-MM-DD") {
  if (!timelong) return ""
  function format2n(val: number) {
    return val < 10 ? `0` + `${val}` : val
  }
  const date = new Date(timelong)
  const year = `${date.getFullYear()}`
  const month = `${format2n(date.getMonth() + 1)}`
  const day = `${format2n(date.getDate())}`
  const hour = `${format2n(date.getHours())}`
  const minute = `${format2n(date.getMinutes())}`
  const second = `${format2n(date.getSeconds())}`
  return format
    .replace(/YYYY/g, year)
    .replace(/YYY/g, year.slice(1))
    .replace(/YY/g, year.slice(2))
    .replace(/Y/g, year.slice(1))
    .replace(/MM/g, month)
    .replace(/M/g, month.slice(1))
    .replace(/DD/g, day)
    .replace(/D/g, day.slice(1))
    .replace(/hh/g, hour)
    .replace(/h/g, hour.slice(1))
    .replace(/mm/g, minute)
    .replace(/m/g, minute.slice(1))
    .replace(/ss/g, second)
    .replace(/s/g, second.slice(1))
}

/**
 * 计算两个日期时间相差的年数、月数、天数、日期时间
 * console.log(formatExpirationTime('2019-6-30', '2020-10-01'))
 */

export function formatExpirationTime(startTime: any, endTime: any) {
  function getDays(month: any, year: any) {
    let days = 30
    if (month === 2) {
      days = year % 4 === 0 ? 29 : 28
    } else if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
      days = 31
    }
    return days
  }

  const start: any = new Date(startTime)
  const end: any = new Date(endTime)
  const diffValue = end - start

  const startYear = start.getFullYear()
  const endYear = end.getFullYear()
  const startMonth = start.getMonth() + 1
  const endMonth = end.getMonth() + 1
  const startDay = start.getDate()
  const endDay = end.getDate()
  const startHours = start.getHours()
  const endHours = end.getHours()
  const startMinutes = start.getMinutes()
  const endMinutes = end.getMinutes()
  const startSeconds = start.getSeconds()
  const endSeconds = end.getSeconds()

  const diffYear = endYear - startYear
  const startDays = getDays(startMonth, startYear)
  const endDays = getDays(endMonth, endYear)

  const diffStartMonth = (startDays - (startDay + (startHours * 60 + startMinutes + startSeconds / 60) / 60 / 24 - 1)) / startDays
  const diffEndMonth = (endDay + (endHours * 60 + endMinutes + endSeconds / 60) / 60 / 24 - 1) / endDays
  const diffMonth = diffStartMonth + diffEndMonth + (12 - startMonth - 1) + endMonth + (diffYear - 1) * 12
  const diffYearFloat = diffMonth / 12

  const year = Math.floor(diffYearFloat)
  const month = Math.round((diffYearFloat - year) * 12)
  const diffDays = endDay - startDay > 0 ? `${endDay - startDay}天` : ""
  const day = (Number.parseInt((diffValue / 1000 / 60 / 60 / 24).toString()) % 365) % 30

  if (diffValue >= 8.64e7 * 30 && diffValue >= 8.64e7 * 365) {
    return `${year ? `${year}年` : ""}${month ? `${month}个月` : ""}${diffDays}`
  } else if (diffValue >= 8.64e7 * 30 && diffValue < 8.64e7 * 365) {
    return month === 12 ? `1年${diffDays}` : `${Math.floor(month)}个月${diffDays}`
  } else if (diffValue >= 8.64e7) {
    return `${day}天`
  } else {
    return endTime
  }
}

/** 判断json对象 */
export function isJson(obj: any) {
  const isjson = typeof obj == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length
  return isjson
}

/** 判断变量是否存在 */
export function isEmpty(val: any) {
  return val === undefined || val === "undefined" || val === "" || val === null || val === "null"
}

/**
/**
/**
 * @descripting 字节大小格式化
 * @param {string | number} size 为传入的数据大小
 */
export function bytesToSize(size: any) {
  if (!size) return "0.00"
  const pow1024 = (num: any) => 1024 ** num
  if (size < pow1024(1)) return `${size} B`
  if (size < pow1024(2)) return `${(size / pow1024(1)).toFixed(2)} KB`
  if (size < pow1024(3)) return `${(size / pow1024(2)).toFixed(2)} MB`
  if (size < pow1024(4)) return `${(size / pow1024(3)).toFixed(2)} GB`
  return `${(size / pow1024(4)).toFixed(2)} TB`
}

/**
/**
 * @descripting 存储大小转换、流量转换
 * @param {string | number} sizeStr 为传入的数据大小
 * @param {string} unit 为初始数据的单位，默认为B
 * @param {string} flag 为把0处理为0+单位[unit]
 */
export function formatSizeStr(sizeStr: any, unit?: any, flag?: any) {
  if (sizeStr === "--") return "--"
  if (Number(sizeStr) === 0 && flag) return `0 ${unit}`
  if (Number(sizeStr) === 0) return "0"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
  let i = Math.floor(Math.log(Number(sizeStr)) / Math.log(k))
  i = i < 0 ? 0 : i
  let item = Number(sizeStr) / k ** i // k ** i 等同于 Math.pow(k, i)
  if (Number.parseInt(String(item), 10) !== item) {
    item = Number(item.toString().match(/^\d+(?:\.\d{0,2})?/))
  }
  if (unit) {
    for (let j = 0; j < sizes.length; j += 1) {
      if (sizes[j] === unit) {
        i += j
      }
    }
  }
  return `${item} ${sizes[i]}`
}

/** 带宽计算 */
export function handleFormatter(value: any) {
  let num = null
  let unit = 0
  const reg = /\./
  if (Number(value) > 999999999) {
    const lastFixed: any = Number(value / 1000000000)
    unit = reg.test(lastFixed) ? 2 : 0
    num = `${lastFixed.toFixed(unit)} Gbps`
  } else if (Number(value) < 999999999 && Number(value) > 999999) {
    const lastFixed: any = Number(value / 1000000)
    unit = reg.test(lastFixed) ? 2 : 0
    num = `${lastFixed.toFixed(unit)} Mbps`
  } else if (Number(value) < 999999 && Number(value) > 999) {
    const lastFixed: any = Number(value / 1000)
    unit = reg.test(lastFixed) ? 2 : 0
    num = `${lastFixed.toFixed(unit)} Kbps`
  } else {
    num = `${Number(value).toFixed(0)} bps`
  }
  return num
}

/**
 * @descripting 轮询功能
 * @param {Function} callback 回调事件
 * @param {number} interval 轮询间隔时间
 */
export function pollingHttp(callback: any, interval = 2000) {
  let timer: any
  let isStop = false
  const stop = () => {
    isStop = true
    clearTimeout(timer)
  }
  const start = async () => {
    isStop = false
    await loopEvent()
  }
  const loopEvent = async () => {
    try {
      await callback(stop)
    } catch (err) {
      throw new Error(`轮询出错：${err}`)
    }
    if (isStop) return
    return (timer = setTimeout(loopEvent, interval))
  }
  return { start, stop }
}

/**
 * @param {Array} data 目标数组
 * @param {string} label 目标key值
 * @descripting 求数组内key相同放一个新数组内
 */
export function targetArrayFormatter(data: any, label: any) {
  if (!data || !data.length) return []
  const groups = data.reduce((acc: any, curr: any) => {
    if (!acc[curr[label]]) {
      acc[curr[label]] = []
    }
    acc[curr[label]].push(curr)
    return acc
  }, {})
  const result = Object.entries(groups)
    .sort((a, b) => (b[1] as []).length - (a[1] as []).length)
    .map(([key, value]) => ({ [key]: value }))
  return result
}

/**
 * @param {Array} data 目标数组
 * @param {string} pid 目标key值
 * @descripting 根据parentId将数据递归成树状
 */
export function formatToTree(data: any, pid?: any, lable = "parentId") {
  if (!data?.length) return []
  return data
    .filter((item: any) => (!pid ? item[lable] === 0 : item[lable] === pid))
    .map((item: any) => {
      item.children = formatToTree(data, item.id)
      return item
    })
}

/**
 * @param {Array} formSearch 目标数组
 * @param {string} label 目标key值
 * @param {string} value 目标value值
 * @param {string} maxlength 目标value最大长度
 * @descripting input渲染长度校验
 */
export function handleOnInput(formSearch: any, label: any, value: any, maxlength?: any) {
  if (value && Number(value) < 0) {
    formSearch[label] = undefined
  }
  if (maxlength && value && value.length > maxlength) {
    formSearch[label] = formSearch[label].slice(0, maxlength)
  }
}

/* @param {Object} response 请求响应
 * @descripting 根据请求下载文件流
 */
export function downloadFile(response: any) {
  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement("a")
  link.href = url
  link.setAttribute("download", decodeURIComponent(response.headers["content-disposition"].split("=")[1])) // 获取文件名并解码
  document.body.appendChild(link)
  link.click()
}
