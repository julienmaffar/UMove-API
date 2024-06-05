import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { promises as fs } from 'node:fs'
import { parse } from 'csv-parse/sync'
import Equipment from '#models/equipment'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  static environment = ['development']

  async run() {
    const content = await fs.readFile(`./fakeData/equipments.csv`)
    const records = parse(content, {
      columns: true,
      skip_empty_lines: true,
    })

    for (const record of records) {
      await Equipment.create({
        id: record.id,
        name: record.name,
        picture: record.picture,
        home: record.home,
        gym: record.gym,
      })
    }

    const contentExercisesEquipments = await fs.readFile(`./fakeData/exercises_equipments.csv`)
    const recordsExercisesEquipments = parse(contentExercisesEquipments, {
      columns: true,
      skip_empty_lines: true,
    })

    for (const record of recordsExercisesEquipments) {
      await db.table('exercise_equipment').insert({
        exercise_id: record.exercise_id,
        equipment_id: record.equipment_id,
      })
    }
  }
}
