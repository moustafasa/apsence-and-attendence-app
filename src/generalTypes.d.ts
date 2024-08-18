enum Role {
  ADMIN = 0,
  EMPLOYEE = 1,
}

type LinkObj = {
  label: string;
  href: string;
};

type DbEmployeeUser = {
  id: number;
  name: string;
  hourlyRate: number;
};

type DbUser = {
  id: number;
  password: string;
  username: string;
  name: string;
  role: Role;
};

type NotificationMessage = {
  from: number;
  to: number | string;
  read: boolean;
  type: string;
};

type Db = {
  users: DbUser[];
  attendence: {
    [month: string]: {
      userId: number;
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
