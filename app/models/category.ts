import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Exercise from './exercise.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @manyToMany(() => Exercise, {
    pivotTable: 'category_exercise',
  })
  declare exercises: ManyToMany<typeof Exercise>
}
