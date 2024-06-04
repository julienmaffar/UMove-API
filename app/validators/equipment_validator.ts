import vine from '@vinejs/vine'

export const createEquipmentValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
    picture: vine.string(),
    home: vine.boolean().optional(),
    gym: vine.boolean().optional(),
  })
)

export const updateEquipmentValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
    picture: vine.string(),
    home: vine.boolean().optional(),
    gym: vine.boolean().optional(),
  })
)
