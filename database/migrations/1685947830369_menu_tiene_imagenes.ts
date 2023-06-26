import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'menu_tiene_imagenes';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('menu_id').unsigned().references('id').inTable('menus').onDelete('CASCADE');
      table.integer('imagen_id').unsigned().references('id').inTable('imagenes').onDelete('CASCADE');

      //unique
      table.unique(['menu_id', 'imagen_id']);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
