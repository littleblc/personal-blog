# PowerShell脚本：自动创建web.config文件
# 在服务器上以管理员身份运行PowerShell，然后执行此脚本

# 检查目录是否存在
$blogPath = "C:\www\blog"
if (!(Test-Path $blogPath)) {
    Write-Host "创建目录: $blogPath" -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $blogPath -Force
}

# 切换到博客目录
Set-Location $blogPath

# 创建web.config内容
$webConfigContent = @'
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <rule name="Redirect to Node.js" stopProcessing="true">
                    <match url=".*" />
                    <conditions>
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
                        <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
                    </conditions>
                    <action type="Rewrite" url="http://localhost:3000/{R:0}" />
                    <serverVariables>
                        <set name="HTTP_X_ORIGINAL_HOST" value="{HTTP_HOST}" />
                    </serverVariables>
                </rule>
            </rules>
        </rewrite>
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

# 写入web.config文件
$webConfigPath = Join-Path $blogPath "web.config"
$webConfigContent | Out-File -FilePath $webConfigPath -Encoding UTF8

Write-Host "web.config 文件已创建: $webConfigPath" -ForegroundColor Green

# 显示文件内容确认
Write-Host "`n=== web.config 内容 ===" -ForegroundColor Cyan
Get-Content $webConfigPath

Write-Host "`n=== 下一步 ===" -ForegroundColor Yellow
Write-Host "1. 确保已安装 URL Rewrite 模块"
Write-Host "2. 在IIS中创建网站，物理路径指向: $blogPath"
Write-Host "3. 确保Node.js应用运行在端口3000"
Write-Host "4. 测试访问: http://43.167.245.69"