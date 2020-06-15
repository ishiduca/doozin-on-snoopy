var yo = require('yo-yo')

module.exports = api => ({
  init () {
    return {
      model: ''
    }
  },
  update (model, action) {
    if (action == null) return { model }
    if (action.oninput != null) {
      return { model: action.oninput }
    }
    if (action.onsubmit === true) {
      return {
        model: '',
        effect: { metasearch: model }
      }
    }
    return { model }
  },
  run (effect, sources) {
    if (effect == null) return
    if (effect.metasearch != null) {
      return api.metasearch(effect.metasearch)
    }
  },
  view (model, actionsUp) {
    return yo`
<div>
  <form onsubmit=${onsubmit}>
    <fieldset>
      <input
        type="text"
        placeholder="metasearch"
        required
        value=${model}
        oninput=${e => actionsUp({ oninput: e.target.value })}
      />
    </fieldset>
  </form>
</div>`
    function onsubmit (e) {
      e.preventDefault()
      actionsUp({ onsubmit: true })
    }
  }
})
