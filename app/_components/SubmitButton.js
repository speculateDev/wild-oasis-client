"use client";

import { useFormStatus } from "react-dom";

function SubmitButton({ children, pendingLabel, className }) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className={`bg-accent-500 py-4 px-8 text-primary-800 font-semibold hover:bg-accent-600  transition-all disabled:cursor-not-allowed disabled:bg-gray-500  disabled:text-gray-300 ${
        className ? className : ""
      }`}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

export default SubmitButton;
