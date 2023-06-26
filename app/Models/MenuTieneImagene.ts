import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class MenuTieneImagene extends BaseModel {
  @column({ isPrimary: true })
  public menu_id: number;

  @column({ isPrimary: true })
  public imagen_id: number;
}
