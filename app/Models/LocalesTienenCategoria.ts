import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Locale from './Locale';
import CategoriasLocale from './CategoriasLocale';

export default class LocalesTienenCategoria extends BaseModel {
  @column({ isPrimary: true })
  public local_id: number;

  @column({ isPrimary: true })
  public categoria_id: number;

  @belongsTo(() => Locale, {
    localKey: 'id',
    foreignKey: 'local_id',
  })
  public local: BelongsTo<typeof Locale>;

  @belongsTo(() => CategoriasLocale, {
    localKey: 'id',
    foreignKey: 'categoria_id',
  })
  public categoria: BelongsTo<typeof CategoriasLocale>;

}
