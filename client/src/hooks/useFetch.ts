import { useEffect, useState } from "react";
import axios from "@/axios";
import { TypeError } from "@/axios/types";

type Methods = "post" | "get" | "delete" | "put";

interface Props<T> {
  url: string;
  method?: Methods;
  data?: T;
}

export default <R, T = any>({ url, method = "get", data }: Props<T>) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<TypeError>();
  const [result, setResult] = useState<R>();

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const response = await axios<R>({ method, url, data });
        setResult(response.data);
      } catch (err) {
        const error = err as any as TypeError;
        setErrors(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { result, isLoading, errors };
};
