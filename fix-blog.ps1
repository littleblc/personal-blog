# 博客完整修复脚本

Write-Host "=== 博客应用完整修复脚本 ===" -ForegroundColor Green

# 检查管理员权限
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Warning "建议以管理员身份运行此脚本"
}

# 1. 确保在正确目录
Write-Host "`n1. 检查目录..." -ForegroundColor Cyan
$targetDir = "C:\www\blog"
if (!(Test-Path $targetDir)) {
    Write-Host "创建目录: $targetDir" -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $targetDir -Force
}

Set-Location $targetDir
Write-Host "当前目录: $(Get-Location)" -ForegroundColor Gray

# 2. 检查项目文件
Write-Host "`n2. 检查项目文件..." -ForegroundColor Cyan
$criticalFiles = @("package.json", "next.config.js", "app", "lib", "posts")
$missingFiles = @()

foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        Write-Host "   ✓ $file" -ForegroundColor Green
    } else {
        Write-Host "   ✗ $file" -ForegroundColor Red
        $missingFiles += $file
    }
}

# 3. 如果文件缺失，重新拉取代码
if ($missingFiles.Count -gt 0) {
    Write-Host "`n3. 重新拉取代码..." -ForegroundColor Cyan
    Write-Host "缺失文件: $($missingFiles -join ', ')" -ForegroundColor Yellow
    
    try {
        # 方法1: git pull
        Write-Host "尝试 git pull..." -ForegroundColor Gray
        git pull origin main
        
        # 检查是否成功
        if (!(Test-Path "package.json")) {
            throw "git pull 失败"
        }
    }
    catch {
        # 方法2: 重新克隆
        Write-Host "git pull 失败，重新克隆仓库..." -ForegroundColor Yellow
        Set-Location "C:\www"
        if (Test-Path "blog") {
            Remove-Item "blog" -Recurse -Force
        }
        git clone https://github.com/littleblc/personal-blog.git blog
        Set-Location "blog"
    }
}

# 4. 安装依赖
Write-Host "`n4. 安装依赖..." -ForegroundColor Cyan
if (Test-Path "package.json") {
    # 清理缓存
    npm cache clean --force
    
    # 删除旧的node_modules
    if (Test-Path "node_modules") {
        Write-Host "删除旧的node_modules..." -ForegroundColor Gray
        Remove-Item "node_modules" -Recurse -Force
    }
    
    # 安装依赖
    npm install
    Write-Host "   ✓ 依赖安装完成" -ForegroundColor Green
} else {
    Write-Error "package.json仍然缺失，无法继续"
    exit 1
}

# 5. 构建项目
Write-Host "`n5. 构建项目..." -ForegroundColor Cyan
try {
    npm run build
    Write-Host "   ✓ 构建成功" -ForegroundColor Green
} catch {
    Write-Error "构建失败: $_"
    Write-Host "尝试查看错误详情..." -ForegroundColor Yellow
    npm run build 2>&1
    exit 1
}

# 6. 停止现有PM2进程
Write-Host "`n6. 停止现有PM2进程..." -ForegroundColor Cyan
pm2 delete all 2>$null
Write-Host "   ✓ 已清理PM2进程" -ForegroundColor Green

# 7. 创建启动脚本（如果不存在）
Write-Host "`n7. 创建启动脚本..." -ForegroundColor Cyan
if (!(Test-Path "start-blog.js")) {
    @'
const { spawn } = require('child_process');

process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || 3000;

console.log('启动博客应用...');
console.log('端口:', process.env.PORT);

const nextStart = spawn('npx', ['next', 'start'], {
  stdio: 'inherit',
  shell: true
});

nextStart.on('error', (error) => {
  console.error('启动失败:', error);
  process.exit(1);
});

process.on('SIGINT', () => {
  nextStart.kill('SIGINT');
});
'@ | Out-File -FilePath "start-blog.js" -Encoding UTF8
    Write-Host "   ✓ 启动脚本已创建" -ForegroundColor Green
}

# 8. 启动应用
Write-Host "`n8. 启动应用..." -ForegroundColor Cyan
pm2 start start-blog.js --name "blog"

# 等待启动
Start-Sleep -Seconds 3

# 9. 检查状态
Write-Host "`n9. 检查状态..." -ForegroundColor Cyan
$pm2Status = pm2 jlist | ConvertFrom-Json
$blogApp = $pm2Status | Where-Object { $_.name -eq "blog" }

if ($blogApp -and $blogApp.pm2_env.status -eq "online") {
    Write-Host "   ✓ 应用启动成功！" -ForegroundColor Green
    Write-Host "   进程状态: $($blogApp.pm2_env.status)" -ForegroundColor Gray
    Write-Host "   进程ID: $($blogApp.pid)" -ForegroundColor Gray
} else {
    Write-Host "   ✗ 应用启动失败" -ForegroundColor Red
    Write-Host "查看错误日志:" -ForegroundColor Yellow
    pm2 logs blog --lines 10
    exit 1
}

# 10. 测试应用
Write-Host "`n10. 测试应用..." -ForegroundColor Cyan
try {
    Start-Sleep -Seconds 2
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 10
    Write-Host "   ✓ 应用响应正常 (状态码: $($response.StatusCode))" -ForegroundColor Green
} catch {
    Write-Host "   ⚠ 应用可能还在启动中..." -ForegroundColor Yellow
    Write-Host "   请稍后手动测试: curl http://localhost:3000" -ForegroundColor Gray
}

# 11. 保存PM2配置
Write-Host "`n11. 保存PM2配置..." -ForegroundColor Cyan
pm2 save
pm2 startup 2>$null
Write-Host "   ✓ PM2配置已保存" -ForegroundColor Green

Write-Host "`n=== 修复完成！ ===" -ForegroundColor Green
Write-Host "应用状态检查: pm2 status" -ForegroundColor Yellow
Write-Host "查看日志: pm2 logs blog" -ForegroundColor Yellow
Write-Host "本地测试: curl http://localhost:3000" -ForegroundColor Yellow
Write-Host "外部访问: curl http://10.7.4.14:3000" -ForegroundColor Yellow