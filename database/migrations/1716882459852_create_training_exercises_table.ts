import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'training_exercise'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('training_id').unsigned().references('trainings.id')
      table.integer('exercise_id').unsigned().references('exercises.id')
      table.integer('step').defaultTo(1)
      table.integer('mode').defaultTo(1)
      table.integer('reps').defaultTo(1)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
