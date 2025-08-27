// 简单的HTTP代理服务器
// 监听80端口，转发请求到3000端口的Next.js应用

const http = require('http');
const httpProxy = require('http-proxy-middleware');
const express = require('express');

const app = express();

// 创建代理中间件
const proxy = httpProxy.createProxyMiddleware({
  target: 'http://localhost:3000',
  changeOrigin: true,
  ws: true, // 支持WebSocket
  onError: (err, req, res) => {
    console.error('代理错误:', err.message);
    res.writeHead(500, {
      'Content-Type': 'text/html; charset=utf-8'
    });
    res.end(`
      <h1>服务暂时不可用</h1>
      <p>请检查Node.js应用是否运行在端口3000</p>
      <p>错误信息: ${err.message}</p>
      <p><a href="javascript:location.reload()">刷新页面</a></p>
    `);
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`代理请求: ${req.method} ${req.url}`);
  }
});

// 使用代理中间件
app.use('/', proxy);

// 启动代理服务器
const PORT = 80;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`代理服务器运行在端口 ${PORT}`);
  console.log(`访问地址: http://10.7.4.14`);
  console.log(`目标应用: http://localhost:3000`);
});

// 错误处理
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`端口 ${PORT} 已被占用，请先停止IIS或其他服务`);
    console.error('可以运行以下命令停止IIS: iisreset /stop');
  } else {
    console.error('服务器启动错误:', err);
  }
});

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n正在关闭代理服务器...');
  server.close(() => {
    console.log('代理服务器已关闭');
    process.exit(0);
  });
});