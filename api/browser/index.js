var { through } = require('mississippi')
var metasearch = require('./metasearch')
var BEYOND = require('@ishiduca/snoopy-compose/beyond')
var be = action => ({ [BEYOND]: action })

module.exports = (rpc) => {
  var api = {
    metasearch: metasearch(rpc)
  }

  return Object.keys(api).reduce((a, method) => {
    a[method] = (params) => {
      var s = through.obj((params, _, done) => {
        api[method](params, (error, result) => {
          if (error != null) return done(null, be({ error }))
          var name = 'result' +
            method.slice(0, 1).toUpperCase() +
            method.slice(1)
          done(null, be({ [name]: result }))
        })
      })
      process.nextTick(() => s.end(params))
      return s
    }
    a[method].callback = api[method]
    return a
  }, {})
}
