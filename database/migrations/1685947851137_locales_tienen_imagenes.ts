import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'locales_tienen_imagenes';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('local_id').unsigned().references('id').inTable('locales').onDelete('CASCADE');
      table.integer('imagen_id').unsigned().references('id').inTable('imagenes').onDelete('CASCADE');

      //unique
      table.unique(['local_id', 'imagen_id']);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
