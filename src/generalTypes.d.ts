enum Role {
  ADMIN = 0,
  EMPLOYEE = 1,
}

type LinkObj = {
  label: string;
  href: string;
};

type DbUser = {
  id: string;
  password: string;
  username: string;
  name: string;
  role: Role;
};
type DbEmployeeUser = {
  id: DbUser["id"];
  name: DbUser["name"];
  hourlyRate: number;
};
type NotificationMessage = {
  from: DbUser["id"];
  to: DbUser["id"] | "admin";
  read: boolean;
  type: string;
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
  label: string;
  addonClassName?: string;
};

type TableBodyElement<T> = {
  getContent: (bodyData: T, index: number) => ReactNode;
  th?: boolean;
};
