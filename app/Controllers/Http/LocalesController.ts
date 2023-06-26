import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Locale from 'App/Models/Locale';
export default class LocalesController {


  /* tipo a "real" y estado boolean true */

  public async aceptar_local({ request, response }: HttpContextContract) {
    console.log("Aceptar local");
    const newLocationSchema = schema.create({
      id: schema.number(),
    });
    const payload = await request.validate({ schema: newLocationSchema });
    try {
      const local = await Locale.findOrFail(payload.id);
      local.estado = true;
      local.tipo = 'real';
      await local.save();
      return response.status(200).json({
        local: local,
      });
    } catch (error) {
      console.log(error, "Aceptar local");
      return response.status(500).json({
        error: error,
      });
    }
  }
  /* Tipo sugerencia y estado boolean false */
  public async rechazar_local({ request, response }: HttpContextContract) {
    console.log("Rechazar local");
    const newLocationSchema = schema.create({
      id: schema.number(),
    });
    const payload = await request.validate({ schema: newLocationSchema });
    try {
      const local = await Locale.findOrFail(payload.id);
      local.estado = false;
      local.tipo = 'sugerencia';
      await local.save();
      return response.status(200).json({
        local: local,
      });
    } catch (error) {
      console.log(error, "Rechazar local");
      return response.status(500).json({
        error: error,
      });
    }
  }

  public async locales_por_aceptar({ response }: HttpContextContract) {
    console.log("Locales por aceptar");
    try {
      const locales = await Locale.query().where('estado', true).where('tipo', 'sugerencia')
        .preload('menus')
        .preload('categorias')
        .preload('reviews')
        .preload('imagenes')
        .preload('usuario_creador')
        .orderBy('created_at', 'desc');
      return response.status(200).json({
        locales: locales,
      });
    } catch (error) {
      console.log(error, "Locales por aceptar");
      return response.status(500).json({
        error: error,
      });
    }
  }

  public async locales_activos({ response }: HttpContextContract) {
    console.log("Locales activos");
    try {
      const locales = await Locale.query().where('estado', true).where('tipo', 'real')
        .preload('menus')
        .preload('categorias')
        .preload('reviews', (query) => {
          query.preload('usuario');
        })
        .preload('imagenes');
      return response.status(200).json({
        locales: locales,
      });
    } catch (error) {
      console.log(error, "Locales activos");
      return response.status(500).json({
        error: error,
      });
    }
  }

  public async sugerir({ request, response, auth }: HttpContextContract) {
    console.log("Sugerir", request.body());
    const newLocationSchema = schema.create({
      nombre: schema.string({ trim: true }, [
        rules.unique({ table: 'locales', column: 'nombre' }),
      ]),
      latitude: schema.number(),
      longitude: schema.number(),
      ubicacion: schema.string(),
      categorias: schema.array().members(schema.number()),
      imagenes: schema.array().members(schema.string()), //urls de minio
      //menu, tiene nombre y precio y es un array de estos
      menu: schema.array().members(schema.object().members({
        nombre: schema.string(),
        precio: schema.number(),
      })),

    });
    const payload = await request.validate({ schema: newLocationSchema });

    //registro del nuevo local
    try {
      const user = await auth.authenticate();
      const local = await user.related('locales_sugeridos').create({
        nombre: payload.nombre,
        latitude: payload.latitude,
        longitude: payload.longitude,
        ubicacion: payload.ubicacion,
        tipo: 'sugerencia',
      });
      await local.related('categorias').sync(payload.categorias);
      //Crear las imagenes y relacionarlas
      await local.related('imagenes').createMany(payload.imagenes.map((imagen) => {
        return {
          url: imagen,
          alt: "Imagen de local"
        };
      }));
      //los menus igual se crean y se relacionan
      await local.related('menus').createMany(payload.menu.map((menu) => {
        return {
          titulo: menu.nombre,
          precio: Number(menu.precio),
        };
      }));

      return response.status(200).json({
        local: local,
      });

    }
    catch (error) {
      console.log(error);
      return response.status(500).json({
        error: error,
      });
    }



  }

}
