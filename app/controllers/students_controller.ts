import type { HttpContext } from '@adonisjs/core/http'
import Student from '#models/student'

export default class StudentsController {
  public async index({ response }: HttpContext) {
    const data = await Student.all()
    return response.ok(data)
  }
  public async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['name', 'email', 'ra', 'cpf'])
      const entity = await Student.create(data)

      return response.created({
        message: 'Aluno(a) criado(a) com sucesso',
        data: entity,
      })
    } catch (error) {
      return response.badRequest({
        message: 'Falha ao criar o aluno',
        error: error.message,
      })
    }
  }
  public async show({ params, response }: HttpContext) {
    const { id } = params
    const data = await Student.find(id)
    return response.ok(data)
  }
  public async update({ params, request, response }: HttpContext) {
    const { ...data } = request.all()
    const entity = await Student.findOrFail(params.id)
    entity.merge({ ...data })
    await entity.save()
    return response.ok(entity)
  }
  public async destroy({ params, response }: HttpContext) {
    const entity = await Student.findOrFail(params.id)
    const result = await entity.delete()
    return response.ok(result)
  }
}
