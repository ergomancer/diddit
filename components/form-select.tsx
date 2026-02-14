"use client";

import { Badge } from "@/ui/badge";

export default function FormSelect({
  type,
  state,
  defaultValue,
}: {
  type: "priority" | "status";
  state?: any;
  defaultValue?: string;
}) {
  const options = {
    status: [
      ["pending", "bg-blue-500"],
      ["ongoing", "bg-orange-500"],
      ["completed", "bg-gray-500"],
    ],
    priority: [
      ["low", "bg-green-500"],
      ["medium", "bg-yellow-500"],
      ["high", "bg-red-500"],
    ],
  };

  let showError = false;
  if (state && state.errors && state.errors[type]) showError = true;

  return (
    <fieldset className="border mt-5 mb-3 p-2">
      <legend className="mb-3 mt-5 block text-xs font-medium">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </legend>
      {options[type].map(([option, color]) => (
        <div key={option} className="p-1 flex justify-start items-center gap-2">
          <input
            type="radio"
            id={option}
            name={type}
            defaultChecked={
              defaultValue
                ? option == defaultValue
                  ? true
                  : false
                : option == "low" || option == "pending"
                  ? true
                  : false
            }
            value={option}
          />
          <label htmlFor={option} className="font-medium text-xs">
            <Badge className={`rounded-full ${color}`}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </Badge>
          </label>
        </div>
      ))}
      <div id={`${type}-error`} aria-live="polite" aria-atomic="true">
        {showError &&
          state.errors[type].map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </fieldset>
  );
}
