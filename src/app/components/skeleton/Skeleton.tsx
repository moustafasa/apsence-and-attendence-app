import cn from "@/lib/cssConditional";

type Props = { classNames?: string };
export default function Skeleton({ classNames }: Props) {
  return <div className={cn("animate-pulse bg-black-400 ", classNames)}></div>;
}
