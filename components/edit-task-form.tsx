"use client";

import { updateTask } from "@/lib/actions";
import { Task } from "@/lib/definitions";
import FormInput from "./form-input";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/ui/button";
import FormSelect from "./form-select";

export default function EditTaskForm({ task }: { task: Task }) {
  const updateTaskWithId = updateTask.bind(null, task.id);
  return (
    <form action={updateTaskWithId as any}>
      <FormInput type="title" defaultValue={task.title} error={false} />
      <FormInput
        type="description"
        required={false}
        defaultValue={task.description}
        error={false}
      />
      <FormSelect type="priority" defaultValue={task.priority} />
      <FormSelect type="status" defaultValue={task.status} />
      <div>
        <label
          htmlFor="duedate"
          className="mb-3 mt-5 font-medium text-xs block"
        >
          Due Date
        </label>
        <input
          id="duedate"
          type="date"
          name="duedate"
          defaultValue={new Date(task.duedate).toISOString().split("T")[0]}
          className="rounded-md border text-sm outline-2 py-2.25 px-2 block w-1/3"
        />{" "}
      </div>
      <Button className="mt-4 w-full" type="submit">
        Update Task{" "}
        <ArrowRightIcon className="ml-auto h-5 w-5 text-muted-foreground" />
      </Button>
    </form>
  );
}
