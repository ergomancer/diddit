"use client";

import { Button } from "@/ui/button";
import Link from "next/link";
import SignupForm from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div>
      <SignupForm />
      <div className="w-full lg:w-lg px-6">
        <p className="text-muted-foreground text-sm mb-2 mt-5">
          Already have an account?
        </p>
        <Link href="/login">
          <Button variant="secondary">Log in</Button>
        </Link>
      </div>
    </div>
  );
}
