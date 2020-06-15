var app = require('./app')

if (process.browser) {
  var document = require('global/document')
  var yo = require('yo-yo')
  var { start } = require('@ishiduca/snoopy')
  var { views, models, actions } = start(app)
  var root = yo`<div></div>`

  views().on('data', rt => yo.update(root, rt))
  models().on('data', model => console.log({ model }))
  actions().on('data', action => console.log({ action }))

  document.body.appendChild(root)
} else {
  var config = require('./configs')
  var port = process.env.PORT || config.server.port
  var msg = `server start to listen on port [${port}]`
  app.listen(port, console.log.bind(console, msg))
}
