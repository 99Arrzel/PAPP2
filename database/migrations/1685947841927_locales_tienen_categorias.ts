import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'locales_tienen_categorias';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      //local_id y categoria_id
      table.integer('local_id').unsigned().references('id').inTable('locales').onDelete('CASCADE');
      table.integer('categoria_id').unsigned().references('id').inTable('categorias_locales').onDelete('CASCADE');

      //unique
      table.unique(['local_id', 'categoria_id']);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
