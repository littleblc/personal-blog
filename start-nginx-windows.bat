@echo off
REM Windows nginx 启动脚本

echo =======================================
echo      Windows Nginx 启动脚本
echo =======================================

REM 检查nginx是否存在
if not exist "C:\nginx\nginx.exe" (
    echo 错误: nginx.exe 不存在于 C:\nginx\
    echo 请先下载并解压 nginx 到 C:\nginx\ 目录
    echo 下载地址: http://nginx.org/en/download.html
    pause
    exit /b 1
)

REM 检查配置文件
echo 正在检测nginx配置...
C:\nginx\nginx.exe -t
if %errorlevel% neq 0 (
    echo 配置文件有错误，请检查 C:\nginx\conf\nginx.conf
    pause
    exit /b 1
)

REM 检查是否已经运行
tasklist /FI "IMAGENAME eq nginx.exe" 2>NUL | find /I /N "nginx.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo nginx 已经在运行中
    echo 当前nginx进程:
    tasklist /FI "IMAGENAME eq nginx.exe"
    echo.
    echo 选择操作:
    echo 1. 重新加载配置
    echo 2. 重启nginx
    echo 3. 停止nginx
    echo 4. 退出
    set /p choice=请输入选择 (1-4): 
    
    if "%choice%"=="1" (
        echo 重新加载nginx配置...
        C:\nginx\nginx.exe -s reload
        echo 配置已重新加载
    ) else if "%choice%"=="2" (
        echo 重启nginx...
        C:\nginx\nginx.exe -s stop
        timeout /t 2 /nobreak >nul
        C:\nginx\nginx.exe
        echo nginx已重启
    ) else if "%choice%"=="3" (
        echo 停止nginx...
        C:\nginx\nginx.exe -s stop
        echo nginx已停止
    )
    pause
    exit /b 0
)

REM 启动nginx
echo 正在启动nginx...
cd /d C:\nginx
start "" nginx.exe

REM 等待2秒让nginx完全启动
timeout /t 2 /nobreak >nul

REM 检查是否启动成功
tasklist /FI "IMAGENAME eq nginx.exe" 2>NUL | find /I /N "nginx.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo.
    echo ================================
    echo    nginx 启动成功！
    echo ================================
    echo.
    echo nginx进程信息:
    tasklist /FI "IMAGENAME eq nginx.exe"
    echo.
    echo 端口监听情况:
    netstat -an | findstr :80
    echo.
    echo 你现在可以访问:
    echo - http://localhost 
    echo - http://43.167.245.69
    echo.
    echo 管理命令:
    echo - 停止: C:\nginx\nginx.exe -s stop
    echo - 重载: C:\nginx\nginx.exe -s reload
    echo - 测试: C:\nginx\nginx.exe -t
) else (
    echo.
    echo ================================
    echo    nginx 启动失败！
    echo ================================
    echo.
    echo 可能的原因:
    echo 1. 端口80被占用
    echo 2. 配置文件错误
    echo 3. 权限不足
    echo.
    echo 请检查错误日志: C:\nginx\logs\error.log
)

echo.
pause