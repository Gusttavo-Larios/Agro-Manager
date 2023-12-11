import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";

import {
  FarmerEndpoint,
  FarmerGetAllReturnType,
} from "@/service/farmer.endpoint";

type ContextType = {
  data?: FarmerGetAllReturnType | null;
  onChangePage(page: number): void;
};

const FarmersContext = createContext<ContextType>({} as ContextType);

export function FarmersContextProvider({ children }: { children: ReactNode }) {
  const toast = useToast();

  const [data, setData] = useState<ContextType["data"] | null>(null);

  useEffect(() => {
    getFarmes();
  }, []);

  async function getFarmes(page?: number) {
    try {
      const farmers = await FarmerEndpoint.getAll(page);
      setData(farmers);
    } catch (error: any) {
      let errorMessage = error.message;

      if (error instanceof AxiosError) {
        errorMessage = error.response?.data.message;
      }

      toast({
        title: "Não foi possível encontrar registros de agricultores",
        description: errorMessage,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
  }

  function onChangePage(page: number) {
    getFarmes(page)
  }

  return (
    <FarmersContext.Provider
      value={{
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
