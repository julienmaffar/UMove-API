import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment = ['development']

  async run() {
    await User.createMany([
      {
        username: 'Julmix',
        email: 'julien.maffar@hotmail.com',
        password: 'julien123',
        weight: 83,
      },
      {
        username: 'Julien',
        email: 'admin@admin.com',
        password: 'julien123',
        weight: 83,
        admin: true,
      },
    ])
  }
}
