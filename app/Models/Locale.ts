import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, HasMany, ManyToMany, belongsTo, column, hasMany, manyToMany } from '@ioc:Adonis/Lucid/Orm';
import Usuario from './Usuario';
import Imagene from './Imagene';
import CategoriasLocale from './CategoriasLocale';
import Menu from './Menu';
import Review from './Review';

export default class Locale extends BaseModel {
  @column({ isPrimary: true })
  public id: number;
  //nombre, ubicacion, latitud, longitud, estado, id_usuario_creador y id_usuario_autorizador aparte de tipo que es sugerencia | real
  @column()
  public nombre: string;

  @column()
  public ubicacion: string;

  @column()

  public latitude: number;

  @column()

  public longitude: number;

  @column()

  public estado: boolean;

  @column()

  public id_usuario_creador: number;

  @column()

  public id_usuario_autorizador: number;

  @column()

  public tipo: 'sugerencia' | 'real';

  //Relaciones
  //Un local tiene un usuario creador
  @belongsTo(() => Usuario, {
    localKey: 'id',
    foreignKey: 'id_usuario_creador',
  })
  public usuario_creador: BelongsTo<typeof Usuario>;

  @belongsTo(() => Usuario, {
    localKey: 'id',
    foreignKey: 'id_usuario_autorizador',
  })
  public usuario_autorizador: BelongsTo<typeof Usuario>;


  @manyToMany(() => Imagene, {
    pivotTable: 'locales_tienen_imagenes',
    pivotForeignKey: 'local_id',
    pivotRelatedForeignKey: 'imagen_id',
    localKey: 'id',
    relatedKey: 'id',
  })
  public imagenes: ManyToMany<typeof Imagene>;


  @manyToMany(() => CategoriasLocale, {
    pivotTable: 'locales_tienen_categorias',
    pivotForeignKey: 'local_id',
    pivotRelatedForeignKey: 'categoria_id',
    localKey: 'id',
    relatedKey: 'id',
  })
  public categorias: ManyToMany<typeof CategoriasLocale>;
  //Menu
  @hasMany(() => Menu, {
    localKey: 'id',
    foreignKey: 'locales_id',
  })
  public menus: HasMany<typeof Menu>;

  //reviews
  @hasMany(() => Review, {
    localKey: 'id',
    foreignKey: 'locales_id',
  })
  public reviews: HasMany<typeof Review>;


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
