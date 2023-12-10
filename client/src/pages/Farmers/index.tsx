import { Button, HStack, VStack, Heading } from "@chakra-ui/react";

import { Body } from "@/components/Body";
import { FarmerTable } from "./components/FarmerTable";
import { FarmersContextProvider } from "./context";

export function Farmers() {
  return (
    <FarmersContextProvider>
      <Body>
        <VStack w="full" px="1rem" alignItems="flex-end" spacing="1rem">
          <HStack w="full" justifyContent="space-between" alignItems="center">
            <Heading>Agricultores</Heading>
            <Button colorScheme="blue" size="md">
              Cadastrar Agricultor
            </Button>
          </HStack>
          <FarmerTable />
        </VStack>
      </Body>
    </FarmersContextProvider>
  );
}
