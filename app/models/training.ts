import { DateTime } from 'luxon'
import { BaseModel, column, computed, manyToMany } from '@adonisjs/lucid/orm'
import Exercise from './exercise.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Training extends BaseModel {
  static table = 'trainings'

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

  @computed()
  get categories() {
    const categories = new Set()

    this.exercises.forEach((exercise) => {
      exercise.categories.forEach((category) => {
        categories.add(category.name)
      })
    })

    return Array.from(categories)
  }

  @computed()
  get equipments() {
    const equipments = new Map()

    this.exercises.forEach((exercise) => {
      exercise.equipments.forEach((equipment) => {
        equipments.set(equipment.id, { name: equipment.name, picture: equipment.picture })
      })
    })

    return Array.from(equipments.values())
  }

  @computed()
  get workouts() {
    const exercises = this.exercises.sort((a, b) => a.step - b.step)

    const groupedItems = []
    let currentStep = 1
    let currentGroup = []

    for (const exercise of exercises) {
      if (exercise.step !== currentStep) {
        if (currentGroup.length > 0) groupedItems.push(currentGroup)
        currentGroup = []
        currentStep = exercise.step
      }
      currentGroup.push(exercise)
    }
    if (currentGroup.length > 0) groupedItems.push(currentGroup)

    return groupedItems
  }

  @manyToMany(() => Exercise, {
    pivotTable: 'training_exercise',
    pivotColumns: ['reps', 'step', 'mode'],
  })
  declare exercises: ManyToMany<typeof Exercise>
}
