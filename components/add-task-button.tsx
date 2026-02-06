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
          <Button
            variant="outline"
            className="fixed bottom-10 lg:bottom-15 2xl:bottom-20 right-2 lg:right-5 2xl:right-8 rounded-full size-12.5 lg:size-15 2xl:size-17.5 bg-rose-500/50 dark:bg-rose-500/50 backdrop-blur-sm"
          >
            <PlusIcon className="size-7.5 lg:size-10 2xl:size-12.5 stroke-2" />
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
