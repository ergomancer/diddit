import postgres from "postgres";
import type { Task, User } from "./definitions";
import { auth } from "@/auth";
import { LoginError } from "./error-definitions";
import { redirect } from "next/navigation";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function getTasks() {
  try {
    const session = await auth();
    let userId = null;
    if (session?.user) {
      userId = session.user.id;
    } else if (userId == null) throw new LoginError("You are not logged in!");

    const data = await sql<Task[]>`
      SELECT * FROM tasks
      WHERE userid = ${userId}
      ORDER BY duedate ASC, CASE
      WHEN priority='high' THEN 1
      WHEN priority='medium' THEN 2
      WHEN priority='low' THEN 3
      END ASC, CASE
      WHEN status='ongoing' THEN 1
      WHEN status='pending' THEN 2
      WHEN status='completed' THEN 3
      END ASC
    `;

    return data;
  } catch (error) {
    if (error instanceof LoginError) redirect("/login");
    else {
      console.error("An error occurred: ", error);
      throw new Error("An error occurred. Failed to fetch tasks.");
    }
  }
}

export async function getFive() {
  try {
    const session = await auth();
    let userId = null;
    if (session?.user) {
      userId = session.user.id;
    } else if (userId == null) throw new LoginError("You are not logged in!");

    const data = await sql<Task[]>`
      SELECT * FROM tasks
      WHERE userid = ${userId}
      ORDER BY duedate ASC, CASE
      WHEN priority='high' THEN 1
      WHEN priority='medium' THEN 2
      WHEN priority='low' THEN 3
      END ASC, CASE
      WHEN status='ongoing' THEN 1
      WHEN status='pending' THEN 2
      WHEN status='completed' THEN 3
      END ASC
      LIMIT 5
    `;

    return data;
  } catch (error) {
    if (error instanceof LoginError) redirect("/login");
    else {
      console.error("An error occurred: ", error);
      throw new Error("An error occurred. Failed to fetch tasks.");
    }
  }
}

export async function getCount() {
  try {
    const session = await auth();
    let userId = null;
    if (session?.user) {
      userId = session.user.id;
    } else if (userId == null) throw new LoginError("You are not logged in!");

    const data = await sql`
    SELECT COUNT(id)
    FROM tasks
    WHERE userid = ${userId}
    `;

    return data[0].count;
  } catch (error) {
    if (error instanceof LoginError) redirect("/login");
    else {
      console.error("An error occurred:", error);
      throw new Error("An error occurred. Failed to fetch task count.");
    }
  }
}

export async function getCountByStatus() {
  type Status = "pending" | "ongoing" | "completed";
  const data = {
    pending: undefined as any,
    ongoing: undefined as any,
    completed: undefined as any,
  };
  const status: Status[] = ["pending", "ongoing", "completed"];

  try {
    const session = await auth();
    let userId = null;
    if (session?.user) {
      userId = session.user.id;
    } else if (userId == null) throw new LoginError("You are not logged in!");

    const results = await Promise.all(
      status.map(
        async (option) => sql`
      SELECT COUNT(id)
      FROM tasks
      WHERE userid = ${userId} AND status = ${option}
        `,
      ),
    );

    status.map((option, index) => (data[option] = results[index][0].count));

    return data;
  } catch (error) {
    if (error instanceof LoginError) redirect("/login");
    else {
      console.error("An error occurred:", error);
      throw new Error("An error occurred. Failed to fetch tasks.");
    }
  }
}

export async function getCountByPriority() {
  type Priority = "low" | "medium" | "high";
  const data = {
    low: undefined as any,
    medium: undefined as any,
    high: undefined as any,
  };
  const priority: Priority[] = ["low", "medium", "high"];

  try {
    const session = await auth();
    let userId = null;
    if (session?.user) {
      userId = session.user.id;
    } else if (userId == null) throw new LoginError("You are not logged in!");

    const results = await Promise.all(
      priority.map(
        async (option) => sql`
      SELECT COUNT(id)
      FROM tasks
      WHERE userid = ${userId} AND priority = ${option}
        `,
      ),
    );

    priority.map((option, index) => (data[option] = results[index][0].count));

    return data;
  } catch (error) {
    if (error instanceof LoginError) redirect("/login");
    else {
      console.error("An error occurred:", error);
      throw new Error("An error occurred. Failed to fetch tasks.");
    }
  }
}

export async function getName() {
  try {
    const session = await auth();
    let userId = null;
    if (session?.user) {
      userId = session.user.id;
    } else if (userId == null) throw new LoginError("You are not logged in!");

    const name = await sql`
    SELECT name
    FROM users
    WHERE id = ${userId}
    `;

    return name[0].name;
  } catch (error) {
    if (error instanceof LoginError) redirect("/login");
    else {
      console.error("An error occurred:", error);
      throw new Error("An error occurred. Failed to fetch tasks.");
    }
  }
}

export async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    throw new Error("Failed to fetch user.");
  }
}
