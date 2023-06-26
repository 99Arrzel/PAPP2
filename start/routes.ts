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

import Route from '@ioc:Adonis/Core/Route';


Route.group(() => {
  //Login
  Route.post('/login', 'UsuariosController.login');
  Route.post('/registrar', 'UsuariosController.registrar');
  Route.get('/logout', 'UsuariosController.logout');
  Route.post('/isAuth', 'UsuariosController.isAuth');
  //Locales
  Route.post('/locales_activos', 'LocalesController.locales_activos');
  Route.post('/categorias', 'CategoriasLocalesController.categorias');
  //Auth
  Route.group(() => {
    Route.post('/crear_review', 'ReviewsController.calificar');
    Route.post('/get_url_upload', 'MinioController.getUrlUpload');
    Route.post('/sugerir', 'LocalesController.sugerir');
    Route.post('/locales_por_aceptar', 'LocalesController.locales_por_aceptar');
    Route.post('/aceptar_local', 'LocalesController.aceptar_local');
    Route.post('/rechazar_local', 'LocalesController.rechazar_local');
    Route.post('/editar_nombre', 'UsuariosController.editar_nombre');
    Route.post('/editar_foto_perfil', 'UsuariosController.editar_foto_perfil');
  }).middleware('auth');
}).prefix('api/v1');
Route.get('/', async () => {
  return `API de pollos App, Prefix: api/v1;
  //Login
  Route.post('/login', 'UsuariosController.login');
  Route.post('/registrar', 'UsuariosController.registrar');
  Route.get('/logout', 'UsuariosController.logout');
  Route.post('/isAuth', 'UsuariosController.isAuth');
  //Locales
  Route.post('/locales_activos', 'LocalesController.locales_activos');
  Route.post('/categorias', 'CategoriasLocalesController.categorias');
  //Auth
  Route.group(() => {
    Route.post('/crear_review', 'ReviewsController.calificar');
    Route.post('/get_url_upload', 'MinioController.getUrlUpload');
    Route.post('/sugerir', 'LocalesController.sugerir');
    Route.post('/locales_por_aceptar', 'LocalesController.locales_por_aceptar');
    Route.post('/aceptar_local', 'LocalesController.aceptar_local');
    Route.post('/rechazar_local', 'LocalesController.rechazar_local');
    Route.post('/editar_nombre', 'UsuariosController.editar_nombre');
    Route.post('/editar_foto_perfil', 'UsuariosController.editar_foto_perfil');
  }).middleware('auth');
  `;
});
