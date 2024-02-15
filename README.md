# Organize Now 📝

This is a simple to-do app that allows you to add, edit, and delete tasks. It also allows you to mark tasks as complete. The app is built using Next.js.

## Installation

1. Clone the repo

```sh
git clone https://github.com/quibylix/todo-app
```

2. Install NPM packages

```sh
pnpm install
```

3. Create a `.env.local` file in the root directory and add the following environment variables:

```sh
'DATABASE_URL=postgres://<username>:<password>@localhost:5432/<database>
JWT_SECRET=<secret>' > .env.local
```

To configure the database, see [Database Setup](#database-setup).

4. Run the app

```sh
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Setup

In order to run the app, you will need to create a PostgreSQL database and add the following tables:

```sql
CREATE TABLE IF NOT EXISTS users (
  id bigserial NOT NULL PRIMARY KEY,
  username varchar(100) NOT NULL UNIQUE,
  hashed_password varchar(100) NOT NULL,
  account_name varchar(100) NOT NULL,
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
```
