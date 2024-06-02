/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const TrainingsController = () => import('#controllers/trainings_controller')

router.resource('trainings', TrainingsController).apiOnly().only(['index', 'show'])
