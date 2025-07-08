## 🚀 快速开始

### 环境要求

- **Node.js**: 20.19+ 或 22.12+
- **pnpm**: 10.0+
- **现代浏览器**: Chrome 88+、Edge 88+、Firefox 78+、Safari 14+

### 本地开发

```bash
# 进入项目目录
cd mfy-fe-admin

# 安装依赖
npm run setup
# 或
pnpm install

# 启动开发服务器
pnpm dev
```

访问 [http://localhost:3333](http://localhost:3333) 查看项目

### 构建部署

```bash
# 构建测试发布环境
pnpm build:test

# 构建生产环境
pnpm build

# 本地预览构建结果
pnpm preview
```

## 📁 项目结构

```
mfy-fe-admin/
├── public/                     # 静态资源
├── src/
│   ├── api/                    # API 接口管理
│   │   ├── auth/              # 认证相关接口
│   │   ├── users/             # 用户相关接口
│   │   └── logs/              # 日志相关接口
│   ├── assets/                # 资源文件
│   │   ├── icons/             # SVG 图标
│   │   ├── images/            # 图片资源
│   │   └── styles/            # 样式文件
│   ├── components/            # 全局组件
│   │   ├── Notify/            # 通知组件
│   │   ├── Screenfull/        # 全屏组件
│   │   └── ThemeSwitch/       # 主题切换
│   ├── composables/           # 组合式函数
│   ├── constants/             # 常量定义
│   ├── layouts/               # 布局组件
│   ├── pinia/                 # 状态管理
│   │   └── stores/            # Store 模块
│   ├── plugins/               # 插件配置
│   ├── router/                # 路由配置
│   ├── utils/                 # 工具函数
│   │   ├── cache/             # 缓存工具
│   │   └── service.ts         # HTTP 请求封装
│   └── views/                 # 页面组件
│       ├── dashboard/         # 仪表板
│       ├── login/             # 登录页
│       └── error/             # 错误页面
├── types/                     # 类型定义
└── vite.config.ts            # Vite 配置
```

### 🔐 权限管理

- **页面权限**: 基于路由元信息的页面级权限控制
- **按钮权限**: 支持指令式和函数式按钮权限控制
- **动态路由**: 根据用户角色动态生成可访问路由
- **路由守卫**: 完善的导航守卫和权限验证

### 🎨 主题系统

- **多主题切换**: 浅色、深色、深蓝三种内置主题
- **实时切换**: 无需刷新页面即可切换主题
- **持久化**: 主题偏好自动保存到本地存储

### 📱 响应式布局

- **多布局模式**: 左侧、顶部、混合三种布局
- **移动端适配**: 完美支持移动设备访问
- **动态侧边栏**: 可折叠的导航菜单

### 🔄 API 管理

- **统一请求封装**: 标准化的 HTTP 请求处理
- **自动错误处理**: 统一的错误拦截和提示
- **类型安全**: 完整的 TypeScript 类型支持
- **请求优化**: 移除重试机制，提升响应速度

## 📝 API 使用指南

本项目采用统一的 API 管理模式：

```typescript
// API 路径定义
const api = {
  login: () => "auth/login",
  getUserInfo: () => "users/me"
}

// API 函数实现
function login(data: LoginRequestData) {
  return request<LoginResponseData>({
    url: api.login(),
    method: "post",
    data
  })
}

// 统一导出
export default { login }
```

### 使用示例

```typescript
import authApi from "@/api/auth"
import userApi from "@/api/users"

// 用户登录
const loginResult = await authApi.login({
  username: "admin",
  password: "123456",
  code: "1234"
})

// 获取用户信息
const userInfo = await userApi.getCurrentUser()
```

## 🛠️ 开发指南

### 代码规范

项目使用 ESLint 进行代码检查，提交前会自动格式化代码：

```bash
# 手动检查代码
pnpm lint

# 修复代码格式问题
pnpm lint --fix
```

### 环境变量

```bash
# 开发环境
VITE_BASE_API=http://localhost:3000
VITE_ROUTER_HISTORY=history
VITE_PUBLIC_PATH=/

# 生产环境
VITE_BASE_API=https://api.example.com
VITE_ROUTER_HISTORY=hash
VITE_PUBLIC_PATH=/admin/
```

## 🔧 配置说明

### Vite 配置

- **路径别名**: `@` 指向 `src` 目录
- **代理配置**: 开发环境 API 代理
- **构建优化**: 代码分割、Tree Shaking
- **插件集成**: 自动导入、SVG 组件化

### TypeScript 配置

- **严格模式**: 启用所有严格类型检查
- **路径映射**: 支持 `@/*` 路径别名
- **自动类型生成**: 组件和 API 自动类型推导

## 📊 性能优化

- **按需加载**: 路由和组件懒加载
- **代码分割**: 第三方库单独打包
- **资源优化**: 图片压缩、SVG 雪碧图
- **缓存策略**: 合理的缓存配置
- **构建优化**: Tree Shaking、代码压缩
