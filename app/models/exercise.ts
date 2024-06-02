import { BaseModel, column, computed } from '@adonisjs/lucid/orm'

export default class Exercise extends BaseModel {
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
}
