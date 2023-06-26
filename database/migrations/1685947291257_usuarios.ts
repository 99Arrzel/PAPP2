import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'usuarios';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.string('email', 255).notNullable().unique();
      table.string('password', 180).notNullable();
      table.string('remember_me_token').nullable();
      table.string('nombre', 255).nullable();

      table.string('estado_perfil', 255).nullable();
      table.boolean('estado_usuario').defaultTo(true).notNullable();
      table.string('foto_perfil', 255).nullable();

      table.enum('tipo', ['admin', 'usuario']).notNullable().defaultTo('usuario');

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable();
      table.timestamp('updated_at', { useTz: true }).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
