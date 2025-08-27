# 博客部署指南

## 🚀 部署到 Vercel（推荐）

### 方式一：通过 GitHub 自动部署

1. **上传代码到 GitHub**
   ```bash
   # 在项目目录中执行
   git init
   git add .
   git commit -m "初始化博客项目"
   
   # 创建 GitHub 仓库后
   git remote add origin https://github.com/你的用户名/你的仓库名.git
   git branch -M main
   git push -u origin main
   ```

2. **连接 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub 账号登录
   - 点击 "New Project"
   - 选择你的博客仓库
   - 点击 "Deploy"

3. **等待部署完成**
   - Vercel 会自动检测 Next.js 项目
   - 几分钟后，你的博客就上线了！

### 方式二：Vercel CLI 部署

1. **安装 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署**
   ```bash
   # 在项目目录中执行
   vercel
   
   # 生产环境部署
   vercel --prod
   ```

## 🌐 其他部署选项

### Netlify
1. 拖拽项目文件夹到 [netlify.com](https://netlify.com)
2. 或连接 GitHub 仓库自动部署

### 阿里云/腾讯云服务器
1. **准备服务器环境**
   ```bash
   # 安装 Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # 安装 PM2
   npm install -g pm2
   ```

2. **上传代码并构建**
   ```bash
   # 在服务器上
   git clone https://github.com/你的用户名/你的仓库名.git
   cd 你的仓库名
   npm install
   npm run build
   ```

3. **启动应用**
   ```bash
   # 使用 PM2 管理进程
   pm2 start npm --name "blog" -- start
   pm2 startup
   pm2 save
   ```

4. **配置 Nginx**
   ```nginx
   server {
       listen 80;
       server_name 你的域名.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## ⚙️ 环境变量配置

在部署平台设置以下环境变量：

```
NEXT_PUBLIC_SITE_URL=https://你的域名.com
NEXT_PUBLIC_SITE_NAME=你的博客名称
NEXT_PUBLIC_SITE_DESCRIPTION=博客描述
NEXT_PUBLIC_AUTHOR_EMAIL=你的邮箱
NEXT_PUBLIC_GITHUB_URL=https://github.com/你的用户名
```

## 🔧 部署前检查清单

- [ ] 确保所有依赖已安装
- [ ] 构建成功 (`npm run build`)
- [ ] 更新个人信息（姓名、邮箱、GitHub等）
- [ ] 检查文章内容
- [ ] 测试本地功能正常

## 📝 自动部署

设置完成后，每次推送代码到 GitHub，Vercel 会自动重新部署！

## 🎯 域名配置

部署成功后，你可以：
1. 使用 Vercel 提供的免费域名
2. 绑定自定义域名（在 Vercel 项目设置中配置）

---

**推荐使用 Vercel**，因为它：
- ✅ 免费
- ✅ 自动 HTTPS
- ✅ 全球 CDN
- ✅ 自动部署
- ✅ 零配置