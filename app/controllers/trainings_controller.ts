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

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

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

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
