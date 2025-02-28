export type Props<T extends IDayAttendence | Omit<IUser, "password">> = {
  promise: Promise<T[]>;
  tableBodyData: TableBodyElement<T>[];
  addOnClassNames?: (
    item: IUser["_id"] | IDayAttendence["dayIndex"]
  ) => ClassValue;
};
