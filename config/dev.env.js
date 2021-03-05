var merge = require('webpack-merge')
var prodEnv = require('./dev.env')

module.exports = {
  NODE_ENV: '"development"',
	VUE_APP_IMAGES: '"https://gat.gansu.gov.cn:28082"',
	// VUE_APP_IMAGES: '"http://192.168.1.116:8080"',
  api:'"https://gat.gansu.gov.cn:28082/dmx"',
  // api:'"http://192.168.1.116:18080/dmx"',
}
