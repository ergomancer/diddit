"use client";

import Link from "next/link";
import { Button } from "@/ui/button";
import LoginForm from "@/components/login-form";

export default function LoginPage() {
  return (
    <div>
      <LoginForm />
      <p className="text-muted-foreground">Don't have an account?</p>
      <Link href="/signup">
        <Button>Create an account</Button>
      </Link>
    </div>
  );
}
