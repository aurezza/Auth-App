'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.on('/').render('home').as('home').middleware(['auth'])

Route.post('test', 'HomeController.upload')
Route.post('csv', 'HomeController.uploadCsv')
Route.get('test/:id', 'HomeController.index')
Route.get('api/test/:id', 'HomeController.testApi')

Route.get('modal', 'HomeController.modal')

Route.get('register', 'RegisterController.index').middleware(['authenticated'])
Route.get('register/confirm/:token', 'RegisterController.confirm')
Route.post('register', 'RegisterController.store')

Route.get('login', 'LoginController.index').middleware(['authenticated'])
Route.post('login', 'LoginController.show')

Route.get('logout', 'AuthenticatedController.index')

Route.get('password/reset', 'PasswordResetController.index')
Route.get('password/reset/:token', 'PasswordResetController.showResetForm')
Route.post('password/email', 'PasswordResetController.sendResetLink')
Route.post('password/reset', 'PasswordResetController.update')
