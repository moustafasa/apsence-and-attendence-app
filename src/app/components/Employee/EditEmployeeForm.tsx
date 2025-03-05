"use client";

import { editEmployeeAction } from "@/lib/actions/employeesActions";
import cn from "@/lib/cssConditional";
import { useFormState } from "react-dom";
import { FaExclamation } from "react-icons/fa";
import FormButton from "../FormButton";

type Props = {
  employee: Omit<IUser, "role" | "password">;
};

export default function EditEmployeeForm({ employee }: Props) {
  const [error, formAction] = useFormState(
    editEmployeeAction.bind(null, employee._id),
    undefined
  );
  return (
    <form
      className="mt-10 flex flex-col max-w-[700px] mx-auto"
      action={formAction}
      noValidate
    >
      <p
        className={cn(
          `capitalize  p-3 mb-3 rounded-lg bg-red-600 flex items-center gap-3 invisible min-h-14 `,
          { visible: !!error }
        )}
      >
        <FaExclamation className="inline" /> {error}
      </p>
      <h2 className=" text-center capitalize text-3xl mb-6 font-bold p-3">
        edit {employee.name} employee data
      </h2>

      <div className="flex gap-3 items-center mb-10">
        <label htmlFor="hourly-rate" className="capitalize text-xl w-[150px]">
          hourly rate
        </label>
        <input
          className="flex-1 bg-black-200 outline-none shadow-lg focus:ring-2 rounded-lg capitalize px-3 py-2 "
          type="number"
          name="hourlyRate"
          defaultValue={employee.hourlyRate}
          id="hourly-rate"
        />
      </div>
      <FormButton label="save" />
    </form>
  );
}
