"use client";

import { MessageCircleWarningIcon, ArrowRightIcon } from "lucide-react";
import UserFormInput from "./user-form-input";
import { Button } from "@/ui/button";
import { useActionState } from "react";
import { createUser } from "@/lib/actions";
import { UserFormState } from "@/lib/definitions";

export default function SignupForm() {
  const initialState: UserFormState = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(
    createUser,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">Create an account</h1>
        <div className="w-full">
          <UserFormInput type="name" />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <UserFormInput type="email" />
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <UserFormInput type="password" minLength={6} />
          <div id="password-error" aria-live="polite" aria-atomic="true">
            {state.errors?.password &&
              state.errors.password.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
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
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          Sign Up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
      </div>
    </form>
  );
}
