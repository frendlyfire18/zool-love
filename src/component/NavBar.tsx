import React, {ReactNode, useState} from 'react';
import {
    Text,
    Image,
    Box,
    Stack,
    Flex,
    Avatar,
    Link,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    useColorMode,
    Center, SimpleGrid, Badge,
} from '@chakra-ui/react';
import {
    IconButton,HStack
} from "@chakra-ui/react"
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {FiShoppingCart,FiTrash2} from "react-icons/fi";
import {HamburgerIcon,CloseIcon} from "@chakra-ui/icons"

import client from "../lib/Commerce";

const NavLink = ({ children,href }: { children: ReactNode,href:string }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
            color:"black"
        }}
        href={href}>
        {children}
    </Link>
);
const CartItem=({item,refreshCart})=>{
    return(
        <Box>
            <MenuItem sx={{
                '@media screen and (max-width: 540px) ':{
                    width:"200px"
                }
            }} closeOnSelect={false} width={"800px"}>
                <SimpleGrid columns={[1,null,4]}>
                    <Image
                        rounded={'lg'}
                        height={50}
                        width={"50%"}
                        mx={5}
                        objectFit={'cover'}
                        src={item.image?.url}
                    />
                    <SimpleGrid columns={[1,null,3]} mr={5}>
                        <Button onClick={()=>{
                            client.cart.update(item.id, { quantity:(item.quantity+1)});
                        }} p={2} colorScheme={"green"}>+</Button>
                        <Box mx={5} p={2}>
                            {item.quantity}
                        </Box>
                        <Button onClick={()=>{
                            client.cart.update(item.id, { quantity:(item.quantity-1)});
                        }} p={2} colorScheme={"red"}>-</Button>
                    </SimpleGrid>
                    <Box >
                        {item.name.slice(item.name.indexOf("/",5)+1,item.name.length)}
                    </Box>
                    <Button mr={5} colorScheme={"red"} ml={5} onClick={()=>{
                        client.cart.remove(item.id);
                        client.cart.retrieve().then((cart) => refreshCart(cart));
                    }}>
                        <FiTrash2/>
                    </Button>
                </SimpleGrid>
            </MenuItem>
            <MenuDivider />
        </Box>
    )
}

const Cart =()=>{
    const [cart,refreshCart] = useState(client.cart.retrieve())
    client.cart.retrieve().then((cart) => refreshCart(cart));
    return(
        <>
            <Menu>
                <MenuButton
                    color={"black"}
                    as={Button}
                    sx={{
                        '@media screen and (max-width: 540px) ':{
                            width:"25px",
                            height:"25px"
                        }
                    }}
                onClick={()=>{
                    client.cart.retrieve().then((cart) => refreshCart(cart));
                }}>
                    <Flex>
                        <Box sx={{
                            '@media screen and (max-width: 540px) ':{
                                display:"none"
                            }
                        }}>
                            <FiShoppingCart/>
                        </Box>

                        <Badge mx={2} color={'black'} fontSize={'sm'} textTransform={'uppercase'}>
                            {cart.line_items?.length||0}
                        </Badge>
                    </Flex>
                </MenuButton>
                <MenuList color={"black"} zIndex={10}>
                    {
                        cart.line_items?.length === 0
                        &&
                            <Text px={5}>
                                Корзина пуста
                            </Text>
                    }
                    {
                        cart.line_items?.map(item=>(
                            <CartItem item={item} refreshCart={refreshCart}/>
                        ))
                    }
                </MenuList>
            </Menu>
        </>
    )
}

export default function Nav() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Box
                 w="full" bg={"black"} px={4} color={"white"}>
                <Flex py={5} alignItems={'center'} justifyContent={'space-around'}>
                    <Flex><Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">ZOO-LOVE</Text><Image width={"30px"} height={"30px"} src={
                        "/heart.png"
                    }/></Flex>
                    <IconButton
                        bg={"white"}
                        color={"black"}
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack
                    as={'nav'}
                    spacing={4}
                    display={{ base: 'none', md: 'flex' }}>
                        <NavLink href={"/"}>Каталог</NavLink>
                        <NavLink href={"/categories"}>Категории</NavLink>
                        <NavLink href={"/about"}>О нас</NavLink>
                        <Flex alignItems={'center'}>
                            <SimpleGrid columns={[1,null,2]} spacingX={"20px"}>
                                <Button sx={{
                                    '@media screen and (max-width: 540px) ':{
                                        width:"25px",
                                        height:"25px"
                                    }
                                }} onClick={toggleColorMode} color={colorMode === 'light' ?"black":"white"}>
                                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                                </Button>
                                <Cart/>
                            </SimpleGrid>
                        </Flex>
                    </HStack>
                </Flex>
                {isOpen ? (
                    <Center>
                        <Box  p={4} display={{ md: 'none' }}>
                            <Flex as={'nav'}>
                                <NavLink href={"/"}>Каталог</NavLink>
                                <NavLink href={"/categories"}>Категории</NavLink>
                                <NavLink href={"/about"}>О нас</NavLink>
                                <Flex alignItems={'center'}>
                                    <SimpleGrid columns={[2,null,2]} spacingX={"20px"}>
                                        <Button sx={{
                                            '@media screen and (max-width: 540px) ':{
                                                width:"25px",
                                                height:"25px"
                                            }
                                        }} onClick={toggleColorMode} color={colorMode === 'light' ?"black":"white"}>
                                            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                                        </Button>
                                        <Cart/>
                                    </SimpleGrid>
                                </Flex>
                            </Flex>
                        </Box>
                    </Center>
                ) : null}
            </Box>
        </>
    );
}