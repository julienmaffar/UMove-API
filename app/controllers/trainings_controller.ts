import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'
import Training from '#models/training'

export default class TrainingsController {
  async index({ response }: HttpContext) {
    const trainings = await Training.query().preload('exercises', (exercisesQuery) => {
      exercisesQuery.preload('categories')
    })

    return response.json({
      status: ResponseStatus.Ok,
      data: trainings,
    })
  }

  async show({ params, response }: HttpContext) {
    const training = await Training.query()
      .where('id', params.id)
      .preload('exercises', (exercisesQuery) => {
        exercisesQuery.preload('categories')
      })
      .first()

    return response.json({
      status: ResponseStatus.Ok,
      data: training,
    })
  }

  // async store({ request }: HttpContext) {}

  // async update({ params, request }: HttpContext) {}

  // async destroy({ params }: HttpContext) {}
}
