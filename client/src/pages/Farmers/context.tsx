import { ReactNode, createContext, useContext, useState } from "react";
import useSWR from "swr";

import {
  FarmerEndpoint,
  FarmerGetAllReturnType,
} from "@/service/farmer.endpoint";

import { useHandleError } from "@/hooks/handleError.hook";

type ContextType = {
  isLoading: boolean;
  data?: FarmerGetAllReturnType | null;
  onChangePage(page: number): void;
};

const FarmersContext = createContext<ContextType>({} as ContextType);

export function FarmersContextProvider({ children }: { children: ReactNode }) {
  const { handleError } = useHandleError();

  const [page, setPage] = useState(1);

  const { data, isLoading } = useSWR(`@farmer?page=${page}`, {
    fetcher: async () => await FarmerEndpoint.getAll(page),
    onError: (error, _key, _config) =>
      handleError({
        error,
        status: "error",
        title: "Não foi possível encontrar registros de agricultores",
      }),
  });

  function onChangePage(page: number) {
    setPage(page);
  }

  return (
    <FarmersContext.Provider
      value={{
        isLoading,
        onChangePage,
        data,
      }}
    >
      {children}
    </FarmersContext.Provider>
  );
}

export const useFarmerContext = (): ContextType => {
  const context = useContext(FarmersContext);
  return context as ContextType;
};
