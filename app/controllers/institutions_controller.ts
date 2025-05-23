import type { HttpContext } from '@adonisjs/core/http'
import Institution from '#models/institution'

export default class InstitutionsController {
  public async index({ response }: HttpContext) {
    const data = await Institution.all()
    return response.ok(data)
  }
  public async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['name'])
      const institution = await Institution.create(data)

      return response.created({
        message: 'Instituição criada com sucesso',
        data: institution,
      })
    } catch (error) {
      return response.badRequest({
        message: 'Falha ao criar a instituição',
        error: error.message,
      })
    }
  }
  public async show({ params, response }: HttpContext) {
    const { id } = params
    const data = await Institution.find(id)
    return response.ok(data)
  }
  public async update({ params, request, response }: HttpContext) {
    const { ...data } = request.all()
    const entity = await Institution.findOrFail(params.id)
    entity.merge({ ...data })
    await entity.save()
    return response.ok(entity)
  }
  public async destroy({ params, response }: HttpContext) {
    const entity = await Institution.findOrFail(params.id)
    const result = await entity.delete()
    return response.ok(result)
  }
}
