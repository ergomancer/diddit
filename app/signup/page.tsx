"use client";

import { Button } from "@/ui/button";
import Link from "next/link";
import SignupForm from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div>
      <div>
        <SignupForm />
        <p className="text-muted-foreground">Already have an account?</p>
        <Link href="/login">
          <Button>Log in</Button>
        </Link>
      </div>
    </div>
  );
}
