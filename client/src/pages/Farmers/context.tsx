import {
  FarmerEndpoint,
  FarmerGetAllReturnType,
} from "@/service/farmer.endpoint";
import { FarmerType } from "@/types/farmer.type";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { INITIAL_STATES } from "./constants";

type ContextType = {
  data: FarmerGetAllReturnType | null;
  getFarmes(page?: number): void;
  deleteFarmerProps: {
    data: {
      farmerId: FarmerType["id"];
      fantasyName: FarmerType["fantasy_name"];
      isOpen: boolean;
    };
    requestDeleteFarmer(farmerId: FarmerType["id"]): void;
    confirmDeleteFarmer(): Promise<void>;
    cancelDeleteFarmer(): void;
  };
};

const FarmersContext = createContext<ContextType>({} as ContextType);

export function FarmersContextProvider({ children }: { children: ReactNode }) {
  const toast = useToast();

  const [data, setData] = useState<ContextType["data"]>(INITIAL_STATES.data);
  const [dataForFarmerExclusionRequest, setDataForFarmerExclusionRequest] =
    useState<ContextType["deleteFarmerProps"]["data"]>(
      INITIAL_STATES.dataForFarmerExclusionRequest
    );

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

  function requestDeleteFarmer(farmerId: FarmerType["id"]): void {
    try {
      const farmer = data?.data.find((farmer) => farmer.id === farmerId);

      if (!farmer) throw new Error("O Agricultor não foi encontrado");

      setDataForFarmerExclusionRequest({
        farmerId: farmer.id,
        fantasyName: farmer.fantasy_name,
        isOpen: true,
      });
    } catch (error: any) {
      toast({
        title: "Não foi possível soliciar a exclusão do agricultor",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
  }

  async function confirmDeleteFarmer(): Promise<void> {
    try {
      await FarmerEndpoint.delete(dataForFarmerExclusionRequest.farmerId);

      setDataForFarmerExclusionRequest(
        INITIAL_STATES.dataForFarmerExclusionRequest
      );

      toast({
        title: "O cadastro do Agricultor foi excluído com sucesso",
        description: null,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      getFarmes();
    } catch (error: any) {
      let errorMessage = error.message;

      if (error instanceof AxiosError) {
        errorMessage = error.response?.data.message;
      }

      toast({
        title: "Não foi possível excluir o cadastro do agricultor",
        description: errorMessage,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
  }

  function cancelDeleteFarmer(): void {
    setDataForFarmerExclusionRequest(
      INITIAL_STATES.dataForFarmerExclusionRequest
    );
  }

  return (
    <FarmersContext.Provider
      value={{
        getFarmes,
        deleteFarmerProps: {
          requestDeleteFarmer,
          confirmDeleteFarmer,
          cancelDeleteFarmer,
          data: dataForFarmerExclusionRequest,
        },
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
