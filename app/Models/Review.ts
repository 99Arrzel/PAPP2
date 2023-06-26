import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Usuario from './Usuario';
import Locale from './Locale';

export default class Review extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  //puntaje, comentario, imagen, estado, usuarios_id, locales_id
  @column()
  public puntaje: number;

  @column()
  public comentario: string;

  @column()

  public imagen: string;

  @column()

  public estado: boolean;

  @column()

  public usuarios_id: number;

  @column()

  public locales_id: number;

  //Relaciones

  //Un review tiene un usuario
  @belongsTo(() => Usuario, {
    localKey: 'id',
    foreignKey: 'usuarios_id',
  })
  public usuario: BelongsTo<typeof Usuario>;

  //Un review tiene un local

  @belongsTo(() => Locale, {
    localKey: 'id',
    foreignKey: 'locales_id',
  })
  public local: BelongsTo<typeof Locale>;


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
