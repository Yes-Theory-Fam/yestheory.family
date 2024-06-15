import Postgres from 'pg';
import PgConnectionString from 'pg-connection-string';

export const ensureDbExists = async () => {
  const uri = process.env.DATABASE_URI ?? '';
  const {database, user, password, host, port} = PgConnectionString.parse(uri);

  const postgresUri = `postgres://${user}:${password}@${host}:${port}/postgres`;
  const client = new Postgres.Client(postgresUri);

  await client.connect();
  const existingDatabase = await client.query(
    `SELECT FROM pg_database WHERE datname = $1`,
    [database],
  );
  if (existingDatabase.rowCount == 0) {
    console.info(`Database ${database} not found! Creating new database!`);
    await client.query(`CREATE DATABASE ${database}`);
    console.info(`Database ${database} created!`);
  }

  await client.end();
};