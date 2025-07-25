// 统一处理 localStorage

import type { ThemeName } from "@/composables/useTheme"
import type { SidebarClosed, SidebarOpened } from "@/constants/app-key"
import type { LayoutsConfig } from "@/layouts/config"
import { CacheKey } from "@/constants/cache-key"

// #region 系统布局配置
export function getLayoutsConfig() {
  const json = localStorage.getItem(CacheKey.CONFIG_LAYOUT)
  return json ? (JSON.parse(json) as LayoutsConfig) : null
}

export function setLayoutsConfig(settings: LayoutsConfig) {
  localStorage.setItem(CacheKey.CONFIG_LAYOUT, JSON.stringify(settings))
}

export function removeLayoutsConfig() {
  localStorage.removeItem(CacheKey.CONFIG_LAYOUT)
}
// #endregion

// #region 侧边栏状态
export function getSidebarStatus() {
  return localStorage.getItem(CacheKey.SIDEBAR_STATUS)
}

export function setSidebarStatus(sidebarStatus: SidebarOpened | SidebarClosed) {
  localStorage.setItem(CacheKey.SIDEBAR_STATUS, sidebarStatus)
}
// #endregion

// #region 正在应用的主题名称
export function getActiveThemeName() {
  return localStorage.getItem(CacheKey.ACTIVE_THEME_NAME) as ThemeName | null
}

export function setActiveThemeName(themeName: ThemeName) {
  localStorage.setItem(CacheKey.ACTIVE_THEME_NAME, themeName)
}
