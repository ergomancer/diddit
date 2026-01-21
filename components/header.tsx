import Link from "next/link";
import Diddit from "./diddit";
import { ModeToggle } from "@/ui/mode-toggle";

export default function Header() {
  return (
    <header className="px-2 md:px-3 lg:px-4 xl:px-4.5 py-2 md:py-1.5 lg:py-1 xl:py-0.5 border-b backdrop-blur-xs">
      <Link href={"/"}>
        <Diddit />
      </Link>
        <ModeToggle />
    </header>
  );
}
