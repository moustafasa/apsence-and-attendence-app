import cn from "@/lib/cssConditional";

type Props<T extends Attendence | DbEmployeeUser> = {
  promise: Promise<T[]>;
  tableBody: TableBodyElement<T>[];
};
export default async function TableBody<T extends Attendence | DbEmployeeUser>({
  promise,
  tableBody,
}: Props<T>) {
  const data = await promise;
  return data.map((item, index) => (
    <tr key={item.id} className="odd:bg-black-400">
      {tableBody.map(({ getContent, addonClassName }, i) => (
        <td key={i + item.id} className={cn("px-3 py-5", addonClassName)}>
          {getContent(item, index)}
        </td>
      ))}
    </tr>
  ));
}
