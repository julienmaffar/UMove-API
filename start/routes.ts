/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const UsersController = () => import('#controllers/users_controller')
const TrainingsController = () => import('#controllers/trainings_controller')
const EquipmentsController = () => import('#controllers/equipments_controller')

// Users
router.post('users/register', [UsersController, 'register'])
router.post('users/login', [UsersController, 'login'])

// Trainings
router
  .resource('trainings', TrainingsController)
  .only(['index', 'show'])
  .use(['index', 'show'], middleware.auth({ guards: ['api'] }))

// Equipments
router
  .resource('equipments', EquipmentsController)
  .use(['index', 'show', 'destroy', 'store', 'update'], middleware.auth({ guards: ['api'] }))
  .apiOnly()
