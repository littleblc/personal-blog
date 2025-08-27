#!/bin/bash

# 个人博客服务器部署脚本
# 服务器IP: 43.167.245.69

echo "=== 个人博客部署脚本 ==="

# 1. 更新系统包
echo "1. 更新系统包..."
sudo apt update && sudo apt upgrade -y

# 2. 安装Node.js 18
echo "2. 安装Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证安装
echo "Node.js版本: $(node --version)"
echo "npm版本: $(npm --version)"

# 3. 安装PM2进程管理器
echo "3. 安装PM2..."
sudo npm install -g pm2

# 4. 安装Nginx
echo "4. 安装Nginx..."
sudo apt install -y nginx

# 5. 启用防火墙规则
echo "5. 配置防火墙..."
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# 6. 创建项目目录
echo "6. 创建项目目录..."
sudo mkdir -p /var/www/blog
sudo chown -R $USER:$USER /var/www/blog
cd /var/www/blog

# 7. 克隆或上传项目代码（需要手动操作）
echo "7. 请手动上传项目代码到 /var/www/blog/"
echo "   可以使用 scp 或者 git clone"

# 8. 安装依赖并构建
echo "8. 安装依赖并构建..."
# cd /var/www/blog
# npm install
# npm run build

# 9. 配置PM2
echo "9. 配置PM2..."
# pm2 start npm --name "blog" -- start
# pm2 startup
# pm2 save

echo "=== 部署完成！==="
echo "接下来需要："
echo "1. 上传项目代码到 /var/www/blog/"
echo "2. 运行: npm install && npm run build"
echo "3. 运行: pm2 start npm --name 'blog' -- start"
echo "4. 配置Nginx反向代理"
echo "5. 访问 http://43.167.245.69 测试"