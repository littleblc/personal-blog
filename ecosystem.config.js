// PM2 进程管理配置文件
module.exports = {
  apps: [
    {
      name: 'personal-blog',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/blog',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/var/log/pm2/blog-error.log',
      out_file: '/var/log/pm2/blog-out.log',
      log_file: '/var/log/pm2/blog.log',
      time: true
    }
  ]
}