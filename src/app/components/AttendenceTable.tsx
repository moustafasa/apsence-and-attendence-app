export default function AttendenceTable() {
  return (
    <table>
      <colgroup>
        <col className=" bg-black-200" />
      </colgroup>
      <thead>
        <tr>
          <th>days</th>
          <th>start</th>
          <th>end</th>
        </tr>
      </thead>
      <tbody>
        {new Array(30).fill(0).map((_, key) => (
          <tr key={key}>
            <th>{key + 1}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
