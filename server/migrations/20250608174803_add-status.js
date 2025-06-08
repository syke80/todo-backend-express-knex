exports.up = async function(knex) {
  // First, create the enum type in PostgreSQL
  await knex.raw(`
    CREATE TYPE task_status AS ENUM ('todo', 'in_progress', 'done')
  `);
  
  // Add the status column with the enum type
  await knex.schema.alterTable('todos', function(table) {
    table.specificType('status', 'task_status');
  });
  
  // Update status values based on completed field
  await knex.raw(`
    UPDATE todos 
    SET status = CASE 
      WHEN completed = true THEN 'done'::task_status
      WHEN completed = false THEN 'todo'::task_status
    END
  `);
  
  // Make status column NOT NULL (optional, but recommended)
  await knex.schema.alterTable('todos', function(table) {
    table.specificType('status', 'task_status').notNullable().defaultTo('todo').alter();
  });
  
  // Drop the completed column
  await knex.schema.alterTable('todos', function(table) {
    table.dropColumn('completed');
  });
};

exports.down = async function(knex) {
  // Add back the completed column
  await knex.schema.alterTable('todos', function(table) {
    table.boolean('completed');
  });
  
  // Update completed values based on status field
  await knex.raw(`
    UPDATE todos 
    SET completed = CASE 
      WHEN status = 'done' THEN true
      WHEN status IN ('todo', 'in_progress') THEN false
    END
  `);
  
  // Make completed column NOT NULL if it was before
  await knex.schema.alterTable('todos', function(table) {
    table.boolean('completed').notNullable().alter();
  });
  
  // Drop the status column
  await knex.schema.alterTable('todos', function(table) {
    table.dropColumn('status');
  });
  
  // Drop the enum type
  await knex.raw('DROP TYPE IF EXISTS task_status');
};
