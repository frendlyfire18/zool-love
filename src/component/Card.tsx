import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';
import NextLink from "next/link"
import {useRouter} from "next/router";
import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Flex,
    Image, Badge, Tooltip, chakra, Icon, SimpleGrid,Link
} from '@chakra-ui/react';

import client from "../lib/Commerce";
import React from "react";

function Card({data}) {
    return (
        <Center py={12}>
            <Box
                role={'group'}
                p={6}
                maxW={'330px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}>
                <Box
                    rounded={'lg'}
                    mt={-12}
                    pos={'relative'}
                    height={'230px'}
                    _after={{
                        transition: 'all .3s ease',
                        content: '""',
                        w: 'full',
                        h: 'full',
                        pos: 'absolute',
                        top: 5,
                        left: 0,
                        backgroundImage: `url(${data.image?.url})`,
                        filter: 'blur(15px)',
                        zIndex: -1,
                    }}
                    _groupHover={{
                        _after: {
                            filter: 'blur(20px)',
                        },
                    }}>
                    <Image
                        rounded={'lg'}
                        height={230}
                        width={282}
                        objectFit={'cover'}
                        src={data.image?.url}
                    />
                </Box>
                <Badge color={'green'} fontSize={'sm'} textTransform={'uppercase'}>
                    {data.sku}
                </Badge>
                <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                    <NextLink href={"/good/[id]"} as={`/good/${data.id}`}>
                        <Link>
                            {data.name}
                        </Link>
                    </NextLink>
                </Heading>
                <SimpleGrid columns={[1,null,4]} >
                    <Text fontSize={"lg"} py={5}>
                        <Flex>
                            {data.price.formatted_with_symbol}
                            <Badge rounded="full" mx={2} px="2" fontSize="0.8em" bg={"black"} color={"white"}>
                                Кол-во:{data?.inventory?.available}
                            </Badge>
                        </Flex>
                    </Text>
                    <Box>

                    </Box>
                    <Box>

                    </Box>
                    <Tooltip
                        label="Добавить в корзину"
                        bg="white"
                        placement={'top'}
                        color={'gray.800'}
                        fontSize={'1.2em'}
                    >
                        <chakra.a _hover={{
                            cursor:"pointer"
                        }}  onClick={()=>{
                            client.cart.add(data.id, 1).then((response) => console.log(response));
                        }} display={'flex'}>
                            <Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} />
                        </chakra.a>
                    </Tooltip>
                </SimpleGrid>
            </Box>
        </Center>
    );
}

export default Card;