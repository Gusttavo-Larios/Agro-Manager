import { Button, HStack, VStack, Heading } from "@chakra-ui/react";

import { Body } from "@/components/Body";
import { FarmerTable } from "./components/FarmerTable";
import { FarmersContextProvider } from "./context";
import { NavigateUtil } from "@/utils/navigate.util";
import { FarmerScreenMode } from "@/enums/farmer.enum";
import { AlertConfirmDelete } from "./components/AlertConfirmDelete";
import { ContextAlertConfirmationDeleteProvider } from "./components/AlertConfirmDelete/context";

export function Farmers() {
  return (
    <FarmersContextProvider>
      <ContextAlertConfirmationDeleteProvider>
        <Body>
          <VStack w="full" px="1rem" alignItems="flex-end" spacing="1rem">
            <HStack w="full" justifyContent="space-between" alignItems="center" wrap={"wrap"}>
              <Heading>Agricultores</Heading>
              <Button
                colorScheme="blue"
                size="md"
                onClick={() =>
                  NavigateUtil.navigateTo("/agricultor/novo", {
                    type: FarmerScreenMode.CREATE,
                  })
                }
              >
                Cadastrar Agricultor
              </Button>
            </HStack>
            <FarmerTable />
          </VStack>
        </Body>
        <AlertConfirmDelete />
      </ContextAlertConfirmationDeleteProvider>
    </FarmersContextProvider>
  );
}
