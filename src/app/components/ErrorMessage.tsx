import cn from "@/lib/cssConditional";
import { FaExclamation } from "react-icons/fa";

type Props = { error?: string };
export default function ErrorMessage({ error }: Props) {
  return (
    <p
      className={cn(
        `capitalize  p-3 mb-3 rounded-lg bg-red-600 flex items-center gap-3 invisible min-h-14 `,
        { visible: !!error }
      )}
    >
      <FaExclamation className="inline" /> {error}
    </p>
  );
}
