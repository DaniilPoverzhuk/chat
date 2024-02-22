export interface ID {
  id: number | null;
}

export interface IUser extends ID {
  username: string;
  email: string;
  password: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  refreshToken: string;
  accessToken: string;
  isOnline: boolean;
}

export interface IMessage extends ID {
  value: string;
  senderId: number;
  roomId: number;
}

export interface ISocketUser {
  socketId: string;
  user: IUser;
}

export interface ISocketUsers {
  [id: string]: ISocketUser;
}

export interface IDefaultResponse {
  message: string;
}
