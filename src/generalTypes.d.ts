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
  bonus: number;
  totalHours: number;
};

type DbUser = {
  id: number;
  password: string;
  username: string;
  name: string;
  role: Role;
};

type Db = {
  users: DbUser[];
  attendence: { [month: string]: { days: Attendence[]; completed: boolean } };
  employees: DbEmployeeUser[];
};

type Attendence = {
  id: number;
  userId: number;
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
