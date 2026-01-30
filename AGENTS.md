# 项目知识库

生成时间: {TIMESTAMP}
提交: {SHORT_SHA}
分支: {BRANCH}

## 概览
- 应用: 单页 React (TypeScript) 站点; 主要交互体验集中在一个较大的组件中。
- 技术栈: Vite + React + Tailwind CSS; shadcn/ui 基础组件(基于 Radix)已直接放入仓库。
- 打包: Vite 为主要开发/构建路径; 另外保留 Parcel 配置用于生成单文件产物 `bundle.html`。

## 目录结构
```text
./
├── .github/
│   └── workflows/
│       └── opencode.yml          # OpenCode 的 GitHub Action 触发器
├── public/                       # 静态公共资源
├── src/
│   ├── components/
│   │   └── ui/                   # shadcn/ui 基础组件(模板生成/可直接修改)
│   ├── hooks/                    # 自定义 hooks (包含当前未使用的 toast hook)
│   ├── lib/                      # 共享工具(例如 cn())
│   ├── App.tsx                   # 主 UI + 状态 + 道具数据
│   ├── index.css                 # Tailwind 层 + CSS 变量 + pocket-* 动画
│   └── main.tsx                  # 入口挂载文件(仅挂载)
├── dist/                         # Vite 构建输出(生成文件)
├── bundle.html                   # 单文件产物(生成文件)
├── index.html                    # Vite 入口 HTML
├── vite.config.ts                # Vite 配置(定义 @ -> ./src 别名)
├── eslint.config.js              # ESLint flat config (含仓库特例)
├── components.json               # shadcn/ui 配置 + 路径别名
├── tailwind.config.js            # Tailwind 配置
├── postcss.config.js             # PostCSS 配置
├── tsconfig.json                 # TS 路径别名(引用 app/node 配置)
├── tsconfig.app.json             # App TS 配置(严格)
├── tsconfig.node.json            # Node/Vite TS 配置(严格)
└── .parcelrc                     # Parcel 配置(含 TS path resolver)
```

## 去哪里改
| 任务 | 位置 | 备注 |
|------|------|------|
| 应用入口/挂载 | `src/main.tsx` | 保持“只做挂载, 不放业务逻辑”。
| 主 UI/业务逻辑 | `src/App.tsx` | 道具数据、抽取流程、弹窗、状态都在这里。
| 全局样式/动画 | `src/index.css` | CSS 变量 + `pocket-*` 关键帧。
| UI 基础组件 | `src/components/ui/*` | shadcn/ui 组件(模板派生)。
| Tailwind 主题 | `tailwind.config.js`, `src/index.css` | 使用 CSS 变量映射颜色。
| 路径别名 | `vite.config.ts`, `tsconfig*.json`, `components.json` | `@/*` 指向 `src/*`。
| CI 自动化 | `.github/workflows/opencode.yml` | 评论包含 `/oc` 或 `/opencode` 会触发。
| 单文件打包 | `.parcelrc`, `bundle.html` | `bundle.html` 为生成产物, 不手改。

## 约定(本仓库)
- 路径导入: 内部导入优先用 `@/*`。
- 入口纯净: `src/main.tsx` 只负责挂载。
- 注释语言: 新增/修改注释优先使用中文(仓库现有注释以中文为主)。
- shadcn/ui 布局: 基础组件在 `src/components/ui`, 公共 class 合并工具在 `src/lib/utils.ts` (`cn()`)。
- ESLint 特例:
  - `src/components/ui/**/*.{ts,tsx}` 关闭 `react-refresh/only-export-components`。
  - `src/hooks/use-toast.ts` 关闭 `@typescript-eslint/no-unused-vars` (该文件当前未接入)。

## 反模式
- 不要手动编辑 `bundle.html` (生成文件)。
- 不要把业务逻辑放进 `src/main.tsx`。
- 除非明确要引入 Toast 能力, 否则不要在 `src/hooks/use-toast.ts` 上继续扩展。

## 命令
```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## 备注
- 测试: 当前没有单元/集成/E2E 测试体系。
- 编辑器工具: 此执行环境未安装 TypeScript language server, CLI 侧 LSP 诊断不可用。
