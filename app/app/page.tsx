import {
  getCount,
  getCountByPriority,
  getCountByStatus,
  getName,
  getFive,
} from "@/lib/data";
import { Suspense } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/ui/card";
import { Badge } from "@/ui/badge";
import TasksOverview from "@/components/tasks-overview";
import Link from "next/link";
import { Button } from "@/ui/button";
import Task from "@/components/task";
import AddTaskButton from "@/components/add-task-button";

export default async function Dashboard() {
  const name = await getName();
  const total = await getCount();
  const statusList = await getCountByStatus();
  const priorityList = await getCountByPriority();
  const urgent = await getFive();

  const priorityColors = {
    low: "bg-green-500",
    medium: "bg-yellow-500",
    high: "bg-red-500",
  };
  const statusColors = {
    pending: "bg-blue-500",
    ongoing: "bg-orange-500",
    completed: "bg-gray-500",
  };

  return (
    <Suspense>
      <div className="flex flex-col justify-evenly gap-5 p-5">
        <Card className="bg-transparent">
          <CardHeader>
            <CardTitle>
              <h2 className="text-2xl">{`Hello ${name.split(" ")}!`}</h2>
            </CardTitle>
            <CardDescription>
              <span className="mr-3 text-lg">{`Total Tasks`}</span>
              <Badge variant="outline" className="text-xl font-bold">
                {total}
              </Badge>
            </CardDescription>
            <CardAction>
              <AddTaskButton />
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-20 place-items-center mt-2">
              <TasksOverview
                data={statusList}
                type="status"
                colors={statusColors}
              />
              <TasksOverview
                data={priorityList}
                type={"priority"}
                colors={priorityColors}
              />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-transparent">
          <CardHeader>
            <CardTitle>
              <h2 className="text-lg">Urgent Tasks</h2>
            </CardTitle>
            <CardDescription>
              Your 5 most important tasks.
            </CardDescription>
            <CardAction>
              <Link href="/tasks">
                <Button variant="outline">View All</Button>
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-7.5 p-2">
            {urgent.map((task) => (
              <Task task={task} key={task.id} />
            ))}
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
}
