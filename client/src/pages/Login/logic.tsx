import { router } from "@/router";
import { AdministratorEndpoint } from "@/service/administrator.endpoint";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";

export function useLogic() {
  const toast = useToast();

  async function signIn(email: string, password: string) {
    try {
      const response = await AdministratorEndpoint.signIn(email, password);
      sessionStorage.setItem("@userToken", response.access_token);
      router.navigate('/agricultores')
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
    signIn,
  };
}
