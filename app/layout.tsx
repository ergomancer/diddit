import { Metadata } from "next";
import "@/ui/global.css";
import { geistSans, geistMono } from "@/ui/fonts";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Diddit",
  description:
    "A full-stack task-management app built using Next.js and PostgreSQL.",
  keywords: [
    "task",
    "management",
    "manager",
    "next",
    "postgresql",
    "productivity",
    "developer",
    "node",
    "web",
    "app",
    "nextjs",
    "next.js",
    "full-stack",
    "fullstack",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
