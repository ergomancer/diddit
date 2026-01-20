import { NotebookTabsIcon } from "lucide-react";
import TextType from "@/ui/text-type";

export default function Diddit() {
  return (
    <div className="flex items-center">
      <NotebookTabsIcon className="size-9 md:size-12 lg:size-14 xl:size-15 2xl:size-15.5" />
      <TextType
        text={["diddit", ""]}
        as="h1"
        typingSpeed={200}
        deletingSpeed={100}
        pauseDuration={1000}
        loop={false}
        startOnVisible={true}
        showCursor={false}
        className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl"
      />
    </div>
  );
}
