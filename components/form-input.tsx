"use client";

export default function FormInput({
  type,
  icon = null,
  required = true,
  minLength = 0,
  error = true,
  state,
}: {
  type: "name" | "email" | "password" | "title" | "description";
  icon?: React.ReactNode;
  required?: boolean;
  minLength?: number;
  error?: boolean;
  state?: any;
}) {
  let showError = false;
  if (error && state.errors && state.errors[type]) showError = true;

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
          required={required}
          minLength={minLength}
        />
        {icon}
      </div>
      <div id={`${type}-error`} aria-live="polite" aria-atomic="true">
        {showError &&
          state.errors[type].map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>
  );
}
