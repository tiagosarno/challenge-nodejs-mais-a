import type { HttpContext } from '@adonisjs/core/http'
import Registration from '#models/registration'

export default class RegistrationsController {
  public async index({ response }: HttpContext) {
    const data = await Registration.all()
    return response.ok(data)
  }
  public async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['student_id', 'class_id'])
      const entity = await Registration.create(data)

      return response.created({
        message: 'Aluno(a) matriculado(a) com sucesso',
        data: entity,
      })
    } catch (error) {
      return response.badRequest({
        message: 'Falha ao matricular o(a) aluno(a)',
        error: error.message,
      })
    }
  }
  public async show({ params, response }: HttpContext) {
    const { id } = params
    const data = await Registration.find(id)
    return response.ok(data)
  }
  public async update({ params, request, response }: HttpContext) {
    const { ...data } = request.all()
    const entity = await Registration.findOrFail(params.id)
    entity.merge({ ...data })
    await entity.save()
    return response.ok(entity)
  }
  public async destroy({ params, response }: HttpContext) {
    const entity = await Registration.findOrFail(params.id)
    const result = await entity.delete()
    return response.ok(result)
  }
}
