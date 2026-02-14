import { Button } from "@/ui/button";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogClose,
} from "@/ui/dialog";
import AddTaskForm from "@/components/add-task-form";
import { auth } from "@/auth";

export default async function AddTaskButton() {
  const session = await auth();
  return (
    session && (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" asChild size="icon">
            <PlusIcon className="size-8 lg:size-10 2xl:size-12 stroke-2" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <AddTaskForm />
        </DialogContent>
      </Dialog>
    )
  );
}
