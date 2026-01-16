import postgres from "postgres";
import type { Task } from "./definitions";
import { auth } from "@/auth";
import { LoginError } from "./error-definitions";
import { redirect } from "next/navigation";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function getTasks() {
  try {
    const session = await auth();
    let userId = null;
    if (session?.user) userId = session.user.id;
    if (userId == null) throw new LoginError("You are not logged in!");

    const data = await sql<Task[]>`
    SELECT * FROM tasks
    WHERE userId = ${userId}
    `;

    return data
  } catch (error) {
    console.log(error);
    if(error instanceof LoginError) redirect("/login");
    return {
      message: "Error: Failed to fetch tasks."
    }
  }
}