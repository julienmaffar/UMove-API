import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'
import Training from '#models/training'
import { addWorkoutsTrainingValidator } from '#validators/training_validator'
import db from '@adonisjs/lucid/services/db'

export default class TrainingsController {
  async index({ response }: HttpContext) {
    const trainings = await Training.query().preload('exercises', (exercisesQuery) => {
      exercisesQuery.preload('categories')
    })

    return response.json({
      status: ResponseStatus.Ok,
      data: trainings.map((training) => {
        const trainingSerialize = training.serialize({
          fields: {
            omit: ['description', 'workouts'],
          },
        })
        delete trainingSerialize.exercises
        return { ...trainingSerialize }
      }),
    })
  }

  async show({ params, response }: HttpContext) {
    const training = await Training.query()
      .where('id', params.id)
      .preload('exercises', (exercisesQuery) => {
        exercisesQuery.preload('categories').preload('equipments')
      })
      .first()

    const trainingSerialize = training?.serialize()
    delete trainingSerialize?.exercises

    return response.json({
      status: ResponseStatus.Ok,
      data: trainingSerialize,
    })
  }

  async addWorkouts({ params, request, response }: HttpContext) {
    const data = request.all()
    const payload = await addWorkoutsTrainingValidator.validate(data)

    const training = await Training.findByOrFail({ id: params.id })

    for (const workout of payload.workouts) {
      await db.table('training_exercise').insert({
        training_id: training.id,
        exercise_id: workout.exercise_id,
        step: workout.step,
        mode: workout.mode,
        reps: workout.reps,
      })
    }

    return response.json({
      status: ResponseStatus.Ok,
    })
  }

  // async store({ request }: HttpContext) {}

  // async update({ params, request }: HttpContext) {}

  // async destroy({ params }: HttpContext) {}
}
