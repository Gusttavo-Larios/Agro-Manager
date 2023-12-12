import { UseToastOptions, useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";

export const useHandleError = () => {
  const toast = useToast();

  function handleError(params: {
    title: string;
    status: UseToastOptions["status"];
    error: any;
  }): void {
    const { error, status, title } = params;

    let errorMessage = error.message;

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data.message;
    }

    toast({
      title,
      description: errorMessage,
      status,
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
  }

  return {
    handleError,
  };
};
