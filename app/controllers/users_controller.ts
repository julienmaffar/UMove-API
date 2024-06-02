import User from '#models/user'
import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return response.json({
      status: ResponseStatus.Ok,
      data: token,
    })
  }

  async register({ request, response }: HttpContext) {
    const credentials = request.only(['username', 'email', 'password', 'weight'])

    await User.create({
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
      weight: credentials.weight,
    })

    return response.json({
      status: ResponseStatus.Ok,
    })
  }

  // async index({}: HttpContext) {}

  // async store({ request }: HttpContext) {}

  // async show({ params }: HttpContext) {}

  // async edit({ params }: HttpContext) {}

  // async destroy({ params }: HttpContext) {}
}
