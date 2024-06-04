import { deleteCategory, editCategory } from '#abilities/main'
import Category from '#models/category'
import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  async index({ response }: HttpContext) {
    const categories = await Category.query()

    return response.json({
      status: ResponseStatus.Ok,
      data: categories,
    })
  }

  async store({ bouncer, request, response }: HttpContext) {
    if (await bouncer.denies(editCategory)) return response.abort(null, ResponseStatus.Unauthorized)

    const { name } = request.only(['name'])

    const category = await Category.create({
      name,
    })

    return response.json({
      status: ResponseStatus.Created,
      data: category,
    })
  }

  async show({ params, response }: HttpContext) {
    const category = await Category.findByOrFail({ id: params.id })

    return response.json({
      status: ResponseStatus.Ok,
      data: category,
    })
  }

  async update({ bouncer, params, request, response }: HttpContext) {
    if (await bouncer.denies(editCategory)) return response.abort(null, ResponseStatus.Unauthorized)

    const { name } = request.only(['name'])

    const category = await Category.findByOrFail({ id: params.id })
    await category.merge({ name }).save()

    return response.json({
      status: ResponseStatus.Ok,
    })
  }

  async destroy({ bouncer, params, response }: HttpContext) {
    if (await bouncer.denies(deleteCategory))
      return response.abort(null, ResponseStatus.Unauthorized)

    const category = await Category.findByOrFail({ id: params.id })
    await category.delete()

    return response.json({
      status: ResponseStatus.Ok,
    })
  }
}
