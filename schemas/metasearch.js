var {
  services,
  categories
} = require('../configs/metasearch')

module.exports = {
  type: 'object',
  required: true,
  additionalProperties: false,
  properties: {
    services: {
      type: 'array',
      required: true,
      items: {
        type: 'string',
        enum: Object.values(services)
      }
    },
    category: {
      type: 'string',
      required: true,
      enum: Object.keys(categories)
    },
    value: {
      type: 'string',
      required: true,
      pattern: '^.+$'
    }
  }
}
