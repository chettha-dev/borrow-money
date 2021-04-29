let entities = ['dist/src/modules/**/**/**/*.model.{js,ts}'];
let migrations = ['dist/src/migrations/*.{js,ts}'];
let seeds = ['dist/src/seeds/*.seed.{js,ts}'];

if (process.env.NODE_ENV === 'development') {
  entities = ['src/modules/**/**/**/*.model.{js,ts}'];
  migrations = ['src/migrations/*.{js,ts}'];
  seeds = ['src/seeds/*.seed.{js,ts}'];
}

const ormConfig = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 40102,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities,
  migrations,
  seeds,
  synchronize: true,
  migrationsRun: true,
  cli: {
    migrationsDir: 'src/migrations',
  },
};

module.exports = ormConfig;
