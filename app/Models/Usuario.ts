import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import Locale from './Locale';
import Review from './Review';

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public rememberMeToken: string | null;

  //nombre, estado_perfil, estado_usuario y foto_perfil
  @column()
  public nombre: string;

  @column()

  public estado_perfil: string | null;

  @column()

  public estado_usuario: boolean;

  @column()

  public foto_perfil: string | null;


  @column()
  public tipo: 'admin' | 'usuario';
  //relaciones, locales

  @hasMany(() => Locale, {
    localKey: 'id',
    foreignKey: 'id_usuario_creador',
  })
  public locales_sugeridos: HasMany<typeof Locale>;

  @hasMany(() => Locale, {
    localKey: 'id',
    foreignKey: 'id_usuario_autorizador',
  })
  public locales_autorizados: HasMany<typeof Locale>;

  //has many reviews
  @hasMany(() => Review, {
    localKey: 'id',
    foreignKey: 'usuarios_id',
  })
  public reviews: HasMany<typeof Review>;









  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(usuario: Usuario) {
    if (usuario.$dirty.password) {
      usuario.password = await Hash.make(usuario.password);
    }
  }
}
