import Exercise from '#models/exercise'
import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'

export default class ExercisesController {
  async index({ response }: HttpContext) {
    const exercises = await Exercise.query().preload('equipments')

    return response.json({
      status: ResponseStatus.Ok,
      data: exercises,
    })
  }

  async show({ params, response }: HttpContext) {
    const exercise = await Exercise.query()
      .where('id', params.id)
      .preload('equipments')
      .firstOrFail()

    return response.json({
      status: ResponseStatus.Ok,
      data: exercise,
    })
  }
}
