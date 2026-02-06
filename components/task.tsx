import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Badge } from "@/ui/badge";
import { TimerIcon, Trash2Icon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/ui/dialog";
import { Button } from "@/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/ui/alert-dialog";
import type { Task } from "@/lib/definitions";
import { deleteTask } from "@/lib/actions";

export default function Task({ task }: { task: Task }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card>
          <CardHeader className="border-b">
            <CardTitle>{task.title}</CardTitle>
            <CardDescription>
              <div className="flex gap-1 justify-start">
                <Badge className="rounded-full">{task.priority}</Badge>
                <Badge className="rounded-full">{task.status}</Badge>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {task.description}
            {!task.dueDate ? null : (
              <div className="flex gap-1">
                <TimerIcon />
                {new Date(task.dueDate).toLocaleDateString()}
                {new Date(task.dueDate).toLocaleTimeString()}
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t text-muted-foreground text-xs flex flex-col items-start">
            <p>{`Created at: ${new Date(
              task.createdDate as string,
            ).toLocaleDateString()}\t${new Date(
              task.createdDate as string,
            ).toLocaleTimeString()}`}</p>
            <p>{`Updated at: ${new Date(
              task.updatedDate as string,
            ).toLocaleDateString()}\t${new Date(
              task.updatedDate as string,
            ).toLocaleTimeString()}`}</p>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex gap-1 justify-start">
          <Badge className="rounded-full">{task.priority}</Badge>
          <Badge className="rounded-full">{task.status}</Badge>
        </div>
        <p>{task.description}</p>
        {!task.dueDate ? null : (
          <div className="flex gap-1">
            <TimerIcon />
            {new Date(task.dueDate).toLocaleDateString()}
            {new Date(task.dueDate).toLocaleTimeString()}
          </div>
        )}
        <DialogFooter>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size={"icon"} className="text-red-500">
                <Trash2Icon className="size-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this task and permanently remove its data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500/75"
                  onClick={() => deleteTask(task.id as string)}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
