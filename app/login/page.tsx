"use client";

import Link from "next/link";
import { Button } from "@/ui/button";
import LoginForm from "@/components/login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
      <div className="w-full lg:w-lg px-6">
        <p className="text-muted-foreground text-sm mb-2 mt-5">
          Don't have an account?
        </p>
        <Link href="/signup">
          <Button variant="secondary">Create an account</Button>
        </Link>
      </div>
    </Suspense>
  );
}
