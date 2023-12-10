import { VStack } from "@chakra-ui/react";
import { Header } from "../Header";
import { ReactNode } from "react";

export function Body(props: { children: ReactNode }) {
  return (
    <VStack spacing="1rem" px="1rem" py="2rem">
      <Header />
      {props.children}
    </VStack>
  );
}
