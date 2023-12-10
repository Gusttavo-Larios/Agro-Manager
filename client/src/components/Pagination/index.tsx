import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, HStack } from "@chakra-ui/react";

type IProps = {
  currentPage: number;
  totalPages: number;
  numberOfVisiblePages?: number;
  changePage: (page: number) => void;
};

export function Pagination({
  currentPage,
  numberOfVisiblePages = 3,
  totalPages,
  changePage,
}: IProps): JSX.Element {
  let pages: number[] = [];

  for (
    let index = currentPage;
    index < currentPage + numberOfVisiblePages;
    index++
  ) {
    if (index <= totalPages) {
      pages.push(index);
    }
  }

  // Adiciona paginas antes da pagina atual
  if (pages.length < numberOfVisiblePages - 1) {
    for (let index = pages[pages.length - 1] - 1; index > 0; index--) {
      if (index > 0) {
        if (pages.length === 3) break;
        pages.unshift(index);
      }
    }
  }

  function nextPage() {
    changePage(currentPage + 1);
  }

  function previousPage() {
    changePage(currentPage - 1);
  }

  return (
    <HStack w="fit-content" spacing={0}>
      {currentPage > 1 && (
        <Button
          size="md"
          width="4"
          bg="gray.100"
          borderColor="gray.400"
          borderWidth="1px"
          borderStyle="solid"
          rounded={0}
          roundedLeft="0.6rem"
          onClick={previousPage}
          disabled
        >
          <ChevronLeftIcon />
        </Button>
      )}
      {pages.map((item) => (
        <Button
          key={item}
          size="md"
          fontSize="xs"
          width="4"
          bg="gray.100"
          rounded={0}
          borderColor="gray.400"
          borderWidth="1px"
          borderStyle="solid"
          _hover={{ bg: "gray.400" }}
          onClick={() => changePage(item)}
        >
          {item}
        </Button>
      ))}
      {currentPage < totalPages && (
        <Button
          size="md"
          width="4"
          bg="gray.100"
          borderColor="gray.400"
          borderWidth="1px"
          borderStyle="solid"
          rounded={0}
          roundedRight="0.6rem"
          onClick={nextPage}
        >
          <ChevronRightIcon />
        </Button>
      )}
    </HStack>
  );
}
