import Equipment from '#models/equipment'
import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'

export default class EquipmentsController {
  async index({ request, response }: HttpContext) {
    const { type } = request.only(['type'])
    let equipments = await Equipment.all()

    if (type && type === 'home') {
      equipments = await Equipment.query().where('home', true).orderBy('id', 'desc')
    }
    if (type && type === 'gym') {
      equipments = await Equipment.query().where('gym', true).orderBy('id', 'desc')
    }

    return response.json({
      status: ResponseStatus.Ok,
      data: equipments,
    })
  }

  // async store({ request }: HttpContext) {}

  async show({ params, response }: HttpContext) {
    const equipment = await Equipment.findByOrFail({ id: params.id })

    return response.json({
      status: ResponseStatus.Ok,
      data: equipment,
    })
  }

  // async edit({ params }: HttpContext) {}

  // async destroy({ params }: HttpContext) {}
}
