import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'reviews';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      //puntaje, comentario, imagen, estado, usuarios_id y locales_id
      table.integer('puntaje').notNullable();
      table.string('comentario', 255).notNullable();
      table.string('imagen', 255).nullable();
      table.boolean('estado').defaultTo(true).notNullable();
      table.integer('usuarios_id').unsigned().references('id').inTable('usuarios').onDelete('CASCADE');
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
