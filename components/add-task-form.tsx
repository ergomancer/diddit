"use client";

import { createTask } from "@/lib/actions";
import { TaskFormState } from "@/lib/definitions";
import { useActionState } from "react";
import FormInput from "./form-input";
import { ArrowRightIcon, MessageCircleWarningIcon } from "lucide-react";
import { Button } from "@/ui/button";
import FormSelect from "./form-select";

export default function AddTaskForm() {
  const initialState: TaskFormState = {
    message: null,
    errors: {},
  };
  const [state, formAction, isPending] = useActionState(
    createTask,
    initialState,
  );

  return (
    <form action={formAction}>
      <FormInput type="title" state={state} />
      <FormInput type="description" required={false} state={state} />
      <FormSelect type="priority" state={state} />
      <FormSelect type="status" state={state} />
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
          className="rounded-md border text-sm outline-2 py-2.25 px-2 block w-1/3"
        />
        <div id={`duedate-error`} aria-live="polite" aria-atomic="true">
          {state.errors?.duedate &&
            state.errors.duedate.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div
        className="flex h-8 items-end space-x-1"
        id="form-error"
        aria-live="polite"
        aria-atomic="true"
      >
        {state.errors && (
          <>
            <MessageCircleWarningIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{state.message}</p>
          </>
        )}
      </div>
      <Button className="mt-4 w-full" aria-disabled={isPending}>
        Add Task{" "}
        <ArrowRightIcon className="ml-auto h-5 w-5 text-muted-foreground" />
      </Button>
    </form>
  );
}
