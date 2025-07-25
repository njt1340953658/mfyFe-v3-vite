import { LayoutModeEnum } from "@/constants/app-key"
import { getLayoutsConfig } from "@/utils/cache/local-storage"

/** 项目配置类型 */
export interface LayoutsConfig {
  /** 布局模式 */
  layoutMode: LayoutModeEnum
  /** 是否显示 Logo */
  showLogo: boolean
  /** 是否固定 Header */
  fixedHeader: boolean
  /** 是否显示页脚 */
  showFooter: boolean
  /** 是否显示消息通知 */
  showNotify: boolean
  /** 是否显示切换主题按钮 */
  showThemeSwitch: boolean
  /** 是否显示全屏按钮 */
  showScreenfull: boolean
  /** 开启系统水印 */
  showWatermark: boolean
  /** 是否显示灰色模式 */
  showGreyMode: boolean
  /** 是否显示色弱模式 */
  showColorWeakness: boolean
}

/** 默认配置 */
const DEFAULT_CONFIG: LayoutsConfig = {
  layoutMode: LayoutModeEnum.Left,
  fixedHeader: true,
  showFooter: true,
  showLogo: true,
  showNotify: true,
  showThemeSwitch: true,
  showScreenfull: true,
  showWatermark: false,
  showGreyMode: false,
  showColorWeakness: false
}

/** 项目配置 */
export const layoutsConfig: LayoutsConfig = { ...DEFAULT_CONFIG, ...getLayoutsConfig() }
