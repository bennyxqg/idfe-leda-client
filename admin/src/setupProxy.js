const { createProxyMiddleware } = require ('http-proxy-middleware');

const $url = 'http://sandbox-ipggsd.gamdream.com'
const proxylist = [
  '/user', '/config', '/site', '/menu', '/kf', '/ipgapp', '/reservation', '/sys-log',
  '/permission', '/rule', '/forum', '/news', '/wpk', '/gs', '/weixin', '/send-point-record',
  '/realtime', '/idcard', '/coupon', '/sdk-game-data', '/weplayapp', '/thirdaccess',
  '/integralmall', '/h5sdk', '/ipgSdk'
]

module.exports = function(app) {
  proxylist.forEach(key => {
    app.use(
      key,
      createProxyMiddleware({
        target: $url,
        changeOrigin: true,
      })
    );
  })
};