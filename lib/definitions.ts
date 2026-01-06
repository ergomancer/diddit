export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Task = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: "pending" | "ongoing" | "completed";
  createdDate: string;
  updatedDate: string;
  dueDate: string;
};
