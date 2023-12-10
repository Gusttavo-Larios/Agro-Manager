import {
  FarmerEndpoint,
  FarmerGetAllReturnType,
} from "@/service/farmer.endpoint";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type ContextType = {
  data: FarmerGetAllReturnType | null;
  getFarmes(page?: number): void;
};

const initialContextValue = {
  data: {
    data: [],
    currentPage: 1,
    totalPages: 1,
  },
  getFarmes: () => null,
};

const FarmersContext = createContext<ContextType>(
  initialContextValue as ContextType
);

export function FarmersContextProvider({ children }: { children: ReactNode }) {
  const toast = useToast();
  const [data, setData] = useState<ContextType["data"]>(null);

  useEffect(() => {
    getFarmes();
  }, []);

  async function getFarmes(page?: number) {
    try {
      const farmers = await FarmerEndpoint.getAll(page);
      setData(farmers);
    } catch (error: any) {
      console.log(error);
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

  return (
    <FarmersContext.Provider
      value={{
        getFarmes,
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
