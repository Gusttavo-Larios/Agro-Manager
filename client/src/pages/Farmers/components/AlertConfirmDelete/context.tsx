import React, { ReactNode, createContext, useContext, useState } from "react";
import { AlertDialogProps, useDisclosure, useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";

import { FarmerType } from "@/types/farmer.type";
import { FarmerEndpoint } from "@/service/farmer.endpoint";

import { useFarmerContext } from "../../context";

type ContextAlertConfirmationDeleteType = {
  openAlert(farmerId: FarmerType["id"]): void;
  closeAlert(): void;
  isOpen: boolean;
  cancelRef: React.MutableRefObject<AlertDialogProps | null>;
  farmer: FarmerType | undefined;
  deleteFarmer(): Promise<void>;
};

const ContextAlertConfirmationDelete = createContext(
  {} as ContextAlertConfirmationDeleteType
);

export function ContextAlertConfirmationDeleteProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { data, onChangePage } = useFarmerContext();

  const toast = useToast();

  const [farmerId, setFarmerId] = useState<FarmerType["id"] | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<AlertDialogProps | null>(null);

  function openAlert(farmerId: FarmerType["id"]) {
    onOpen();
    setFarmerId(farmerId);
  }

  function closeAlert() {
    onClose();
  }

  async function deleteFarmer(): Promise<void> {
    try {
      if (!farmerId)
        throw new Error(
          "É necessário escolher um cadastro para efeturar a exclusão."
        );

      await FarmerEndpoint.delete(farmerId);

      setFarmerId(null);

      onClose();

      toast({
        title: "O cadastro do Agricultor foi excluído com sucesso",
        description: null,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });

      onChangePage(1);
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

  const farmer: FarmerType | undefined = data?.data.find(
    (farmer) => farmer.id === farmerId
  );

  return (
    <ContextAlertConfirmationDelete.Provider
      value={{
        isOpen,
        cancelRef,
        openAlert,
        closeAlert,
        farmer,
        deleteFarmer,
      }}
    >
      {children}
    </ContextAlertConfirmationDelete.Provider>
  );
}

export const useAlertDialogDeleteFarmerContext =
  (): ContextAlertConfirmationDeleteType => {
    return useContext(ContextAlertConfirmationDelete);
  };
