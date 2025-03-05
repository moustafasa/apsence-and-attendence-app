"use client";
import { signinAction } from "@/lib/actions/authActions";
import { useFormState } from "react-dom";
import ErrorMessage from "../components/ErrorMessage";
import FormButton from "../components/FormButton";

export default function Page() {
  const [error, formAction] = useFormState(signinAction, undefined);

  return (
    <div className="container mt-28">
      <form
        action={formAction}
        className="max-w-[700px] w-full mx-auto bg-black-200 p-10 rounded-lg shadow-lg flex flex-col"
      >
        {error && <ErrorMessage error={error} />}
        <h2 className="text-center text-4xl capitalize mb-6">log in</h2>
        <div className="flex flex-col gap-4 mb-8">
          <input
            type="text"
            className="p-3 rounded-lg bg-black-400 placeholder:capitalize  horder-none outline-none focus:ring-1 focus:ring-blue-300  transition-shadow duration-300"
            placeholder="write your username"
            name="username"
          />
          <input
            type="password"
            className="p-3 rounded-lg bg-black-400 placeholder:capitalize  horder-none outline-none focus:ring-1 focus:ring-blue-300  transition-shadow duration-300"
            placeholder="write your password"
            name="password"
          />
        </div>
        <FormButton label="login" />
      </form>
    </div>
  );
}
