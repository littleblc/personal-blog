# PM2调试脚本

Write-Host "=== PM2应用调试脚本 ===" -ForegroundColor Green

# 1. 检查当前目录
Write-Host "`n1. 检查当前目录..." -ForegroundColor Cyan
$currentDir = Get-Location
Write-Host "   当前目录: $currentDir" -ForegroundColor Gray

if ($currentDir.Path -notlike "*blog*") {
    Write-Warning "当前目录似乎不正确，应该在 C:\www\blog"
    $targetDir = "C:\www\blog"
    if (Test-Path $targetDir) {
        Write-Host "   切换到: $targetDir" -ForegroundColor Yellow
        Set-Location $targetDir
    } else {
        Write-Error "目标目录不存在: $targetDir"
        exit 1
    }
}

# 2. 检查项目文件
Write-Host "`n2. 检查项目文件..." -ForegroundColor Cyan
$requiredFiles = @("package.json", "next.config.js", "app", "lib", "posts")
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "   ✓ $file 存在" -ForegroundColor Green
    } else {
        Write-Host "   ✗ $file 缺失" -ForegroundColor Red
    }
}

# 3. 检查依赖
Write-Host "`n3. 检查依赖..." -ForegroundColor Cyan
if (Test-Path "node_modules") {
    Write-Host "   ✓ node_modules 存在" -ForegroundColor Green
} else {
    Write-Host "   ✗ node_modules 缺失" -ForegroundColor Red
    Write-Host "   运行: npm install" -ForegroundColor Yellow
}

# 4. 检查构建文件
Write-Host "`n4. 检查构建文件..." -ForegroundColor Cyan
if (Test-Path ".next") {
    Write-Host "   ✓ .next 目录存在" -ForegroundColor Green
} else {
    Write-Host "   ✗ .next 目录缺失" -ForegroundColor Red
    Write-Host "   运行: npm run build" -ForegroundColor Yellow
}

# 5. 检查端口占用
Write-Host "`n5. 检查端口占用..." -ForegroundColor Cyan
$port3000 = netstat -an | findstr ":3000"
if ($port3000) {
    Write-Host "   ⚠ 端口3000已被占用:" -ForegroundColor Yellow
    Write-Host "   $port3000" -ForegroundColor Gray
} else {
    Write-Host "   ✓ 端口3000可用" -ForegroundColor Green
}

# 6. 检查PM2状态
Write-Host "`n6. 检查PM2状态..." -ForegroundColor Cyan
try {
    $pm2Status = pm2 jlist | ConvertFrom-Json
    $blogApp = $pm2Status | Where-Object { $_.name -eq "blog" }
    
    if ($blogApp) {
        Write-Host "   PM2应用状态: $($blogApp.pm2_env.status)" -ForegroundColor Gray
        Write-Host "   进程ID: $($blogApp.pid)" -ForegroundColor Gray
        Write-Host "   重启次数: $($blogApp.pm2_env.restart_time)" -ForegroundColor Gray
        
        if ($blogApp.pm2_env.status -eq "errored") {
            Write-Host "   ✗ 应用处于错误状态" -ForegroundColor Red
            Write-Host "   查看日志: pm2 logs blog" -ForegroundColor Yellow
        }
    } else {
        Write-Host "   ✗ 未找到名为'blog'的PM2应用" -ForegroundColor Red
    }
} catch {
    Write-Host "   ✗ 无法获取PM2状态: $($_.Exception.Message)" -ForegroundColor Red
}

# 7. 测试手动启动
Write-Host "`n7. 测试手动启动..." -ForegroundColor Cyan
Write-Host "   运行命令: npm start" -ForegroundColor Gray
Write-Host "   如果成功，按Ctrl+C停止，然后重新配置PM2" -ForegroundColor Yellow

Write-Host "`n=== 建议的修复步骤 ===" -ForegroundColor Yellow
Write-Host "1. 如果文件缺失: git pull 或重新克隆仓库" -ForegroundColor Gray
Write-Host "2. 如果依赖缺失: npm install" -ForegroundColor Gray
Write-Host "3. 如果构建缺失: npm run build" -ForegroundColor Gray
Write-Host "4. 如果端口占用: taskkill /PID <PID> /F" -ForegroundColor Gray
Write-Host "5. 重新启动PM2: pm2 delete blog && pm2 start npm --name 'blog' -- start" -ForegroundColor Gray
Write-Host "6. 查看日志: pm2 logs blog" -ForegroundColor Gray