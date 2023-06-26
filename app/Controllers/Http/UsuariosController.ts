import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Usuario from 'App/Models/Usuario';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
export default class UsuariosController {
  public async isAuth({ auth, response }: HttpContextContract) {
    try {
      const user = await auth.authenticate();
      return response.status(200).json({
        user: user,
      });
    } catch (error) {
      return response.status(401).json({
        error: error,
      });
    }
  }
  public async login({ auth, request, response }: HttpContextContract) {
    console.log("Login");
    const email = request.input('email');
    const password = request.input('password');
    try {
      const token = await auth.use('api').attempt(email, password);
      console.log(token, "Token enviado");
      return response.status(200).json({
        token: token,
        user: token.user,
      });
    } catch (error) {
      console.log(error);
      return response.status(401).json({ error: "Credenciales invalidos" });
    }
  }
  public async registrar({ auth, request, response }: HttpContextContract) {
    const newUserSchema = schema.create({
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'usuarios', column: 'email' }),
      ]),
      password: schema.string({ trim: true }, [rules.minLength(8)]),
    });
    const payload = await request.validate({ schema: newUserSchema });

    //Ahora a registrar el usuario con el elmail y la password
    try {
      //Auto password hash
      const user = await Usuario.create({ email: payload.email, password: payload.password });
      const token = await auth.use('api').login(user);
      return response.status(200).json({
        user: user,
        token: token,
      });
    } catch (error) {
      console.log(error);
      return response.status(401).json({ error: error.message });
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    try {
      await auth.use('api').revoke();
      return response.status(200).json({ message: "Logout exitoso" });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: error.message });
    }
  }
  //Editar foto_perfil
  public async editar_foto_perfil({ auth, request, response }: HttpContextContract) {
    console.log("Editar foto perfil");
    const newLocationSchema = schema.create({
      foto_perfil: schema.string(),
    });
    const payload = await request.validate({ schema: newLocationSchema });
    try {
      const user = await auth.authenticate();
      user.foto_perfil = payload.foto_perfil;
      await user.save();
      return response.status(200).json({
        user: user,
      });
    } catch (error) {
      console.log(error, "Editar foto perfil");
      return response.status(500).json({
        error: error,
      });
    }
  }
  //Editar nombre
  public async editar_nombre({ auth, request, response }: HttpContextContract) {
    console.log("Editar nombre");
    const newLocationSchema = schema.create({
      nombre: schema.string(),
    });
    const payload = await request.validate({ schema: newLocationSchema });
    try {
      const user = await auth.authenticate();
      user.nombre = payload.nombre;
      await user.save();
      return response.status(200).json({
        user: user,
      });
    } catch (error) {
      console.log(error, "Editar nombre");
      return response.status(500).json({
        error: error,
      });
    }
  }

}
