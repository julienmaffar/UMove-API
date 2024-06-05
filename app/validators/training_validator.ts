import vine from '@vinejs/vine'

export const addWorkoutsTrainingValidator = vine.compile(
  vine.object({
    workouts: vine.array(
      vine.object({
        exercise_id: vine.number().positive().withoutDecimals(),
        step: vine.number().positive().withoutDecimals(),
        mode: vine.number().range([1, 3]).withoutDecimals(),
        reps: vine.number().positive().max(100).withoutDecimals(),
      })
    ),
  })
)
