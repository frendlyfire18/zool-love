import {
    Box,
    Container,
    Link,
    SimpleGrid,
    Stack,
    Text,
    Flex,
    Tag,
    Center,
    useColorModeValue, Image,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';

const Logo = (props: any) => {
    return (
        <>
            <Flex><Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">ZOO-LOVE</Text><Image sx={{
                '@media screen and (max-width: 540px) ':{
                    width:"15px",
                    height:"15px"
                }
            }} width={"30px"} height={"30px"} src={
                "/heart.png"
            }/></Flex>
        </>
    );
};

const ListHeader = ({ children }: { children: ReactNode }) => {
    return (
        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    );
};

export default function Footer() {
    return (
        <Box
            bg={"black"}
            color={"white"}
            >
            <Container as={Stack} maxW={'6xl'} py={10}>
                <Center>
                    <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
                        <Stack align={'flex-start'}>
                            <ListHeader>Product</ListHeader>
                            <Link href={'#'}>Overview</Link>
                            <Stack direction={'row'} align={'center'} spacing={2}>
                                <Link href={'#'}>Features</Link>
                                <Tag
                                    size={'sm'}
                                    bg={useColorModeValue('green.300', 'green.800')}
                                    ml={2}
                                    color={'white'}>
                                    New
                                </Tag>
                            </Stack>
                        </Stack>
                        <Stack align={'flex-start'}>
                            <ListHeader>Company</ListHeader>
                            <Link href={'#'}>About Us</Link>
                            <Link href={'#'}>Press</Link>
                        </Stack>
                        <Stack align={'flex-start'}>
                            <ListHeader>Legal</ListHeader>
                            <Link href={'#'}>Cookies Policy</Link>
                            <Link href={'#'}>Privacy Policy</Link>
                        </Stack>
                        <Stack align={'flex-start'}>
                            <ListHeader>Follow Us</ListHeader>
                            <Link href={'#'}>Facebook</Link>
                            <Link href={'#'}>Twitter</Link>
                        </Stack>
                    </SimpleGrid>
                </Center>
            </Container>
            <Box py={10}>
                <Flex
                    align={'center'}
                    _before={{
                        content: '""',
                        borderBottom: '1px solid',
                        borderColor: useColorModeValue('gray.200', 'gray.700'),
                        flexGrow: 1,
                        mr: 8,
                    }}
                    _after={{
                        content: '""',
                        borderBottom: '1px solid',
                        borderColor: useColorModeValue('gray.200', 'gray.700'),
                        flexGrow: 1,
                        ml: 8,
                    }}>
                    <Logo />
                </Flex>
                <Text  pt={6} fontSize={'sm'} textAlign={'center'}>
                    © 2022 ZOO-LOVE. All rights reserved
                </Text>
            </Box>
        </Box>
    );
}