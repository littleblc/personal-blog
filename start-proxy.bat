@echo off
REM 启动简单代理服务器脚本

echo =======================================
echo      启动简单HTTP代理服务器
echo =======================================
echo.

REM 检查是否在正确目录
if not exist "package.json" (
    echo 错误: 请在博客项目目录中运行此脚本
    echo 当前目录应该包含 package.json 文件
    pause
    exit /b 1
)

REM 检查Node.js是否安装
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误: Node.js 未安装或不在PATH中
    echo 请先安装 Node.js: https://nodejs.org
    pause
    exit /b 1
)

REM 停止IIS（如果正在运行）
echo 停止IIS服务以释放端口80...
iisreset /stop >nul 2>&1

REM 安装依赖（如果需要）
echo 检查并安装代理依赖...
npm list http-proxy-middleware >nul 2>&1
if %errorlevel% neq 0 (
    echo 安装 http-proxy-middleware...
    npm install http-proxy-middleware express
)

REM 启动博客应用（如果未运行）
echo 确保博客应用运行在端口3000...
pm2 describe blog >nul 2>&1
if %errorlevel% neq 0 (
    echo 启动博客应用...
    pm2 start npm --name "blog" -- start
) else (
    echo 博客应用已在运行
)

REM 等待应用启动
echo 等待应用完全启动...
timeout /t 3 /nobreak >nul

REM 启动代理服务器
echo.
echo 启动代理服务器...
echo 访问地址: http://10.7.4.14
echo 按 Ctrl+C 停止服务器
echo.

node simple-proxy.js

echo.
echo 代理服务器已停止
pause