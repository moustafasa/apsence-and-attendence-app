import cn from "@/lib/cssConditional";
import { ClassValue } from "clsx";

type Props<T extends Attendence | DbEmployeeUser> = {
  promise: Promise<T[]>;
  tableBodyData: TableBodyElement<T>[];
  addOnClassNames?: (
    item: DbEmployeeUser["id"] | Attendence["id"]
  ) => ClassValue;
};

export default async function TableBody<T extends Attendence | DbEmployeeUser>({
  promise,
  tableBodyData,
  addOnClassNames = () => "",
}: Props<T>) {
  const data = await promise;
  const content = data.map((item, index) => (
    <tr
      key={item.id}
      className={cn("odd:bg-black-400", addOnClassNames(item.id))}
    >
      {tableBodyData.map(({ getContent, th }, i) =>
        !th ? (
          <td key={i.toString() + item.id} className={cn("px-3 py-5")}>
            {getContent(item, index)}
          </td>
        ) : (
          <th key={i.toString() + item.id} className={cn("px-3 py-5")}>
            {getContent(item, index)}
          </th>
        )
      )}
    </tr>
  ));

  return content;
}
