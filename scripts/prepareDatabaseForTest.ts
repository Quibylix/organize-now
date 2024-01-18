import { MOCKED_TASKS } from "@/features/tasks/components/tasks/__mocks__/tasks.mock";
import { Task } from "@/features/tasks/components/tasks/types/task.type";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import pg, { Client } from "pg";

dotenv.config({ path: ".env.local" });

export async function prepareDatabaseForTest() {
  const db = new pg.Client({
    connectionString: process.env.DATABASE_URL,
  });

  await db
    .connect()
    .catch(() => console.error("Failed to connect to database"));

  await createDatabases(db).catch(err => {
    console.error("Failed to create databases");
    console.log(err.message);
  });

  await insertMockedUsers(db).catch(err => {
    console.error("Failed to insert mocked users");
    console.log(err.message);
  });

  await insertMockedTasks(db, 1).catch(err => {
    console.error("Failed to insert mocked tasks");
    console.log(err.message);
  });
}

const createDatabases = (db: Client) => {
  return db.query(`
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
  `);
};

const insertMockedUsers = async (db: Client) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash("Password1234", saltRounds);

  return db.query(
    `
  INSERT INTO users (username, hashed_password) VALUES
  ('Username', '${hashedPassword}'),
  ('Username2', '${hashedPassword}'),
  ('Username3', '${hashedPassword}');
  `,
  );
};

const insertMockedTasks = (db: Client, userId: number) => {
  let query =
    "INSERT INTO tasks (name, description, datetime, priority, category, status, user_id) VALUES ";

  let i = 0;
  const values: Task[keyof Task][] = [];

  MOCKED_TASKS.forEach((task, index) => {
    const { name, description, datetime, priority, category, status } = task;

    query += `($${i + 1}, $${i + 2}, $${i + 3}, $${i + 4}, $${i + 5}, $${
      i + 6
    }, $${i + 7})`;
    values.push(
      name,
      description,
      datetime,
      priority,
      category,
      status,
      userId,
    );
    i += 7;

    if (index !== MOCKED_TASKS.length - 1) {
      query += ", ";
    }
  });

  query += ";";

  return db.query(query, values);
};
