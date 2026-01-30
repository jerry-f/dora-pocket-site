# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

单页 React (TypeScript) 站点，主要交互体验集中在一个较大的组件中。

**技术栈**: Vite + React 19 + Tailwind CSS + shadcn/ui (基于 Radix)

**打包方式**:
- Vite 为主要开发/构建路径
- Parcel 用于生成单文件产物 `bundle.html`

## 常用命令

```bash
pnpm dev        # 启动开发服务器
pnpm build      # TypeScript 编译 + Vite 构建
pnpm lint       # ESLint 检查
pnpm preview    # 预览构建产物
```

## 代码架构

| 位置 | 职责 |
|------|------|
| `src/main.tsx` | 入口挂载文件，仅负责挂载，不放业务逻辑 |
| `src/App.tsx` | 主 UI + 状态 + 道具数据 + 抽取流程 + 弹窗 |
| `src/index.css` | Tailwind 层 + CSS 变量 + `pocket-*` 动画关键帧 |
| `src/components/ui/` | shadcn/ui 基础组件（模板生成，可直接修改） |
| `src/lib/utils.ts` | 共享工具，包含 `cn()` 类名合并函数 |
| `src/hooks/` | 自定义 hooks（含当前未使用的 toast hook） |

## 路径别名

`@/*` 指向 `src/*`，配置分布在：
- `vite.config.ts`
- `tsconfig.json`
- `components.json`

## 项目约定

- **导入路径**: 内部导入优先使用 `@/*` 别名
- **入口纯净**: `src/main.tsx` 只负责挂载
- **注释语言**: 新增/修改注释优先使用中文

## ESLint 特例

- `src/components/ui/**/*.{ts,tsx}` 关闭 `react-refresh/only-export-components`
- `src/hooks/use-toast.ts` 关闭 `@typescript-eslint/no-unused-vars`

## 反模式

- 不要手动编辑 `bundle.html`（生成文件）
- 不要把业务逻辑放进 `src/main.tsx`
- 除非明确要引入 Toast 能力，否则不要扩展 `src/hooks/use-toast.ts`

## CI/CD

`.github/workflows/opencode.yml` - 评论包含 `/oc` 或 `/opencode` 会触发 OpenCode GitHub Action

## 备注

- 当前没有单元/集成/E2E 测试体系
