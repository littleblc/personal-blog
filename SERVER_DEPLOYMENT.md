# 服务器部署指南 - 43.167.245.69

## 🚀 服务器部署步骤

### 第一步：连接服务器

```bash
# SSH连接服务器（替换为你的用户名）
ssh root@43.167.245.69
# 或
ssh ubuntu@43.167.245.69
```

### 第二步：准备服务器环境

在服务器上执行以下命令：

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证安装
node --version  # 应该显示 v18.x.x
npm --version

# 安装PM2进程管理器
sudo npm install -g pm2

# 安装Nginx
sudo apt install -y nginx

# 安装Git（如果需要）
sudo apt install -y git

# 配置防火墙
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full' 
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable
```

### 第三步：上传项目代码

有几种方式上传代码到服务器：

#### 方式一：使用Git（推荐）

```bash
# 在服务器上创建项目目录
sudo mkdir -p /var/www/blog
sudo chown -R $USER:$USER /var/www/blog
cd /var/www/blog

# 如果你有GitHub仓库
git clone https://github.com/你的用户名/你的仓库名.git .

# 或者从本地初始化
git init
```

#### 方式二：使用SCP从本地上传

在本地电脑上执行：

```bash
# 压缩项目文件
cd D:\智库Version1.0\personal-blog
tar -czf blog.tar.gz .

# 上传到服务器
scp blog.tar.gz root@43.167.245.69:/tmp/

# 在服务器上解压
ssh root@43.167.245.69
sudo mkdir -p /var/www/blog
cd /var/www/blog
sudo tar -xzf /tmp/blog.tar.gz
sudo chown -R $USER:$USER /var/www/blog
```

#### 方式三：使用SFTP工具

使用 FileZilla、WinSCP 等工具直接拖拽上传文件到 `/var/www/blog/`

### 第四步：构建和启动应用

```bash
# 进入项目目录
cd /var/www/blog

# 安装依赖
npm install

# 构建生产版本
npm run build

# 使用PM2启动应用
pm2 start npm --name "blog" -- start

# 设置PM2开机自启
pm2 startup
pm2 save

# 查看应用状态
pm2 status
pm2 logs blog
```

### 第五步：配置Nginx反向代理

```bash
# 创建Nginx配置文件
sudo nano /etc/nginx/sites-available/blog
```

复制以下配置内容：

```nginx
server {
    listen 80;
    server_name 43.167.245.69;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    location /_next/static {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
    
    gzip on;
    gzip_types
        text/plain
        text/css
        text/js
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;
}
```

然后执行：

```bash
# 启用站点
sudo ln -s /etc/nginx/sites-available/blog /etc/nginx/sites-enabled/

# 删除默认站点（可选）
sudo rm /etc/nginx/sites-enabled/default

# 测试Nginx配置
sudo nginx -t

# 重新加载Nginx
sudo systemctl reload nginx

# 启动Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 第六步：测试部署

```bash
# 检查PM2状态
pm2 status

# 检查Nginx状态
sudo systemctl status nginx

# 检查端口
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :3000

# 本地测试
curl http://localhost:3000
curl http://43.167.245.69
```

在浏览器中访问：**http://43.167.245.69**

## 🔧 常用管理命令

### PM2 管理

```bash
# 查看状态
pm2 status

# 查看日志
pm2 logs blog

# 重启应用
pm2 restart blog

# 停止应用
pm2 stop blog

# 删除应用
pm2 delete blog

# 更新代码后重新部署
cd /var/www/blog
git pull  # 如果使用Git
npm install
npm run build
pm2 restart blog
```

### Nginx 管理

```bash
# 重新加载配置
sudo nginx -s reload

# 重启Nginx
sudo systemctl restart nginx

# 查看错误日志
sudo tail -f /var/log/nginx/error.log

# 查看访问日志
sudo tail -f /var/log/nginx/access.log
```

## 🐛 故障排除

### 应用无法启动

```bash
# 查看PM2日志
pm2 logs blog

# 手动启动测试
cd /var/www/blog
npm start

# 检查端口占用
sudo lsof -i :3000
```

### Nginx 502错误

```bash
# 检查Next.js是否运行在3000端口
sudo netstat -tlnp | grep :3000

# 检查Nginx错误日志
sudo tail -f /var/log/nginx/error.log

# 重启服务
pm2 restart blog
sudo systemctl restart nginx
```

### 防火墙问题

```bash
# 检查防火墙状态
sudo ufw status

# 开放80端口
sudo ufw allow 80

# 重新加载防火墙
sudo ufw reload
```

## 🎯 完成后

部署成功后，你的博客应该可以通过以下地址访问：

- **http://43.167.245.69** - 主站
- **http://43.167.245.69/about** - 关于页面
- **http://43.167.245.69/archive** - 文章归档
- **http://43.167.245.69/contact** - 联系页面

## 🔄 更新博客内容

1. **添加新文章**：在 `posts/` 目录创建新的 `.md` 文件
2. **更新代码**：修改组件或样式
3. **重新部署**：
   ```bash
   cd /var/www/blog
   git pull  # 如果使用Git
   npm run build
   pm2 restart blog
   ```

恭喜！你的个人博客现在运行在你自己的服务器上了！🎉