import type { HttpContext } from '@adonisjs/core/http'
import Class from '#models/class'

export default class ClassesController {
  public async index({ response }: HttpContext) {
    const data = await Class.all()
    return response.ok(data)
  }
  public async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['name', 'institution_id'])
      const entity = await Class.create(data)

      return response.created({
        message: 'Turma criada com sucesso',
        data: entity,
      })
    } catch (error) {
      return response.badRequest({
        message: 'Falha ao criar a turma',
        error: error.message,
      })
    }
  }
  public async show({ params, response }: HttpContext) {
    const { id } = params
    const data = await Class.find(id)
    return response.ok(data)
  }
  public async update({ params, request, response }: HttpContext) {
    const { ...data } = request.all()
    const entity = await Class.findOrFail(params.id)
    entity.merge({ ...data })
    await entity.save()
    return response.ok(entity)
  }
  public async destroy({ params, response }: HttpContext) {
    const entity = await Class.findOrFail(params.id)
    const result = await entity.delete()
    return response.ok(result)
  }
}
