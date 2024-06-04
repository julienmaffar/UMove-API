import { deleteEquipment, editEquipment } from '#abilities/main'
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

  async store({ bouncer, request, response }: HttpContext) {
    if (await bouncer.denies(editEquipment))
      return response.abort(null, ResponseStatus.Unauthorized)

    const { name, picture, home, gym } = request.only(['name', 'picture', 'home', 'gym'])

    const equipment = await Equipment.create({
      name,
      picture,
      home,
      gym,
    })

    return response.json({
      status: ResponseStatus.Created,
      data: equipment,
    })
  }

  async show({ params, response }: HttpContext) {
    const equipment = await Equipment.findByOrFail({ id: params.id })

    return response.json({
      status: ResponseStatus.Ok,
      data: equipment,
    })
  }

  async update({ bouncer, request, params, response }: HttpContext) {
    if (await bouncer.denies(editEquipment))
      return response.abort(null, ResponseStatus.Unauthorized)

    const { name, picture, home, gym } = request.only(['name', 'picture', 'home', 'gym'])

    const equipment = await Equipment.findByOrFail({ id: params.id })
    await equipment.merge({ name, picture, home, gym }).save()

    return response.json({
      status: ResponseStatus.Ok,
    })
  }

  async destroy({ bouncer, params, response }: HttpContext) {
    if (await bouncer.denies(deleteEquipment))
      return response.abort(null, ResponseStatus.Unauthorized)

    const equipment = await Equipment.findByOrFail({ id: params.id })
    await equipment.delete()

    return response.json({
      status: ResponseStatus.Ok,
    })
  }
}
