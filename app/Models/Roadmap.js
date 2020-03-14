'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Roadmap extends Model {
  static castDates (field, value) {
    if (field === 'created_at' || field === 'updated_at') {
      return `${value.fromNow()}`
    }
    return super.formatDates(field, value)
  }
}

module.exports = Roadmap
