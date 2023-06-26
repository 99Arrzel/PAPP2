import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'menus';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      //titulo, descripción, precio, locales_id
      table.string('titulo', 255).notNullable();

      table.decimal('precio', 10, 2).nullable();
      table.integer('locales_id').unsigned().references('id').inTable('locales').onDelete('CASCADE');
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
