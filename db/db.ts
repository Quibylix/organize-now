import pg from "pg";

const db = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});

db.connect()
  .then(() => {
    console.log("Connected to database");
  })
  .catch(err => {
    console.log("Error connecting to database");
    console.log(err);
  });

export default db;
