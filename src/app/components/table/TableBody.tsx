import cn from "@/lib/cssConditional";

type Props<T extends Attendence | DbEmployeeUser> = {
  promise: Promise<T[]>;
  tableBody: TableBodyElement<T | T[]>[];
  array?: any[];
};
export default async function TableBody<T extends Attendence | DbEmployeeUser>({
  promise,
  tableBody,
  array,
}: Props<T>) {
  const data = await promise;
  const content = data.map((item, index) => (
    <tr key={item.id} className="odd:bg-black-400">
      {tableBody.map(({ getContent, addonClassName }, i) => (
        <td key={i + item.id} className={cn("px-3 py-5", addonClassName)}>
          {getContent(item, index)}
        </td>
      ))}
    </tr>
  ));

  const test =
    array &&
    array.map((item, index) => (
      <tr key={index}>
        {tableBody.map(({ getContent }, i) => (
          <td key={i + index}>{getContent(data, index)}</td>
        ))}
      </tr>
    ));
  return content;
}
