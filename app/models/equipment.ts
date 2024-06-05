import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Equipment extends BaseModel {
  static table = 'equipments'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare picture: string

  @column()
  declare home: boolean

  @column()
  declare gym: boolean
}
