import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'locales';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('nombre', 255).notNullable();
      table.string('ubicacion', 255).notNullable();
      //Latitud y longitud
      table.float('latitude').notNullable();
      table.float('longitude').notNullable();

      table.boolean('estado').notNullable().defaultTo(true);
      table.integer('id_usuario_creador').unsigned().references('id').inTable('usuarios').onDelete('CASCADE');
      table.integer('id_usuario_autorizador').nullable().unsigned().references('id').inTable('usuarios').onDelete('CASCADE');
      table.enum('tipo', ['sugerencia', 'real']).notNullable().defaultTo('local');
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
