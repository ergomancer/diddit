"use client";

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
    status: ["pending", "ongoing", "completed"],
    priority: ["low", "medium", "high"],
  };

  let showError = false;
  if (state && state.errors && state.errors[type]) showError = true;

  return (
    <fieldset>
      <legend className="mb-3 mt-5 block text-xs font-medium text-gray-900">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </legend>
      {options[type].map((option) => (
        <div key={option}>
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
          <label htmlFor={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
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
