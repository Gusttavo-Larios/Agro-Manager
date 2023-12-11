import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useFarmerContext } from "../../context";

export function AlertConfirmDelete() {
  const {
    deleteFarmerProps: { data, confirmDeleteFarmer, cancelDeleteFarmer },
  } = useFarmerContext();

  const cancelRef = React.useRef();

  const { isOpen, onClose } = useDisclosure({
    isOpen: data.isOpen,
  });

  function confirm() {
    confirmDeleteFarmer();
    onClose();
  }

  function close() {
    cancelDeleteFarmer();
    onClose();
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Excluir cadastro de Agricultor
          </AlertDialogHeader>

          <AlertDialogBody>
            Tem certeza que dezeja excluir o(a) {data.fantasyName}? Você não
            pode desfazer esta ação posteriormente.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={confirm}>
              Excluir
            </Button>
            <Button colorScheme="red" onClick={close} ml={3}>
              Cancelar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
