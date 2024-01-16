import bcrypt from "bcrypt";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config({ path: ".env.local" });

export async function prepareDatabaseForTest() {
  const db = new pg.Client({
    connectionString: process.env.DATABASE_URL,
  });

  await db
    .connect()
    .catch(() => console.error("Failed to connect to database"));

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash("Password1234", saltRounds);

  await db
    .query(
      `
  DROP TABLE IF EXISTS tasks;
  DROP TABLE IF EXISTS users;

  CREATE TABLE IF NOT EXISTS users (
    id bigserial NOT NULL PRIMARY KEY,
    username varchar(100) NOT NULL UNIQUE,
    hashed_password varchar(100) NOT NULL,
    account_name varchar(100),
    profile_image_url varchar(100)
  );
  
  CREATE TABLE IF NOT EXISTS tasks (
    id bigserial NOT NULL PRIMARY KEY,
    name varchar(100) NOT NULL,
    description varchar(200),
    datetime timestamptz NOT NULL,
    priority smallint NOT NULL,
    category varchar(30) NOT NULL,
    status varchar(20) NOT NULL,
    user_id bigint NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  INSERT INTO users (username, hashed_password) VALUES ('Username', '${hashedPassword}');
  `,
    )
    .catch(err => {
      console.error("Failed to restart database");
      console.log(err.message);
    });
}
