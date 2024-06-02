import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { promises as fs } from 'node:fs'
import { parse } from 'csv-parse/sync'
import Exercise from '#models/exercise'

export default class extends BaseSeeder {
  static environment = ['development']

  async run() {
    const content = await fs.readFile(`./fakeData/exercices.csv`)
    const records = parse(content, {
      columns: true,
      skip_empty_lines: true,
    })

    for (const record of records) {
      await Exercise.create({
        id: record.id,
        name: record.name,
        picture: record.picture,
        animation: record.animation,
      })
    }
  }
}
