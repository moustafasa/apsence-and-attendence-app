type Props = { employees: DbEmployeeUser[] };

export default function Table({ employees }: Props) {
  return (
    <div className="container  px-10">
      <table className="table-fixed w-full text-center capitalize ">
        <thead>
          <tr className="bg-black-100">
            <th className="py-4 ">id</th>
            <th className="py-4 ">name</th>
            <th className="py-4 ">hourly rate</th>
            <th className="py-4 ">number of worked hours</th>
            <th className="py-4 ">options</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.name} className=" even:bg-black-400">
              <td className="py-3">#{index + 1}</td>
              <td className="py-3">{employee.name}</td>
              <td className="py-3">{employee.hourlyRate}</td>
              <td className="py-3">300</td>
              <td className="py-3">
                <div className="flex justify-center gap-3">
                  <button className=" capitalize bg-green-100 transition-colors duration-300 hover:bg-green-200 shadow-sm px-4 py-2 rounded-lg">
                    edit
                  </button>
                  <button className=" capitalize bg-blue-300 transition-colors duration-300 hover:bg-blue-200 shadow-sm px-4 py-2 rounded-lg">
                    view
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
