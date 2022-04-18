import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    VisuallyHidden,
    List,
    ListItem,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import Main from "../../layouts/Main";
import React from "react";
import {useRouter} from "next/router";
import client from "../../lib/Commerce";

const Good=({product})=>{
    return (
        <Main>
            <Container maxW={'7xl'}>
                <SimpleGrid
                    columns={{ base: 1, lg: 2 }}
                    spacing={{ base: 8, md: 10 }}
                    py={{ base: 18, md: 24 }}>
                    <Flex>
                        <Image
                            rounded={'md'}
                            alt={'product image'}
                            src={
                                product[0].image.url
                            }
                            fit={'cover'}
                            align={'center'}
                            w={'100%'}
                            h={{ base: '100%', sm: '400px', lg: '500px' }}
                        />
                    </Flex>
                    <Stack spacing={{ base: 6, md: 10 }}>
                        <Box as={'header'}>
                            <Heading
                                lineHeight={1.1}
                                fontWeight={600}
                                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                                {product[0].name}
                            </Heading>
                            <Text
                                color={useColorModeValue('gray.900', 'gray.400')}
                                fontWeight={300}
                                fontSize={'2xl'}>
                                {product[0].price.formatted_with_symbol}
                            </Text>
                        </Box>

                        <Stack
                            spacing={{ base: 4, sm: 6 }}
                            direction={'column'}
                            divider={
                                <StackDivider
                                    borderColor={useColorModeValue('gray.200', 'gray.600')}
                                />
                            }>
                            <VStack spacing={{ base: 4, sm: 6 }}>
                                <Text color={useColorModeValue('gray.500', 'gray.400')}
                                      fontSize={'2xl'}
                                      fontWeight={'300'}>
                                    <div dangerouslySetInnerHTML={{ __html: product[0].description.slice(0,product[0].description.indexOf(".",1)) }} />
                                </Text>
                                <Text fontSize={'lg'}>
                                    <div dangerouslySetInnerHTML={{ __html: product[0].description.slice(product[0].description.indexOf(".",1)+1,product[0].description.indexOf("Общие характеристики",1)) }} />
                                </Text>
                            </VStack>
                            <Box>
                                {
                                    product[0].variant_groups.map(group=>(
                                        <>
                                            <Text
                                                fontSize={{ base: '16px', lg: '18px' }}
                                                color={useColorModeValue('yellow.500', 'yellow.300')}
                                                fontWeight={'500'}
                                                textTransform={'uppercase'}
                                                py={'4'}>
                                                <div dangerouslySetInnerHTML={{ __html: group.name}}/>
                                            </Text>

                                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                                                {
                                                    group.options.map(option=>(
                                                        <List spacing={2}>
                                                            <ListItem><div dangerouslySetInnerHTML={{ __html: option.name}}/></ListItem>
                                                        </List>
                                                    ))
                                                }
                                            </SimpleGrid>
                                        </>
                                    ))
                                }
                            </Box>
                        </Stack>

                        <Button
                            rounded={'none'}
                            w={'full'}
                            mt={8}
                            size={'lg'}
                            py={'7'}
                            bg={useColorModeValue('gray.900', 'gray.50')}
                            color={useColorModeValue('white', 'gray.900')}
                            textTransform={'uppercase'}
                            _hover={{
                                transform: 'translateY(2px)',
                                boxShadow: 'lg',
                            }}
                            onClick={()=>{
                                client.cart.add(product[0].id, 1).then((response) => console.log(response));
                            }}
                        >
                            Add to cart
                        </Button>

                        <Stack direction="row" alignItems="center" justifyContent={'center'}>
                            <MdLocalShipping />
                            <Text>2-3 business days delivery</Text>
                        </Stack>
                    </Stack>
                </SimpleGrid>
            </Container>
        </Main>
    );
}

export async function getServerSideProps(resolvedUrl) {
    const {data:product,fetching} = await client.products.list({
        query : resolvedUrl.query.id
    });
    return { props: { product } }
}

export default Good;