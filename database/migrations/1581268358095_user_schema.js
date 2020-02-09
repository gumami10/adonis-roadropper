'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.string('description', 100000)
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('description')
    })
  }
}

module.exports = UserSchema
