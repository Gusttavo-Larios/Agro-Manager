import { ReactNode, createContext, useContext, useEffect, useState } from "react";

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

  const [data, setData] = useState<FarmerGetAllReturnType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getFarmers(1)
  },[])

  async function getFarmers(page?:number): Promise<void> {
    try {
      setIsLoading(true)
      const response = await FarmerEndpoint.getAll(page);
      setData(response);
    } catch (error: any) {
      handleError({
        error,
        status: "error",
        title: "Não foi possível encontrar registros de agricultores",
      });
    } finally {
      setIsLoading(false)
    }
  }

  function onChangePage(page: number) {
    getFarmers(page);
  }

  return (
    <FarmersContext.Provider
      value={{
        isLoading,
        onChangePage,
        data
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
