# Windows服务器部署指南 - 43.167.245.69

## 🖥️ Windows服务器部署步骤

### 第一步：连接Windows服务器

使用远程桌面连接：
- 按 `Win + R`，输入 `mstsc`
- 服务器地址：`43.167.245.69`
- 输入用户名和密码

### 第二步：安装必要软件

#### 1. 安装Node.js
- 访问 [https://nodejs.org](https://nodejs.org)
- 下载 LTS 版本（建议 18.x 或 20.x）
- 运行安装程序，选择 "Add to PATH"
- 重启命令提示符验证：
  ```cmd
  node --version
  npm --version
  ```

#### 2. 安装Git（如果没有）
- 访问 [https://git-scm.com/download/win](https://git-scm.com/download/win)
- 下载并安装
- 验证：`git --version`

#### 3. 安装PM2（全局）
```cmd
npm install -g pm2
npm install -g pm2-windows-startup
```

#### 4. 安装IIS（可选，用于反向代理）
- 打开"程序和功能" → "启用或关闭Windows功能"
- 勾选"Internet Information Services"
- 或者安装 nginx for Windows

### 第三步：拉取并部署代码

打开PowerShell或命令提示符（以管理员身份运行）：

```powershell
# 创建项目目录
mkdir C:\www\blog
cd C:\www\blog

# 克隆代码
git clone https://github.com/littleblc/personal-blog.git .

# 安装依赖
npm install

# 构建项目
npm run build

# 使用PM2启动
pm2 start npm --name "blog" -- start

# 设置开机自启
pm2-startup install
pm2 save
```

### 第四步：配置防火墙

```powershell
# 允许端口3000（PowerShell管理员权限）
New-NetFirewallRule -DisplayName "Node.js Blog" -Direction Inbound -Protocol TCP -LocalPort 3000 -Action Allow

# 允许端口80（如果使用IIS）
New-NetFirewallRule -DisplayName "HTTP" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow
```

### 第五步：配置反向代理

#### 选项A：使用IIS + URL Rewrite（推荐）

1. **安装URL Rewrite模块**：
   - 下载：[https://www.iis.net/downloads/microsoft/url-rewrite](https://www.iis.net/downloads/microsoft/url-rewrite)

2. **配置IIS**：
   - 打开IIS管理器
   - 添加新网站：
     - 网站名称：`PersonalBlog`
     - 物理路径：`C:\www\blog\public`（如果没有就创建空文件夹）
     - 端口：`80`
     - IP地址：`43.167.245.69`

3. **添加web.config**：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <rule name="NodeJS" stopProcessing="true">
                    <match url=".*" />
                    <action type="Rewrite" url="http://localhost:3000/{R:0}" />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>
```

#### 选项B：使用nginx for Windows

1. **下载nginx**：
   - 访问 [http://nginx.org/en/download.html](http://nginx.org/en/download.html)
   - 下载Windows版本

2. **配置nginx.conf**：
```nginx
worker_processes 1;

events {
    worker_connections 1024;
}

http {
    upstream nodejs {
        server 127.0.0.1:3000;
    }

    server {
        listen 80;
        server_name 43.167.245.69;

        location / {
            proxy_pass http://nodejs;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

3. **启动nginx**：
```cmd
cd C:\nginx
nginx.exe
```

### 第六步：设置Windows服务（可选）

创建Windows服务让应用自动启动：

```powershell
# 使用PM2设置Windows服务
pm2-startup install
pm2 save

# 或者使用NSSM（Non-Sucking Service Manager）
# 下载NSSM：https://nssm.cc/download
# nssm install "Personal Blog" "C:\Program Files\nodejs\node.exe"
```

## 🔧 Windows特有的配置

### 1. 创建批处理脚本

创建 `start_blog.bat`：
```batch
@echo off
cd /d C:\www\blog
pm2 start npm --name "blog" -- start
pause
```

创建 `restart_blog.bat`：
```batch
@echo off
cd /d C:\www\blog
pm2 restart blog
pause
```

创建 `update_blog.bat`：
```batch
@echo off
cd /d C:\www\blog
git pull
npm install
npm run build
pm2 restart blog
echo 博客更新完成！
pause
```

### 2. 设置定时任务

1. 打开"任务计划程序"
2. 创建基本任务
3. 设置触发器为"计算机启动时"
4. 操作选择启动程序：`C:\www\blog\start_blog.bat`

### 3. 配置日志

PM2日志位置：
```
C:\Users\[用户名]\.pm2\logs\
```

## 📋 Windows部署检查清单

- [ ] Node.js 安装完成（npm可用）
- [ ] Git 安装完成
- [ ] PM2 全局安装
- [ ] 防火墙端口开放（3000, 80）
- [ ] 代码成功从GitHub拉取
- [ ] npm install 成功
- [ ] npm run build 成功
- [ ] PM2 启动成功
- [ ] 反向代理配置（IIS或nginx）
- [ ] Windows服务设置

## 🔍 Windows故障排查

### 查看PM2状态
```cmd
pm2 status
pm2 logs blog
```

### 查看端口占用
```cmd
netstat -an | findstr :3000
netstat -an | findstr :80
```

### 重启服务
```cmd
pm2 restart blog
```

### 查看Windows事件日志
- 打开"事件查看器"
- 查看"Windows日志" → "应用程序"

## 🌐 访问测试

完成部署后，通过以下地址访问：
- **http://43.167.245.69** - 主站
- **http://43.167.245.69:3000** - 直接访问Node.js应用

## 💡 Windows服务器优势

1. **图形界面**：方便管理和监控
2. **熟悉环境**：如果你熟悉Windows操作
3. **集成工具**：IIS、任务计划程序等
4. **远程桌面**：方便远程管理

## ⚡ 快速启动命令

```cmd
REM 一键部署脚本（save as deploy.bat）
@echo off
echo 开始部署个人博客...

cd /d C:\
mkdir www
cd www
mkdir blog
cd blog

git clone https://github.com/littleblc/personal-blog.git .
npm install
npm run build
pm2 start npm --name "blog" -- start
pm2 save

echo 部署完成！请配置IIS或nginx反向代理
pause
```

记住：Windows服务器需要更多的手动配置，但提供了图形界面的便利！