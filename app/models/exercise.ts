import { BaseModel, column, computed, manyToMany } from '@adonisjs/lucid/orm'
import Category from './category.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Equipment from './equipment.js'

export default class Exercise extends BaseModel {
  static table = 'exercises'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare picture: string

  @column()
  declare animation: string

  @computed()
  get reps() {
    return this.$extras.pivot_reps
  }

  @computed()
  get mode() {
    return this.$extras.pivot_mode
  }

  @computed()
  get step() {
    return this.$extras.pivot_step
  }

  @manyToMany(() => Category, {
    pivotTable: 'category_exercise',
  })
  declare categories: ManyToMany<typeof Category>

  @manyToMany(() => Equipment, {
    pivotTable: 'exercise_equipment',
  })
  declare equipments: ManyToMany<typeof Equipment>
}
