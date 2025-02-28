import cn from "@/lib/cssConditional";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = { link: LinkObj };
export default function DashboardSideItem({ link }: Props) {
  const pathname = usePathname();
  return (
    <Link
      href={link.href}
      className={cn(
        "block duration-300 transition-colors  hover:bg-blue-300 py-2 px-3 rounded-lg",
        { "bg-blue-300": pathname === link.href }
      )}
    >
      {link.label}
    </Link>
  );
}
