# 我的个人博客

一个使用 Next.js 构建的现代化个人博客网站，用于记录日常生活和分享想法。

## ✨ 特性

- 📱 **响应式设计** - 完美适配手机、平板和桌面
- 🎨 **现代化界面** - 使用 Tailwind CSS 打造美观的用户界面
- ⚡ **性能优化** - Next.js 提供的服务器端渲染和静态生成
- 📝 **Markdown 支持** - 使用 Markdown 格式写作，支持代码高亮
- 🔍 **SEO 友好** - 自动生成元数据，搜索引擎优化
- 🏷️ **文章归档** - 按时间顺序浏览所有文章
- ⏱️ **阅读时间** - 自动计算文章阅读时间
- 📱 **移动端优化** - 移动设备上的完美体验

## 🛠️ 技术栈

- **框架**: [Next.js 14](https://nextjs.org/)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **图标**: [Lucide React](https://lucide.dev/)
- **Markdown**: [gray-matter](https://github.com/jonschlinkert/gray-matter) + [marked](https://marked.js.org/)
- **日期处理**: [date-fns](https://date-fns.org/)

## 🚀 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- npm、yarn 或 pnpm

### 安装和运行

1. **克隆或下载项目**
   ```bash
   # 如果是从 Git 仓库克隆
   git clone <repository-url>
   cd personal-blog
   
   # 或者直接进入项目目录
   cd personal-blog
   ```

2. **安装依赖**
   ```bash
   npm install
   # 或
   yarn install
   # 或
   pnpm install
   ```

3. **修改 Tailwind 配置（如果需要）**
   
   项目使用了 `@tailwindcss/typography` 插件，需要安装：
   ```bash
   npm install @tailwindcss/typography
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   # 或
   yarn dev
   # 或
   pnpm dev
   ```

5. **打开浏览器**
   
   访问 [http://localhost:3000](http://localhost:3000) 查看你的博客！

## 📝 如何添加文章

1. **创建 Markdown 文件**
   
   在 `posts/` 目录下创建新的 `.md` 文件，例如 `my-new-post.md`

2. **添加 Front Matter**
   
   在文件开头添加文章元数据：
   ```markdown
   ---
   title: "文章标题"
   date: "2024-01-01"
   excerpt: "文章摘要，用于首页展示"
   ---
   
   # 文章内容
   
   这里是你的文章正文...
   ```

3. **编写内容**
   
   使用标准的 Markdown 语法编写文章内容。支持：
   - 标题、段落、列表
   - 代码块和行内代码
   - 引用、链接、图片
   - 表格等

4. **文章将自动显示**
   
   保存文件后，文章会自动出现在首页和归档页面中。

## 📁 项目结构

```
personal-blog/
├── app/                    # Next.js App Router 页面
│   ├── blog/[slug]/       # 动态文章页面
│   ├── about/             # 关于页面
│   ├── archive/           # 归档页面
│   ├── contact/           # 联系页面
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── Header.tsx         # 头部导航
│   ├── Footer.tsx         # 页脚
│   ├── Hero.tsx           # 首页横幅
│   └── PostCard.tsx       # 文章卡片
├── lib/                   # 工具函数
│   └── posts.ts           # 文章数据处理
├── posts/                 # Markdown 文章
│   ├── hello-world.md
│   ├── morning-routine.md
│   └── reading-notes.md
├── public/                # 静态资源
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🎨 自定义配置

### 修改网站信息

1. **网站标题和描述**
   
   编辑 `app/layout.tsx` 中的 metadata：
   ```typescript
   export const metadata = {
     title: '你的博客名称',
     description: '你的博客描述',
   }
   ```

2. **个人信息**
   
   - 修改 `components/Header.tsx` 中的 logo 和导航
   - 更新 `components/Footer.tsx` 中的联系方式
   - 编辑 `app/about/page.tsx` 中的个人介绍

3. **联系方式**
   
   在以下文件中更新你的联系信息：
   - `components/Footer.tsx`
   - `app/about/page.tsx`
   - `app/contact/page.tsx`

### 样式自定义

- 主要样式在 `app/globals.css` 中定义
- 使用 Tailwind CSS 进行样式定制
- 可以修改 `tailwind.config.js` 添加自定义颜色和样式

## 🚀 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub 仓库
2. 在 [Vercel](https://vercel.com) 导入你的仓库
3. 选择 Next.js 模板
4. 一键部署！

### Netlify 部署

1. 将代码推送到 GitHub 仓库
2. 在 [Netlify](https://netlify.com) 连接你的仓库
3. 设置构建命令：`npm run build`
4. 设置发布目录：`.next`
5. 部署！

### 自托管

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm run start
```

## 📋 待办事项

如果你想进一步增强博客功能，可以考虑添加：

- [ ] 评论系统（Disqus、Giscus 等）
- [ ] 文章搜索功能
- [ ] 标签和分类系统
- [ ] RSS 订阅
- [ ] 文章浏览数统计
- [ ] 深色模式
- [ ] 文章分页
- [ ] 相关文章推荐
- [ ] 网站分析（Google Analytics）

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 💬 支持

如果你在使用过程中遇到问题，可以：

1. 查看 [Next.js 文档](https://nextjs.org/docs)
2. 查看 [Tailwind CSS 文档](https://tailwindcss.com/docs)
3. 提交 Issue
4. 发送邮件询问

---

祝你博客写作愉快！✍️