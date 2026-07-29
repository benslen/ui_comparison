import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  Portal,
  Separator,
  Text,
} from '@chakra-ui/react';
import { ChartNoAxesCombined, Moon, Sun } from 'lucide-react';
import { appName, avatarMenu, currentUser, navLinks } from '@data';
import { useColorMode } from '../color-mode';

export function NavBar() {
  const { isDark, toggle } = useColorMode();

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="docked"
      bg="bg.panel"
      borderBottomWidth="1px"
    >
      <Flex h="60px" px="4" align="center" gap="2">
        <HStack gap="2.5" mr="6">
          <Flex
            w="32px"
            h="32px"
            rounded="lg"
            bg="brand.solid"
            color="brand.contrast"
            align="center"
            justify="center"
          >
            <ChartNoAxesCombined size={18} />
          </Flex>
          <Text fontWeight="bold">{appName}</Text>
        </HStack>

        <HStack gap="6" hideBelow="md">
          {navLinks.map((link, index) => (
            <Link
              key={link.id}
              href={link.href}
              fontSize="sm"
              fontWeight={index === 0 ? 'bold' : 'medium'}
              color={index === 0 ? 'brand.fg' : 'fg.muted'}
              textDecoration="none"
              _hover={{ textDecoration: 'none', color: 'fg' }}
            >
              {link.label}
            </Link>
          ))}
        </HStack>

        <Box flex="1" />

        <IconButton
          aria-label="Toggle color mode"
          variant="ghost"
          size="sm"
          onClick={toggle}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </IconButton>

        <Menu.Root positioning={{ placement: 'bottom-end' }}>
          <Menu.Trigger asChild>
            <Avatar.Root size="sm" colorPalette="brand" cursor="pointer" ml="1">
              <Avatar.Fallback>{currentUser.initials}</Avatar.Fallback>
            </Avatar.Root>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content minW="232px">
                <Box px="3" py="1.5">
                  <Text fontSize="sm" fontWeight="semibold">
                    {currentUser.name}
                  </Text>
                  <Text fontSize="xs" color="fg.muted">
                    {currentUser.email}
                  </Text>
                </Box>
                {avatarMenu.map((item) => (
                  <Box key={item.id}>
                    {item.dividerBefore && <Separator my="1" />}
                    <Menu.Item
                      value={item.id}
                      color={item.danger ? 'fg.error' : undefined}
                      _hover={item.danger ? { bg: 'bg.error', color: 'fg.error' } : undefined}
                    >
                      {item.label}
                    </Menu.Item>
                  </Box>
                ))}
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Flex>
    </Box>
  );
}
