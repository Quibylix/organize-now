import pg from "pg";

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export default db;

export function sql(template: TemplateStringsArray, ...expressions: unknown[]) {
  const query = template.reduce((acc, curr, i) => {
    return acc + "$" + i + curr;
  });

  return db.query(query, expressions);
}
