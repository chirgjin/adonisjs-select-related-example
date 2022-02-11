/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/users', 'UsersController.index')
Route.get('/users/filter-by-phone-number/', 'UsersController.filterByPhoneNumber')
Route.get(
  '/users/filter-by-phone-number/without-profile/',
  'UsersController.filterByPhoneNumberWithoutProfile'
)
Route.get('/users/with-only-phone-number/', 'UsersController.withOnlyPhoneNumber')
Route.get('/users/:id/', 'UsersController.show').where('id', /^\d+$/)

Route.get('users/filter-by-todo-item/', 'NestedExampleController.filterByTodoItem')
Route.get('users/select-related-with-preload', 'NestedExampleController.selectRelatedWithPreload')
Route.get('users/without-profile/', 'NestedExampleController.usersWithoutProfile')
