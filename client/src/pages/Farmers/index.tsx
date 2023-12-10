import {
  Button,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Text,
} from "@chakra-ui/react";

import IconSmall from "@/assets/imgs/ICON_SMALL.svg";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useLogic } from "./logic";
import { listTableTh } from "./data";
import { Pagination } from "@/components/Pagination";

export function Farmers() {
  const logic = useLogic();

  return (
    <VStack spacing="4rem" px="1rem" py="2rem">
      <HStack
        pb="1rem"
        w="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Image src={IconSmall} />
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Menu
          </MenuButton>
          <MenuList>
            <MenuItem onClick={logic.signOut}>Sair</MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      <VStack w="full" px="1rem" alignItems="flex-end" spacing="1rem">
        <HStack w="full" justifyContent="space-between" alignItems="center">
          <Heading>Agricultores</Heading>
          <Button colorScheme="blue" size="md">
            Cadastrar Agricultor
          </Button>
        </HStack>
        <TableContainer
          w="100%"
          py="1rem"
          backgroundColor="gray.200"
          rounded="2rem"
        >
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                {listTableTh.map((item) => (
                  <Th key={item} fontSize="1rem">
                    {item}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {logic.farmes?.data.map((item) => (
                <Tr key={item.company_identification}>
                  <Td>{item.corporate_name}</Td>
                  <Td>{item.fantasy_name}</Td>
                  <Td>{item.company_identification}</Td>
                  <Td>{item.phone_number}</Td>
                  <Td>{item.city?.city_name}</Td>
                  <Td>{item.city?.state?.state_name}</Td>
                  <Td>
                    <Button colorScheme="green">Editar</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <HStack w="full" px="1rem" py="1rem" justifyContent="space-between">
            <Text fontWeight="700">
              Página {logic.farmes?.currentPage} de {logic.farmes?.totalPages}
            </Text>
            <Pagination
              currentPage={logic.farmes?.currentPage || 1}
              totalPages={logic.farmes?.totalPages || 1}
              changePage={logic.getAll}
            />
          </HStack>
        </TableContainer>
      </VStack>
    </VStack>
  );
}
