import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Locale from './Locale';

export default class Menu extends BaseModel {
  @column({ isPrimary: true })
  public id: number;
  //titulo, descripcion, precio, locales_id
  @column()
  public titulo: string;

  @column()
  public descripcion: string;

  @column()

  public precio: number | null;

  @column()

  public locales_id: number;

  //Relaciones

  //Un menu tiene un local
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
