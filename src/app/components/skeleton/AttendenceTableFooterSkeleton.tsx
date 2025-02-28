import Skeleton from "./Skeleton";

export default function AttendenceTableFooterSkeleton() {
  return (
    <tfoot>
      <tr className="bg-black-200">
        <th colSpan={2} className="px-3 py-5 text-2xl rounded-es-lg">
          total month hours :
        </th>
        <td colSpan={3} className=" py-5 px-3  rounded-ee-lg">
          <Skeleton classNames="sk-header" />
        </td>
      </tr>
    </tfoot>
  );
}
