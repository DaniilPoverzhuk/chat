export interface ID {
  id: number;
}

export interface ITimeStamps {
  createdAt: string;
  updatedAt: string;
}

export interface IMessage extends ID {
  value: string;
  sender_id: number;
  room_id: number;
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

export interface IUser extends ID, ITimeStamps {
  username: string;
  email: string;
  password: string;
  avatar: string;
  refreshToken: string;
  accessToken: string;
  isOnline: boolean;
}

export interface IRoom extends ID {
  name: string;
  avatar: string;
  users: number[];
  isCommunity: boolean;
}
