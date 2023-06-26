import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class LocalesTienenImagene extends BaseModel {
  @column({ isPrimary: true })
  public local_id: number;

  @column({ isPrimary: true })
  public imagen_id: number;


}
