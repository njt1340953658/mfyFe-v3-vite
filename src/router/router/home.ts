import type { RouteRecordRaw } from "vue-router"

const homeRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layouts/index.vue"),
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "首页",
          svgIcon: "dashboard"
        }
      }
    ]
  }
]

export default homeRoutes
