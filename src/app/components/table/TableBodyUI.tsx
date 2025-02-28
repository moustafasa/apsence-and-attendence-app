import cn from "@/lib/cssConditional";
import { Props } from "./types";

export async function TableBodyUI<
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
