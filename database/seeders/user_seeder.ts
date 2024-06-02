import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment = ['development']

  async run() {
    await User.create({
      username: 'Julmix',
      email: 'julien.maffar@hotmail.com',
      password: 'julien123',
      weight: 83,
    })
  }
}
