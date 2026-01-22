"use client";

import { AtSignIcon, KeyRoundIcon, ContactRoundIcon } from "lucide-react";

const iconClassName =
  "pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900";
const icon = {
  name: <ContactRoundIcon className={iconClassName} />,
  email: <AtSignIcon className={iconClassName} />,
  password: <KeyRoundIcon className={iconClassName} />,
};

export default function UserFormInput({
  type,
  minLength = 0,
}: {
  type: "name" | "email" | "password";
  minLength?: number;
}) {
  return (
    <div>
      <label
        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
        htmlFor={type}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </label>
      <div className="relative">
        <input
          className="peer block w-full rounded-md border border-gray-200 py-2.25 pl-10 text-sm outline-2 placeholder:text-gray-500"
          id={type}
          type={type == "name" ? "text" : type}
          name={type}
          placeholder={`Enter your ${type}`}
          required
          minLength={minLength}
        />
        {icon[type]}
      </div>
    </div>
  );
}
