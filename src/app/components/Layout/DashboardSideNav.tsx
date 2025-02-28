import DashboardSideItem from "./DashboardSideItem";

type Props = { links: LinkObj[] };
export default function DashboardSideNav({ links }: Props) {
  return (
    <div className="capitalize p-3">
      <h2 className="my-3 text-xl ">pages</h2>
      <nav className=" space-y-3">
        {links.map((link) => (
          <DashboardSideItem key={link.href} link={link} />
        ))}
      </nav>
    </div>
  );
}
