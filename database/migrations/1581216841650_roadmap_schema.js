'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoadmapSchema extends Schema {
  up () {
    this.create('roadmaps', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.string('subject', 60).notNullable()
      table.string('creator', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('roadmaps')
  }
}

module.exports = RoadmapSchema
