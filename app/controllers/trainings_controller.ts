import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'
import Training from '#models/training'

export default class TrainingsController {
  async index({ request, response }: HttpContext) {
    const trainings = await Training.query().preload('exercises')
    return response.json({
      status: ResponseStatus.Ok,
      data: trainings,
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
