export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Task = {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: "pending" | "ongoing" | "completed";
  priority: "low" | "medium" | "high";
  createdDate: string;
  updatedDate: string;
  dueDate: string;
};

export type TaskFormState = {
  errors?: {
    title?: string[];
    description?: string[];
    status?: string[];
    priority?: string[];
    dueDate?: string[];
  };
  message?: string | null;
};

export type UserFormState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};
