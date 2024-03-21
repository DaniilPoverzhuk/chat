import { IUser } from "@/types";
import { Dispatch, SetStateAction, createContext } from "react";

export interface IData {
  name: string;
  users: IUser[];
}

interface Props {
  setData: Dispatch<SetStateAction<IData>>;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  data: IData;
  changeStepHandler: (type?: "prev" | "next") => void;
  onSubmit: () => void;
}

const Context = createContext<Props | null>(null);

export default Context;
