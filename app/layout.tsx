import { Metadata } from "next";
import "@/ui/global.css";
import { geistSans, geistMono } from "@/ui/fonts";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/ui/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
