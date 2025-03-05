"use client";

import { addEmployeeAction } from "@/lib/actions/employeesActions";
import { useFormState } from "react-dom";
import ErrorMessage from "../ErrorMessage";
import FormButton from "../FormButton";

export default function AddEmployeeFormData() {
  const [error, formAction] = useFormState(addEmployeeAction, undefined);
  return (
    <form
      className="mt-10 flex flex-col max-w-[700px] mx-auto"
      action={formAction}
      noValidate
    >
      <ErrorMessage error={error} />
      <h2 className=" text-center capitalize text-3xl mb-6 font-bold p-3">
        add new employee
      </h2>

      <div className="flex gap-3 items-center mb-5">
        <label htmlFor="name" className="capitalize text-xl w-[150px]">
          name
        </label>
        <input
          className="flex-1 bg-black-200 outline-none shadow-lg focus:ring-2 rounded-lg capitalize px-3 py-2 "
          type="text"
          name="name"
          id="name"
        />
      </div>
      <div className="flex gap-3 items-center mb-5">
        <label htmlFor="username" className="capitalize text-xl w-[150px]">
          username
        </label>
        <input
          className="flex-1 bg-black-200 outline-none shadow-lg focus:ring-2 rounded-lg capitalize px-3 py-2 "
          type="text"
          name="username"
          id="username"
        />
      </div>
      <div className="flex gap-3 items-center mb-5">
        <label htmlFor="password" className="capitalize text-xl w-[150px]">
          password
        </label>
        <input
          className="flex-1 bg-black-200 outline-none shadow-lg focus:ring-2 rounded-lg capitalize px-3 py-2 "
          type="password"
          name="password"
          id="password"
        />
      </div>
      <div className="flex gap-3 items-center mb-10">
        <label htmlFor="hourly-rate" className="capitalize text-xl w-[150px]">
          hourly rate
        </label>
        <input
          className="flex-1 bg-black-200 outline-none shadow-lg focus:ring-2 rounded-lg capitalize px-3 py-2 "
          type="number"
          name="hourlyRate"
          id="hourly-rate"
        />
      </div>
      <FormButton label="add" />
    </form>
  );
}
