import AttendenceTableFooter from "@/app/components/AttendenceTableFooter";
import CalcSalaryModal from "@/app/components/CalcSalaryModal";
import Table from "@/app/components/table/Table";
import TableBody from "@/app/components/table/TableBody";
import formatTime from "@/lib/formatTime";
import getDayDate from "@/lib/getDayDate";
import modifiedGetAttendence from "@/lib/modifiedGetAttendence";
import Link from "next/link";

type Props = {
  searchParams: { show?: string };
};

export default function page({ searchParams }: Props) {
  const attendences = modifiedGetAttendence();

  const todayDate = getDayDate();

  const theader = [
    { label: "days", addonClassName: "w-[70px]" },
    { label: "start", addonClassName: "w-[200px]" },
    { label: "end", addonClassName: "w-[200px]" },
    { label: "total hours", addonClassName: "w-[200px]" },
  ] satisfies TableHeader[];

  const tableBodyData = [
    {
      getContent(bodyData, index) {
        return bodyData.id;
      },
      th: true,
    },
    {
      getContent(bodyData, index) {
        return bodyData.startDate
          ? formatTime(new Date(bodyData.startDate))
          : bodyData.startDate;
      },
    },
    {
      getContent(bodyData, index) {
        return bodyData.endDate
          ? formatTime(new Date(bodyData.endDate))
          : bodyData.endDate;
      },
    },
    {
      getContent(bodyData, index) {
        return todayDate.getDate() >= bodyData.id
          ? (bodyData.numberOfHours / 1000 / 60 / 60).toFixed(2) + " hours"
          : "";
      },
    },
    {
      getContent(bodyData, index) {
        return (
          index + 1 < todayDate.getDate() && (
            <Link
              href={`/dashboard/edit/${bodyData.id}`}
              className="capitalize bg-green-100 transition-colors duration-300 hover:bg-green-200 shadow-sm px-4 py-1 rounded-lg"
            >
              edit
            </Link>
          )
        );
      },
    },
  ] satisfies TableBodyElement<Attendence>[];

  return (
    <div>
      <h2 className="text-center p-3 mt-10 mb-4 capitalize text-3xl font-bold">
        your attendence
      </h2>
      <div className="max-w-full">
        <Table theaders={theader} tfoot={<AttendenceTableFooter />}>
          <TableBody<Attendence>
            promise={attendences as Promise<Attendence[]>}
            tableBodyData={tableBodyData}
            addOnClassNames={(index) => ({
              "outline-2 outline-green-100 outline-solid rounded-lg":
                todayDate.getDate() === index,
            })}
          />
        </Table>

        <button className="mx-auto block w-fit mt-5 capitalize bg-green-100 p-3 rounded-lg shadow-lg hover:bg-green-200 transition-colors duration-500 mb-5">
          calc salary
        </button>
      </div>
      {searchParams.show !== undefined && <CalcSalaryModal />}
    </div>
  );
}
