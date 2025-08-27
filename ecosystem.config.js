// PM2 进程管理配置文件
module.exports = {
  apps: [
    {
      name: 'personal-blog',
      script: 'start-blog.js',
      cwd: 'C:\\www\\blog',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: 'C:\\www\\blog\\logs\\blog-error.log',
      out_file: 'C:\\www\\blog\\logs\\blog-out.log',
      log_file: 'C:\\www\\blog\\logs\\blog.log',
      time: true
    }
  ]
}