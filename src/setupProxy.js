const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://host.docker.internal:8080',
      changeOrigin: true,
    })
  );
 
};