"use client";

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
            <div className="flex gap-1 justify-start">
              <Badge className="rounded-full">{task.priority}</Badge>
              <Badge className="rounded-full">{task.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <span>{task.description}</span>
              {!task.duedate ? null : (
                <span className="flex gap-1">
                  <TimerIcon />
                  {new Date(task.duedate).toLocaleDateString()}
                </span>
              )}
            </CardDescription>
          </CardContent>
          <CardFooter className="border-t text-muted-foreground text-xs flex flex-col items-start">
            <span>{`Created at: ${new Date(task.createddate).toLocaleDateString()}\t${new Date(task.createddate).toLocaleTimeString()}`}</span>
            <span>{`Updated at: ${new Date(task.updateddate).toLocaleDateString()}\t${new Date(task.updateddate).toLocaleTimeString()}`}</span>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <span className="flex gap-1 justify-start">
            <Badge className="rounded-full">{task.priority}</Badge>
            <Badge className="rounded-full">{task.status}</Badge>
          </span>
          <span>{task.description}</span>
          {!task.duedate ? null : (
            <span className="flex gap-1">
              <TimerIcon />
              {new Date(task.duedate).toLocaleDateString()}
            </span>
          )}
        </DialogDescription>
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
