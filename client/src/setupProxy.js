const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google", "/search", "/track","/track/new","/track/*", "/videos", "/trend", "/top"],
    // '**',
    // ["/"],
    createProxyMiddleware(
      {
      target: "http://localhost:5000",
    })
  );
};