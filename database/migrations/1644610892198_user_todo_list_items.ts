import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserTodoListItems extends BaseSchema {
  protected tableName = 'user_todo_list_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('user_todo_list_id')
        .unsigned()
        .references('id')
        .inTable('user_todo_lists')
        .notNullable()

      table.string('item_name').notNullable()
      table.boolean('completed').defaultTo(false)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
