import cn from "@/lib/cssConditional";
import { ClassValue } from "clsx";

type Props<T extends IDayAttendence | Omit<IUser, "password">> = {
  promise: Promise<T[]>;
  tableBodyData: TableBodyElement<T>[];
  addOnClassNames?: (
    item: IUser["_id"] | IDayAttendence["dayIndex"]
  ) => ClassValue;
};

export default async function TableBody<
  T extends IDayAttendence | Omit<IUser, "password">
>({ promise, tableBodyData, addOnClassNames = () => "" }: Props<T>) {
  const data = await promise;

  const content = data.map((item, index) => (
    <tr
      key={item._id}
      className={cn(
        "odd:bg-black-400",
        addOnClassNames(
          (item as IDayAttendence)?.dayIndex || (item as IUser)._id
        )
      )}
    >
      {tableBodyData.map(({ getContent, th }, i) =>
        !th ? (
          <td key={i.toString() + item._id} className={cn("px-3 py-5")}>
            {getContent(item, index)}
          </td>
        ) : (
          <th key={i.toString() + item._id} className={cn("px-3 py-5")}>
            {getContent(item, index)}
          </th>
        )
      )}
    </tr>
  ));

  return content;
}
