# Organize Now

Organize Now is a user-friendly to-do list application built with Next.js, designed to help you manage your tasks efficiently and stay on top of your schedule.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Getting Started](#getting-started):
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## About

Organize Now is a simple to-do application that helps you stay organized and manage your tasks effectively. It allows you to:

**Key features**:

- **Effortless task management**: Create, edit, and delete tasks with ease using a clear and intuitive interface. ✅
- **Prioritize and organize**: Set deadlines and priorities for your tasks, and categorize them for better clarity and focus. 📅
- **Track your progress**: Mark completed tasks as done to gain a sense of accomplishment and visualize your progress. 📈
- **Modern and performant**: Built with Next.js, Organize Now offers a smooth and responsive user experience. 🚀

## Features

- **📑 Add, edit, and delete tasks**: Easily manage your tasks with a user-friendly interface.
- **✅ Mark tasks as complete**: Keep track of your progress by marking completed tasks.
- **📅 Set priorities and deadlines**: Prioritize your tasks and set deadlines to stay on top of your schedule.
- **🗂 Categorize tasks**: Organize your tasks into different categories for better clarity.
- **👤 User authentication**: Secure your tasks and data with user authentication and authorization.
- **🖼 Profile customization**: Personalize your profile with a custom profile image and account name.
- **🚀 Built with Next.js**: Leverage the benefits of Next.js for a performant and scalable application.

## Getting Started

### Prerequisites

Node.js and npm installed on your system.

### Installation

- **Clone the repository:**

```sh
  git clone https://github.com/quibylix/todo-app
```

- **Install dependencies:**

```sh
pnpm install
```

- **Create a .env.local file:**
  Create a .env.local file in the root directory and add the following environment variables, replacing the placeholders with your own values:

```
DATABASE_URL=postgres://<username>:<password>@localhost:5432/<database>
JWT_SECRET=<secret>
IMAGEBB_API_KEY=<api_key>
```

> [!NOTE]
> Refer to the [Database Setup](#database-setup) section for more information on configuring the database.

- **Run the development server:**

```sh
pnpm dev
```

- **Open the app in your browser:**
  Visit http://localhost:3000 in your browser to see the application running.

### Database Setup

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

## Screenshots

[![Home Page](https://i.postimg.cc/xCFJ6SCy/organize-now-vercel-app.png)](https://postimg.cc/DJLwzH18)
[![Task Page](https://i.postimg.cc/1XQ4z0v2/organize-now-vercel-app.png)](https://postimg.cc/tZB9S6QN)
[![Profile Page](https://i.postimg.cc/YSLSfDVT/organize-now-vercel-app.png)](https://postimg.cc/JymmRxRQ)

## Contributing

I welcome contributions! If you have any bug fixes, improvements, or new features, feel free to create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
