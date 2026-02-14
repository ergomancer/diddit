"use client";

import { Moon, SunMediumIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="p-3">
          <SunMediumIcon className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 stroke-2 size-4 lg:size-6 2xl:size-8 text-yellow-500" />
          <Moon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 stroke-2 size-4 lg:size-6 2xl:size-8" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
