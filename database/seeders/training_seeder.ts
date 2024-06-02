import Training from '#models/training'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  static environment = ['development']

  async run() {
    // Trainings creation
    await Training.create({
      name: 'Summer Body',
      picture: faker.image.urlLoremFlickr(),
      level: faker.number.int({ min: 1, max: 3 }),
      description: faker.lorem.paragraphs({ min: 1, max: 3 }),
    })

    // Associate exercises into trainings
    const exercisesId = [390, 390, 412, 190, 510]
    for (const [index, id] of exercisesId.entries()) {
      await db.table('training_exercise').insert({
        training_id: 1,
        exercise_id: id,
        step: index > 2 ? 2 : 1,
        reps: faker.number.int({ min: 5, max: 20 }),
        mode: 1,
      })
    }
  }
}
