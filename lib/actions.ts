"use server";

import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { auth } from "@/auth";
import { TaskFormSchema, UserFormSchema } from "./form-schemas";
import type { TaskFormState, UserFormState } from "./definitions";
import { LoginError } from "./error-definitions";
import bcrypt from "bcrypt";

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log("Authenticating");
    await signIn("credentials", formData);
    console.log("Authenticated");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function createTask(prevState: TaskFormState, formData: FormData) {
  const validatedFields = TaskFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    dueDate: formData.get("dueDate"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to create task.",
    };
  }

  const { title, description, status, dueDate } = validatedFields.data;

  const createdDate = new Date().toISOString();
  const updatedDate = createdDate;

  try {
    const session = await auth();
    let userId = null;
    if (session?.user) userId = session.user.id;
    if (userId == null) throw new LoginError("You are not logged in!");

    await sql`
    INSERT INTO tasks (userId, title, description, status, createdDate, updatedDate, dueDate)
    VALUES (${userId}, ${title}, ${description}, ${status}, ${createdDate}, ${updatedDate}, ${dueDate})
    `;
  } catch (error) {
    console.log(error);
    if (error instanceof LoginError) redirect("/login");
    return {
      message: "Error: Failed to create task",
    };
  }

  revalidatePath("/");
  redirect("/");
}

export async function updateTask(
  prevState: TaskFormState,
  id: string,
  formData: FormData,
) {
  const validatedFields = TaskFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    dueDate: formData.get("dueDate"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to update task.",
    };
  }

  const { title, description, status, dueDate } = validatedFields.data;

  const updatedDate = new Date().toISOString();

  try {
    await sql`
    UPDATE tasks
    SET title = ${title}, description=${description}, status=${status}, dueDate=${dueDate}, updatedDate=${updatedDate}
    WHERE id=${id}
    `;
  } catch (error) {
    console.log(error);
    return {
      message: "Error: Failed to update task.",
    };
  }
  revalidatePath("/");
  redirect("/");
}

export async function deleteTask(id: string) {
  await sql`
  DELETE FROM tasks
  WHERE id=${id}
  `;
  revalidatePath("/");
}

export async function createUser(prevState: UserFormState, formData: FormData) {
  const validatedFields = UserFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to create tasks.",
    };
  }

  const { name, email, password } = validatedFields.data;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    await sql`
    INSERT INTO users (name, email, password)
    VALUES (${name}, ${email}, ${encryptedPassword})
    `;
  } catch (error) {
    console.log(error);
    return {
      message: "Error: Couldn't sign you up!",
    };
  }

  redirect("/");
}
