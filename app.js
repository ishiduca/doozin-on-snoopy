var config = require('./configs')
var api = require('./api')
var schemas = require('./schemas')
var bindRpc = require('@ishiduca/snoopy-bind-rpc')
var rpc = bindRpc(config.ecstatic.prefix, { api, schemas })

if (process.browser) {
  var browserApi = require('./api/browser')(rpc)
  var mount = require('@ishiduca/snoopy-mount')
  var m = mount()
  var app = require('./domains/dashboard')(browserApi)
  module.exports = m({ '/': app })
} else {
  var path = require('path')
  var http = require('http')
  var staticPath = path.join(__dirname, config.ecstatic.static)
  var ecstatic = require('ecstatic')(staticPath)
  module.exports = http.createServer(rpc(ecstatic))
}
