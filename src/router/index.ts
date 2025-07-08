import type { RouteRecordRaw } from "vue-router"
import { createRouter } from "vue-router"
import { flatMultiLevelRoutes, routerConfig } from "@/router/config"
import { registerNavigationGuard } from "@/router/RouterLogic"

const routerList = import.meta.glob("./router/*.ts", { import: "default", eager: true })

export const routers: RouteRecordRaw[] = Object.values(routerList).flat() as RouteRecordRaw[]

export const constantRoutes: RouteRecordRaw[] = routers

export const dynamicRoutes: RouteRecordRaw[] = routers.filter((item: RouteRecordRaw) =>
  item.meta && typeof item.meta === "object" && "roles" in item.meta && Array.isArray(item.meta.roles) && item.meta.roles.length > 0
)

/** 路由实例 */
export const router = createRouter({
  history: routerConfig.history,
  routes: routerConfig.thirdLevelRouteCache ? flatMultiLevelRoutes(constantRoutes) : constantRoutes
})

/** 重置路由 */
export function resetRouter() {
  try {
    // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta && typeof meta === "object" && "roles" in meta && Array.isArray(meta.roles) && meta.roles.length > 0) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    location.reload()
  }
}

// 注册路由导航守卫
registerNavigationGuard(router)
