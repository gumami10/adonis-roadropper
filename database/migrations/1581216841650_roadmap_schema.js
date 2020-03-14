'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoadmapSchema extends Schema {
  up () {
    this.create('roadmaps', (table) => {
      table.increments()
      table
        .string('title', 80)
        .notNullable()
      table
        .string('subject', 60)
        .notNullable()
      table
        .string('content', 100000)
        .notNullable()
      table
        .int('moderation', 10)
        .notNullable()
      table
        .int('honor', 10)
        .defaultTo(0)
        .notNullable()
      table
        .string('links', 1200)
      table
        .string('target', 1200)
      table
        .int('creator', 60)
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .string('category', 30)
        .notNullable()
        .references('slug')
        .inTable('category')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('roadmaps')
  }
}

module.exports = RoadmapSchema
