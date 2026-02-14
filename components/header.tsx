import Link from "next/link";
import Diddit from "./diddit";
import { ModeToggle } from "@/ui/mode-toggle";
import SignOut from "./sign-out";
import AddTaskButton from "./add-task-button";

export default function Header() {
  return (
    <header className="px-2 md:px-3 lg:px-4 xl:px-4.5 2xl:px-5 py-2 lg:py-1.75 2xl:py-1.5 border-b backdrop-blur-xs flex w-full items-center gap-2 lg:gap-3 2xl:gap-4 sticky top-0 backdrop-opacity-100">
      <Link href={"/app"} className="flex-1">
        <Diddit />
      </Link>
      <AddTaskButton />
      <ModeToggle />
      <SignOut />
    </header>
  );
}
