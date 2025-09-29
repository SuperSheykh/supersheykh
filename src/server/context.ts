import type postgres from 'postgres';

export type Context = {
  db: postgres.Sql;
};
