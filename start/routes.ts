/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const InstitutionsController = () => import('#controllers/institutions_controller')
// const ClassesController = () => import('#controllers/classes_controller')
// const StudentsController = () => import('#controllers/students_controller')
// const RegistrationsController = () => import('#controllers/registrations_controller')

router
  .group(() => {
    router.get('/', async () => {
      return {
        hello: 'world',
      }
    })
    router.resource('/institutions', InstitutionsController).apiOnly()
    // router.resource('/classes', InstitutionsController).apiOnly()
    // router.resource('/students', InstitutionsController).apiOnly()
    // router.resource('/registrations', InstitutionsController).apiOnly()
  })
  .prefix('/api')
