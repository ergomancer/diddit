import bcrypt from "bcrypt";
import postgres from "postgres";
import { users, tasks } from "../../lib/placeholder-data";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
  CREATE TABLE IF NOT EXISTS users(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
      INSERT INTO users (id, name, email, password)
      VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
      ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedTasks() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`CREATE TABLE IF NOT EXISTS tasks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    userId UUID NOT NULL,
    userId UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(255),
    createdDate TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedDate TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    dueDate TIMESTAMPTZ
  );
  `;

  const insertedTasks = await Promise.all(
    tasks.map(
      async (task) => sql`
      INSERT INTO tasks (userId, title, description, status)
      VALUES (${task.userId}, ${task.title}, ${task.description}, ${task.status})
      ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedTasks;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [seedUsers(), seedTasks()]);

    return Response.json({ result, message: "Database seeded successfully " });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
