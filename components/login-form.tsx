"use client";

import {
  MessageCircleWarningIcon,
  AtSignIcon,
  KeyRoundIcon,
  LogInIcon,
} from "lucide-react";
import FormInput from "@/components/form-input";
import { Button } from "@/ui/button";
import { useActionState } from "react";
import { authenticate } from "@/lib/actions";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/app";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  return (
    <form action={formAction} className="space-y-3">
      <div className="rounded-lg px-6 pb-4 pt-8 w-full lg:w-lg">
        <h1 className="mb-3 text-2xl">Please log in to continue.</h1>
        <FormInput
          type="email"
          icon={
            <AtSignIcon className="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2" />
          }
          error={false}
        />
        <FormInput
          type="password"
          icon={
            <KeyRoundIcon className="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2" />
          }
          minLength={6}
          error={false}
        />
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <MessageCircleWarningIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
        <Button variant="outline" className="mt-4" aria-disabled={isPending}>
          Log in <LogInIcon className="ml-auto h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}
