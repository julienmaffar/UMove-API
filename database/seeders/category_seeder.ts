import Category from '#models/category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { promises as fs } from 'node:fs'
import { parse } from 'csv-parse/sync'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  static environment = ['development']

  async run() {
    await Category.createMany([
      { name: 'Cou' },
      { name: 'Epaules' },
      { name: 'Pectoraux' },
      { name: 'Dos' },
      { name: 'Biceps' },
      { name: 'Triceps' },
      { name: 'Avant-Bras' },
      { name: 'Jambes' },
      { name: 'Mollets' },
      { name: 'Hanches' },
      { name: 'Cardio' },
      { name: 'Fullbody' },
      { name: 'Adbominaux' },
    ])

    const content = await fs.readFile(`./fakeData/exercises_categories.csv`)
    const records = parse(content, {
      columns: true,
      skip_empty_lines: true,
    })

    for (const record of records) {
      await db.table('category_exercise').insert({
        exercise_id: record.exercice_id,
        category_id: record.category_id,
      })
    }
  }
}
