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
  attendence: Attendence[];
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
  size?: string;
};

type TableBodyElement<T> = {
  getContent: (item: T, index: number) => ReactNode;
  addonClassName?: string;
};
