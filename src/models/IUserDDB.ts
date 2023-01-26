export interface IUserDDB {
  pk: string;
  sk: string;
  user: {
    email: string;
    name: string;
    username: string;
    password: string;
    id: number;
  };
}
