var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv,{
  NODE_ENV: '"production"',
  VUE_APP_IMAGES: '"https://gat.gansu.gov.cn:28082"',
  api:'"https://gat.gansu.gov.cn:28082/dmx"',
  // api:'"http://119.45.51.33:18080/dmx"',
})
