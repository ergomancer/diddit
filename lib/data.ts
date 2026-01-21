import postgres from "postgres";
import type { Task } from "./definitions";
import { auth } from "@/auth";
import { LoginError } from "./error-definitions";
import { redirect } from "next/navigation";
import type { User } from "@/lib/definitions";

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
    WHERE userId = ${userId}
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

export async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    throw new Error("Failed to fetch user.");
  }
}
