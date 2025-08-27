# IIS问题诊断脚本

Write-Host "=== IIS问题诊断 ===" -ForegroundColor Green

# 1. 检查Node.js应用
Write-Host "`n1. 检查Node.js应用..." -ForegroundColor Cyan
try {
    $nodeResponse = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 5
    Write-Host "   ✓ Node.js应用运行正常 (状态码: $($nodeResponse.StatusCode))" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Node.js应用未运行或不可访问" -ForegroundColor Red
    Write-Host "   请运行: pm2 start npm --name 'blog' -- start" -ForegroundColor Yellow
}

# 2. 检查web.config文件
Write-Host "`n2. 检查web.config..." -ForegroundColor Cyan
$webConfigPath = "C:\www\blog\web.config"
if (Test-Path $webConfigPath) {
    Write-Host "   ✓ web.config文件存在" -ForegroundColor Green
    
    # 检查XML格式
    try {
        [xml]$xml = Get-Content $webConfigPath
        Write-Host "   ✓ XML格式正确" -ForegroundColor Green
    } catch {
        Write-Host "   ✗ XML格式错误: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "   建议重新创建web.config文件" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ✗ web.config文件不存在" -ForegroundColor Red
}

# 3. 检查URL Rewrite模块
Write-Host "`n3. 检查IIS模块..." -ForegroundColor Cyan
try {
    $modules = Get-WindowsFeature | Where-Object {$_.Name -like "*Rewrite*" -or $_.Name -like "*IIS*"}
    if ($modules) {
        Write-Host "   IIS相关功能:" -ForegroundColor Gray
        $modules | ForEach-Object { Write-Host "   - $($_.Name): $($_.InstallState)" -ForegroundColor Gray }
    }
} catch {
    Write-Host "   无法检查IIS模块状态" -ForegroundColor Yellow
}

# 4. 检查端口占用
Write-Host "`n4. 检查端口占用..." -ForegroundColor Cyan
$port80 = netstat -an | findstr ":80 "
$port3000 = netstat -an | findstr ":3000 "

if ($port80) {
    Write-Host "   ✓ 端口80正在监听" -ForegroundColor Green
} else {
    Write-Host "   ✗ 端口80未监听" -ForegroundColor Red
}

if ($port3000) {
    Write-Host "   ✓ 端口3000正在监听" -ForegroundColor Green
} else {
    Write-Host "   ✗ 端口3000未监听" -ForegroundColor Red
}

# 5. 创建简单的web.config
Write-Host "`n5. 创建修复的web.config..." -ForegroundColor Cyan
$fixedConfig = @'
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <httpErrors errorMode="Detailed" />
        <directoryBrowse enabled="false" />
        <defaultDocument>
            <files>
                <clear />
                <add value="index.html" />
            </files>
        </defaultDocument>
    </system.webServer>
</configuration>
'@

try {
    [System.IO.File]::WriteAllText($webConfigPath, $fixedConfig, [System.Text.Encoding]::UTF8)
    Write-Host "   ✓ 已创建基础web.config文件" -ForegroundColor Green
    Write-Host "   注意: 此配置不包含URL重写，请手动在IIS中配置反向代理" -ForegroundColor Yellow
} catch {
    Write-Host "   ✗ 无法创建web.config: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== 建议的解决步骤 ===" -ForegroundColor Yellow
Write-Host "1. 确保Node.js应用运行在端口3000" -ForegroundColor Gray
Write-Host "2. 安装URL Rewrite模块: https://www.iis.net/downloads/microsoft/url-rewrite" -ForegroundColor Gray
Write-Host "3. 在IIS管理器中手动配置反向代理规则" -ForegroundColor Gray
Write-Host "4. 或者考虑使用nginx替代IIS" -ForegroundColor Gray