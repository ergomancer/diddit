import { z } from "zod";

export const TaskFormSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  status: z.enum(["pending", "ongoing", "completed"]).default("pending"),
  dueDate: z.string(),
});

export const UserFormSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().nonempty().min(6),
});
