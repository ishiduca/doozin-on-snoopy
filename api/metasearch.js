module.exports = (params, done) => {
  var { services, category, value } = params
  done(null, services.map(service => ({ [category]: value, service })))
}
