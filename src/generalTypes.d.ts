enum Role {
  ADMIN = 0,
  EMPLOYEE = 1,
}

type LinkObj = {
  label: string;
  href: string;
};

type DbEmployeeUser = {
  password: string;
  username: string;
  name: string;
  role: Role.EMPLOYEE;
  hourlyRate: number;
};

type DbUser =
  | {
      password: string;
      username: string;
      name: string;
      role: Role.ADMIN;
    }
  | DbEmployeeUser;

type Db = {
  users: DbUser[];
};

type credentials = {
  password: string;
  username: string;
};
