export interface ID {
  id: number | null;
}

export interface IUser extends ID {
  username: string;
  email: string;
  password: string;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
  refreshToken: string;
  accessToken: string;
}
