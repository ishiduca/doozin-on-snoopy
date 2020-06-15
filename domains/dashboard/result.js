var yo = require('yo-yo')

module.exports = api => ({
  init () {
    return {
      model: []
    }
  },
  update (model, action) {
    if (action == null) return { model }
    if (action.resultMetasearch != null) {
      return { model: action.resultMetasearch }
    }
    return { model }
  },
  run (effect, sources) {
    if (effect == null) return
  },
  view (model, actionsUp) {
    return yo`<div>
  ${model.map(m => yo`<p>${JSON.stringify(m)}</p>`)}
</div>`
  }
})
