var xtend = require('xtend')
var yo = require('yo-yo')
var compose = require('@ishiduca/snoopy-compose')
var _form = require('./form')
var _result = require('./result')

module.exports = function (api) {
  var form = _form(api)
  var result = _result(api)

  var routes = [
    [ '/', dashboardView ]
  ]

  return xtend(compose({
    form,
    result
  }), { routes })

  function dashboardView (uri, params, model, actionsUp) {
    return yo`<div>
      ${dv('form', form, model, actionsUp)}
      ${dv('result', result, model, actionsUp)}
    </div>`
  }
}

function dv (name, app, model, actionsUp) {
  return app.view(model[name], a => actionsUp({ [name]: a }))
}
