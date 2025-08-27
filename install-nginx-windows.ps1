# Windows nginx 一键安装脚本
# 需要以管理员身份运行PowerShell

param(
    [string]$NginxVersion = "1.24.0"
)

Write-Host "=== Windows nginx 一键安装脚本 ===" -ForegroundColor Green
Write-Host "nginx版本: $NginxVersion" -ForegroundColor Yellow

# 检查管理员权限
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Error "此脚本需要管理员权限。请以管理员身份运行PowerShell。"
    exit 1
}

# 1. 下载nginx
$nginxUrl = "http://nginx.org/download/nginx-$NginxVersion.zip"
$downloadPath = "$env:TEMP\nginx-$NginxVersion.zip"
$nginxPath = "C:\nginx"

Write-Host "1. 下载nginx..." -ForegroundColor Cyan
try {
    Invoke-WebRequest -Uri $nginxUrl -OutFile $downloadPath
    Write-Host "   ✓ nginx下载完成" -ForegroundColor Green
} catch {
    Write-Error "下载失败: $_"
    exit 1
}

# 2. 解压nginx
Write-Host "2. 解压nginx..." -ForegroundColor Cyan
try {
    if (Test-Path $nginxPath) {
        Write-Host "   警告: C:\nginx 已存在，正在备份..." -ForegroundColor Yellow
        Move-Item $nginxPath "$nginxPath.backup.$(Get-Date -Format 'yyyyMMdd-HHmmss')" -Force
    }
    
    Expand-Archive -Path $downloadPath -DestinationPath "C:\" -Force
    Move-Item "C:\nginx-$NginxVersion" $nginxPath -Force
    Write-Host "   ✓ nginx解压完成" -ForegroundColor Green
} catch {
    Write-Error "解压失败: $_"
    exit 1
}

# 3. 创建nginx配置
Write-Host "3. 配置nginx..." -ForegroundColor Cyan
$nginxConfig = @'
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    
    sendfile        on;
    keepalive_timeout  65;

    upstream nodejs_backend {
        server 127.0.0.1:3000;
    }

    server {
        listen       80;
        server_name  43.167.245.69 localhost;

        location / {
            proxy_pass http://nodejs_backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }
        
        location /_next/static {
            proxy_pass http://nodejs_backend;
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
'@

try {
    # 备份原配置
    Copy-Item "$nginxPath\conf\nginx.conf" "$nginxPath\conf\nginx.conf.backup" -Force
    
    # 写入新配置
    $nginxConfig | Out-File -FilePath "$nginxPath\conf\nginx.conf" -Encoding UTF8
    Write-Host "   ✓ nginx配置完成" -ForegroundColor Green
} catch {
    Write-Error "配置失败: $_"
    exit 1
}

# 4. 配置防火墙
Write-Host "4. 配置Windows防火墙..." -ForegroundColor Cyan
try {
    New-NetFirewallRule -DisplayName "Nginx HTTP" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow -ErrorAction SilentlyContinue
    Write-Host "   ✓ 防火墙规则已添加" -ForegroundColor Green
} catch {
    Write-Warning "防火墙配置可能失败，请手动配置"
}

# 5. 测试nginx配置
Write-Host "5. 测试nginx配置..." -ForegroundColor Cyan
Set-Location $nginxPath
$testResult = & .\nginx.exe -t 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✓ nginx配置测试通过" -ForegroundColor Green
} else {
    Write-Error "nginx配置测试失败: $testResult"
    exit 1
}

# 6. 启动nginx
Write-Host "6. 启动nginx..." -ForegroundColor Cyan
try {
    Start-Process -FilePath "$nginxPath\nginx.exe" -WorkingDirectory $nginxPath
    Start-Sleep -Seconds 2
    
    # 检查是否启动成功
    $nginxProcess = Get-Process nginx -ErrorAction SilentlyContinue
    if ($nginxProcess) {
        Write-Host "   ✓ nginx启动成功" -ForegroundColor Green
        Write-Host "   进程ID: $($nginxProcess.Id -join ', ')" -ForegroundColor Gray
    } else {
        Write-Error "nginx启动失败"
        exit 1
    }
} catch {
    Write-Error "启动失败: $_"
    exit 1
}

# 7. 验证安装
Write-Host "7. 验证安装..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost" -TimeoutSec 5 -ErrorAction Stop
    Write-Host "   ✓ nginx响应正常" -ForegroundColor Green
} catch {
    Write-Warning "nginx可能未正确代理到Node.js应用，请检查Node.js是否在端口3000运行"
}

# 清理下载文件
Remove-Item $downloadPath -Force -ErrorAction SilentlyContinue

Write-Host "`n=== 安装完成！ ===" -ForegroundColor Green
Write-Host "nginx安装路径: $nginxPath" -ForegroundColor Yellow
Write-Host "配置文件: $nginxPath\conf\nginx.conf" -ForegroundColor Yellow
Write-Host "日志文件: $nginxPath\logs\" -ForegroundColor Yellow
Write-Host "`n常用命令:" -ForegroundColor Cyan
Write-Host "  启动: $nginxPath\nginx.exe"
Write-Host "  停止: $nginxPath\nginx.exe -s stop"
Write-Host "  重载: $nginxPath\nginx.exe -s reload"
Write-Host "  测试: $nginxPath\nginx.exe -t"
Write-Host "`n访问地址: http://43.167.245.69" -ForegroundColor Green
Write-Host "前提条件: 确保Node.js应用运行在端口3000" -ForegroundColor Yellow