// 博客启动脚本
// 避免PM2执行批处理文件的问题

const { spawn } = require('child_process');
const path = require('path');

console.log('启动博客应用...');
console.log('当前目录:', process.cwd());
console.log('Node.js版本:', process.version);

// 设置环境变量
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || 3000;

// 启动Next.js应用
const nextStart = spawn('npx', ['next', 'start'], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd()
});

nextStart.on('error', (error) => {
  console.error('启动失败:', error);
  process.exit(1);
});

nextStart.on('close', (code) => {
  console.log(`应用退出，代码: ${code}`);
  process.exit(code);
});

// 处理进程退出
process.on('SIGINT', () => {
  console.log('正在关闭应用...');
  nextStart.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('正在终止应用...');
  nextStart.kill('SIGTERM');
});

console.log(`博客应用启动中，端口: ${process.env.PORT}`);