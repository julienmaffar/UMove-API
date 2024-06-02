import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Exercise from './exercise.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Training extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare picture: string | null

  @column()
  declare level: number

  @column()
  declare description: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Exercise, {
    pivotTable: 'training_exercise',
    pivotColumns: ['reps', 'step', 'mode'],
  })
  declare exercises: ManyToMany<typeof Exercise>
}
