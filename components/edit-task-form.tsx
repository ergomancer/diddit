"use client";

import { updateTask } from "@/lib/actions";
import { Task } from "@/lib/definitions";
import FormInput from "./form-input";
import { ArrowRightIcon, MessageCircleWarningIcon } from "lucide-react";
import { Button } from "@/ui/button";
import FormSelect from "./form-select";

export default function EditTaskForm({ task }: { task: Task }) {
  const updateTaskWithId = updateTask.bind(null, task.id);
  return (
    <form action={updateTaskWithId as any}>
      <FormInput
        type="title"
        defaultValue={task ? task.title : undefined}
        error={false}
      />
      <FormInput
        type="description"
        required={false}
        defaultValue={task ? task.description : undefined}
        error={false}
      />
      <FormSelect
        type="priority"
        defaultValue={task ? task.priority : undefined}
      />
      <FormSelect type="status" defaultValue={task ? task.status : undefined} />
      <div>
        <label htmlFor="duedate">Due Date</label>
        <input
          id="duedate"
          type="date"
          name="duedate"
          defaultValue={task ? task.duedate : undefined}
        />
      </div>
      <Button className="mt-4 w-full" type="submit">
        Update Task <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
    </form>
  );
}
