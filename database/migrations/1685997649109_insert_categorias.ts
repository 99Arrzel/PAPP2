import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {


  public async up() {
    await this.db.table('categorias_locales').insert([
      { nombre: 'Cafetería' },
      { nombre: 'Restaurante' },
      { nombre: 'Salchipaperia/Hamburguesería' },
      { nombre: 'Pizzería' },
      { nombre: 'Heladería' },
      { nombre: 'Panadería' },
    ]);
    /* INSERT INTO public.usuarios
(id, email, "password", remember_me_token, nombre, estado_perfil, estado_usuario, foto_perfil, tipo, created_at, updated_at)
VALUES(1, 'af.carrillo@live.com', '$scrypt$n=16384,r=8,p=1$blEEuekhx+SmqIp5/yvJ8w$0QfHfzT++94fv6lUesdu/9uj3914Zx1oQfn9RRn3N+/4Jx+/yTxvXAAsZSM0Xg8mUnym+FoLXZbcEhxAWAU2pg', NULL, NULL, NULL, true, NULL, 'admin', '2023-06-05 07:13:23.249', '2023-06-05 07:13:23.249');
 */
    await this.db.table('usuarios').insert([
      {
        id: 1,
        email: 'af.carrillo@live.com',
        password: '$scrypt$n=16384,r=8,p=1$blEEuekhx+SmqIp5/yvJ8w$0QfHfzT++94fv6lUesdu/9uj3914Zx1oQfn9RRn3N+/4Jx+/yTxvXAAsZSM0Xg8mUnym+FoLXZbcEhxAWAU2pg',
        tipo: 'admin',
        created_at: '2023-06-05 07:13:23.249',
        updated_at: '2023-06-05 07:13:23.249',
      }
    ]);
  }
  public async down() {

  }
}
