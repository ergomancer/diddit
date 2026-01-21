import Task from "@/components/task";
import { getTasks } from "@/lib/data";

export default async function Home() {
  const tasks = await getTasks();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 p-5 lg:p-7.5 2xl:p-10 gap-5 lg:gap-7.5 2xl:gap-10">
      {tasks.map((task) => {
        return <Task task={task} key={task.id} />;
      })}
    </div>
  );
}
