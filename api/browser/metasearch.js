var { pipe, concat } = require('mississippi')
var { services } = require('../../configs/metasearch')

module.exports = function (rpc) {
  return (params, done) => {
    pipe(
      rpc.metasearch({ category: 'mak', value: params.trim(), services: Object.values(services) }),
      concat(results => done(null, results)),
      error => {
        if (error) {
          console.error(error)
          done(error)
        }
      }
    )
  }
}
