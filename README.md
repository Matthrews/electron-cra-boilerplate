# electron-cra-boilerplate

> A quick start template with Electron+CRA+Webpack+Redux+TypeScript+ElectronBuilder app

## scripts

### 开发环境启动

```bash
yarn electron-dev
```

## 搭建过程

1. 使用 CRA 创建 React+TypeScript 项目

```bash
npx create-react-app my-electron-app --template typescript
```

2. 使用 Ant Design 搭建页面

3. 使用 Redux 创建一个 TodoApp

4. 使用 Highchats 和 Echarts 创建可视化样例页面

5. 使用 react-markdown-editor-lite 创建编辑器样例页面

6. 引入 electron 和 electron-builder

> 注意：`webpack.config.js`的`target`要设置为`electron-renderer`


## TODO 

1. 文件后缀统一
2. Webpack 使用`rescripts`替代`react-scripts`
