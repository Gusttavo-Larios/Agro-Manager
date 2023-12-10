import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import IconSmall from "@/assets/imgs/ICON_SMALL.svg";
import { SystemUtil } from "@/utils/system.util";

export function Header() {
  return (
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
  );
}
