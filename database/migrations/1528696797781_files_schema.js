'use strict'

const Schema = use('Schema')

class FilesSchema extends Schema {
  up () {
    this.create('files', (table) => {
      table.increments()
      table.string('file_name')
      table.string('first_name')
      table.string('last_name')
      table.string('email')
      table.string('gender')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('files')
  }
}

module.exports = FilesSchema
