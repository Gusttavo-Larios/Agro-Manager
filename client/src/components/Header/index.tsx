import { ChevronDownIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import { router } from "@/router";
import { PathsEnum } from "@/enums/path.enum";
import { SystemUtil } from "@/utils/system.util";

import IconSmall from "@/assets/imgs/ICON_SMALL.svg";

export function Header() {
  const { pathname } = useLocation();
  return (
    <VStack w="100%" alignItems={"flex-start"}>
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
            <MenuItem onClick={SystemUtil.signOut}>Sair</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      {pathname !== PathsEnum.FARMERS && (
        <IconButton
          isRound={true}
          variant="outline"
          colorScheme="gray"
          color={"black"}
          aria-label="Done"
          fontSize="20px"
          icon={<ChevronLeftIcon />}
          onClick={() => router.navigate(-1)}
        />
      )}
    </VStack>
  );
}
