import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      // 这些文件来自组件库模板，包含一些非组件导出；这里关闭仅组件导出限制。
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    files: ['src/hooks/use-toast.ts'],
    rules: {
      // 该文件属于可选能力（Toast），本项目不使用；避免类型专用常量触发无用变量规则。
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
])
