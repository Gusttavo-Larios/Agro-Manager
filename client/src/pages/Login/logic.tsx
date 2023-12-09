import { AdministratorEndpoint } from "@/service/administrator.endpoint";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";

export function useLogic() {
  const toast = useToast();

  async function signUp(email: string, password: string) {
    try {
      const response = await AdministratorEndpoint.signIn(email, password);
      sessionStorage.setItem("@userToken", response.access_token);
      console.log("OK!");
    } catch (error: any) {
      let errorMessage = error.message;

      if (error instanceof AxiosError) {
        errorMessage = error.response?.data.message;
      }

      toast({
        title: "Não foi possível realizar a autenticação",
        description: errorMessage,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
  }

  return {
    signUp,
  };
}
