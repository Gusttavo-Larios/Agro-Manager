import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { FarmerType } from "@/types/farmer.type";
import { FarmerScreenMode } from "@/enums/farmer.enum";
import { NavigateUtil } from "@/utils/navigate.util";

import { Pagination } from "@/components/Pagination";
import NotFoundFarmersImage from "@/assets/imgs/NOT_FOUND_FARMERS.svg";

import { useAlertDialogDeleteFarmerContext } from "../AlertConfirmDelete/context";
import { useFarmerContext } from "../../context";
import { headers } from "./data";

export function FarmerTable() {
  const { data, isLoading } = useFarmerContext();

  return (
    <TableContainer
      w="100%"
      minH={data?.data.length === 0 || data?.data === undefined ? "md" : "auto"}
      display={!isLoading && data ? "block" : "flex"}
      py="1rem"
      backgroundColor="gray.200"
      rounded="2rem"
      flexDir={"column"}
      alignItems="center"
      justifyContent="center"
    >
      {isLoading ? (
        <Spinner size="xl" color="gray.500" />
      ) : data?.data ? (
        <Table />
      ) : (
        <NotFoundFarmers />
      )}
    </TableContainer>
  );
}

function NotFoundFarmers() {
  return <Image src={NotFoundFarmersImage} w="xs" />;
}

function Table() {
  return (
    <>
      <ChakraTable variant="striped" colorScheme="gray">
        <Thead>
          <Header />
        </Thead>
        <Tbody>
          <TableRows />
        </Tbody>
      </ChakraTable>
      <Footer />
    </>
  );
}

function Header() {
  return (
    <Tr>
      {headers.map((th) => (
        <Th key={th} fontSize="1rem">
          {th}
        </Th>
      ))}
    </Tr>
  );
}

function TableRows() {
  const { data } = useFarmerContext();
  return (
    <>
      {data?.data.map((farmer) => (
        <TableRow key={farmer.company_identification} {...farmer} />
      ))}
    </>
  );
}

function TableRow(farmer: FarmerType) {
  const { openAlert } = useAlertDialogDeleteFarmerContext();
  return (
    <Tr>
      <Td>{farmer.corporate_name}</Td>
      <Td>{farmer.fantasy_name}</Td>
      <Td>{farmer.company_identification}</Td>
      <Td>{farmer.phone_number}</Td>
      <Td>{farmer.city?.city_name}</Td>
      <Td>{farmer.city?.state?.state_name}</Td>
      <Td>
        <Menu>
          <MenuButton
            colorScheme="teal"
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            Cadastro
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() =>
                NavigateUtil.navigateTo(`/agricultor/${farmer.id}`, {
                  type: FarmerScreenMode.UPDATE,
                })
              }
            >
              Editar
            </MenuItem>
            <MenuItem onClick={() => openAlert(farmer.id)}>Excluir</MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
}
function Footer() {
  const { data, onChangePage } = useFarmerContext();
  return (
    <HStack w="full" px="1rem" py="1rem" justifyContent="space-between">
      <Text fontWeight="700">
        Página {data?.currentPage} de {data?.totalPages}
      </Text>

      <Pagination
        currentPage={data?.currentPage}
        totalPages={data?.totalPages}
        changePage={onChangePage}
      />
    </HStack>
  );
}
