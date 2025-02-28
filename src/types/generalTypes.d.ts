declare enum Role {
  ADMIN = 0,
  EMPLOYEE = 1,
}

declare enum NotificationTypes {
  SALARY_REQUEST = "SALARY_REQUEST",
  SALARY_PAID = "SALARY_PAID",
}

type LinkObj = {
  label: string;
  href: string;
};

type IUser = {
  _id: string;
  password: string;
  username: string;
  name: string;
  role: Role;
  hourlyRate?: number;
};

interface INotificationMsg {
  _id: string;
  from: DbUser["id"];
  to: DbUser["id"] | "admin";
  read: boolean;
  type: NotificationTypes;
  createdAt: string;
}

type INotificationsMsgPopulated = Omit<INotificationMsg, "from"> & {
  from: { name: IUser["name"]; _id: IUser["_id"] };
};

interface IMonthAttendence {
  _id: string;
  monthIndex: number;
  completed: boolean;
  userId: IUser["_id"];
  paidSalary: number;
  days: IDayAttendence[];
  totalMonthHours?: number;
}

interface IDayAttendence {
  _id?: string;
  dayIndex: number;
  startDate: date;
  endDate?: date;
  totalHours?: number;
}

type DbUser = {
  id: string;
  password: string;
  username: string;
  name: string;
  role: Role;
  hourlyRate?: number;
};

type DbEmployeeUser = {
  id: DbUser["id"];
  name: DbUser["name"];
  hourlyRate: number;
};
type NotificationMessage = {
  id: string;
  from: DbUser["id"];
  name: DbUser["name"];
  to: DbUser["id"] | "admin";
  read: boolean;
  type: NotificationTypes;
};

type Db = {
  users: DbUser[];
  attendence: {
    [month: string]: {
      userId: DbUser["id"];
      completed: boolean;
      days: Attendence[];
      paidSalary: number;
    }[];
  };
  employees: DbEmployeeUser[];
  notifications: NotificationMessage[];
};

type Attendence = {
  id: number;
  startDate: string;
  endDate: string;
  numberOfHours: number;
};

type TableHeader = {
  label: React.ReactNode;
  addonClassName?: string;
};

type TableBodyElement<T> = {
  getContent: (bodyData: T, index: number) => ReactNode;
  th?: boolean;
};
