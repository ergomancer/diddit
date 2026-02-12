"use client";

import Link from "next/link";
import { Button } from "@/ui/button";
import LoginForm from "@/components/login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
      <p className="text-muted-foreground">Don't have an account?</p>
      <Link href="/signup">
        <Button>Create an account</Button>
      </Link>
    </Suspense>
  );
}
