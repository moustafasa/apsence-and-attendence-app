export default function AttendenceTable() {
  return (
    <div className="p-5">
      <table className="w-full border-separate capitalize table-fixed border-spacing-0">
        <colgroup>
          <col className="bg-black-200" />
        </colgroup>
        <thead className="">
          <tr className="bg-black-100">
            <th className=" rounded-ss-lg py-3 w-[200px]">days</th>
            <th className="py-3">start</th>
            <th className=" py-3">end</th>
            <th className="rounded-r-lg py-3">options</th>
          </tr>
        </thead>
        <tbody>
          {new Array(30).fill(0).map((_, key) => (
            <tr key={key}>
              <th className="py-3">{key + 1}</th>
              <td></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
