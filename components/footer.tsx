import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  MailIcon,
  PhoneIcon,
} from "lucide-react";

const entries = [
  { icon: <GithubIcon />, link: "https://github.com/ergomancer/diddit" },
  { icon: <LinkedinIcon />, link: "https://linkedin.com/in/ergomancer" },
  { icon: <TwitterIcon />, link: "https://x.com/ergomancer" },
  { icon: <MailIcon />, link: "mailto:akashkhetan044@gmail.com" },
  { icon: <PhoneIcon />, link: "tel:+917003686821 " },
];

export default function Footer() {
  return (
    <footer className="px-2 md:px-3 lg:px-4 xl:px-4.5 2xl:px-5 py-2 lg:py-1.75 2xl:py-1.5 border-t backdrop-blur-xs flex w-full items-center gap-2 lg:gap-3 2xl:gap-4 justify-evenly text-muted-foreground fixed bottom-0 backdrop-opacity-100 text-xs">
      <span>Made by @ergomancer</span>
      {entries.map((entry, index) => {
        return (
          <a
            href={entry.link}
            rel="noopener noreferrer"
            target="_blank"
            key={index}
          >
            {entry.icon}
          </a>
        );
      })}
    </footer>
  );
}
