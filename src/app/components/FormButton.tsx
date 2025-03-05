"use client";

import cn from "@/lib/cssConditional";
import { useFormStatus } from "react-dom";

type Props = { label: string; notFull?: boolean };
export default function FormButton({ label, notFull }: Props) {
  const status = useFormStatus();
  return (
    <button
      className={cn(
        "capitalize bg-blue-300 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors duration-300 relative",
        { "w-full": !notFull }
      )}
    >
      {status.pending && (
        <div className="flex gap-2 items-center justify-center button-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      <span className={cn({ invisible: status.pending })}>{label}</span>
    </button>
  );
}
