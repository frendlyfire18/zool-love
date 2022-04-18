import React from "react"
import Main from "../layouts/Main";
import Cart from "../component/Card"
import {SimpleGrid, Box, Heading, Center, Badge} from '@chakra-ui/react'

import client from "../lib/Commerce";

const Index = ({products }) => {
    console.log(products)
    return (
        <>
            <>
                <Main>
                    <Box>
                        <Center>
                            <Box py={10} width={"55%"}>
                                <Heading>
                                    Все товары <Badge rounded="full" px="4" fontSize="0.8em" bg={"black"} color={"white"}>
                                    {products.length}
                                </Badge>
                                </Heading>
                            </Box>
                        </Center>
                        <Center>
                            <SimpleGrid columns={[1, null, 3]} spacingX='40px'>
                                {
                                    products.map(product=>(
                                        <Box>
                                            <Center>
                                                <Cart data={product}/>
                                            </Center>
                                        </Box>
                                    ))
                                }
                            </SimpleGrid>
                        </Center>
                    </Box>
                </Main>
            </>
        </>
    )
}

export async function getServerSideProps() {
    const { data: products } = await client.products.list();

    return {
        props: {
            products,
        },
    };
}

export default Index
