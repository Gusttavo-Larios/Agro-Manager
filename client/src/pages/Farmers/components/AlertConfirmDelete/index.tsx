import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

import { useAlertDialogDeleteFarmerContext } from "./context";

export function AlertConfirmDelete() {
  const { cancelRef, closeAlert, isOpen, farmer, deleteFarmer } =
    useAlertDialogDeleteFarmerContext();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={closeAlert}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Excluir cadastro de Agricultor
          </AlertDialogHeader>

          <AlertDialogBody>
            Tem certeza que dezeja excluir o(a) {farmer?.fantasy_name}? Você não
            pode desfazer esta ação posteriormente.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={deleteFarmer}>
              Excluir
            </Button>
            <Button colorScheme="red" onClick={closeAlert} ml={3}>
              Cancelar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
