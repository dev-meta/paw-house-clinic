# 爪爪动物医院

移动端优先的 Next.js App Router 项目，包含预约挂号、医生选择、疫苗预约和宠物健康档案。使用演示数据，预约记录保存在当前浏览器的 localStorage。

## 本地开发

使用 Node.js 24.19.0 和 pnpm 11.20.0，在项目目录运行：

```sh
pnpm install --frozen-lockfile
pnpm dev
```

打开终端显示的本地地址。页面组件位于 app/page.jsx，响应式样式位于 app/globals.css，猫狗插画位于 public/companions.svg。

## 构建并部署到 Cloudflare Pages

运行 `pnpm build` 后，静态站点生成在 `out/`。可以直接将该目录上传至 Pages，也可以将项目推送到自己的 Git 仓库，然后在 Pages 连接该仓库并配置：

- 框架预设：Next.js (Static HTML Export)
- 根目录：包含本项目 package.json 的目录
- 构建命令：pnpm build
- 输出目录：out
- 构建环境变量：PNPM_VERSION=11.20.0，NODE_VERSION=24.19.0

详见 [Cloudflare Pages 静态 Next.js 部署指南](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/)。
