"use client";

import {
  MessageCircleWarningIcon,
  ArrowRightIcon,
  ContactRoundIcon,
  AtSignIcon,
  KeyRoundIcon,
} from "lucide-react";
import FormInput from "./form-input";
import { Button } from "@/ui/button";
import { useActionState } from "react";
import { createUser } from "@/lib/actions";
import { UserFormState } from "@/lib/definitions";

export default function SignupForm() {
  const initialState: UserFormState = {};
  const [state, formAction, isPending] = useActionState(
    createUser,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="rounded-lg px-6 pb-4 pt-8 w-full lg:w-lg">
        <h1 className="mb-3 text-2xl">Create an account</h1>
        <FormInput
          type="name"
          icon={
            <ContactRoundIcon className="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2" />
          }
          state={state}
        />
        <FormInput
          type="email"
          icon={
            <AtSignIcon className="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2" />
          }
          state={state}
        />
        <FormInput
          type="password"
          icon={
            <KeyRoundIcon className="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2" />
          }
          minLength={6}
          state={state}
        />
        <div
          className="flex h-8 items-end space-x-1"
          id="form-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.errors && (
            <>
              <MessageCircleWarningIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{state.message}</p>
            </>
          )}
        </div>
        <Button variant="outline" className="mt-4" aria-disabled={isPending}>
          Sign Up <ArrowRightIcon className="ml-auto h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}
