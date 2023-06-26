import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import CategoriasLocale from 'App/Models/CategoriasLocale';

export default class CategoriasLocalesController {
  public async categorias({ response }: HttpContextContract) {
    const categorias = await CategoriasLocale.query();
    console.log(categorias, "Categorias");
    return response.status(200).json({
      categorias: categorias,
    });
  }

}
