import React from "react"
import Main from "../layouts/Main";
import {SimpleGrid, Box, Heading, Center, Badge} from '@chakra-ui/react'


import client from "../lib/Commerce";
import Category from "../component/Category";

const Categories = ({categories }) => {
    return (
        <>
            <>
                <Main>
                    <Box>
                        <Center>
                            <Box my={10} pt={10} width={"65%"}>
                                <Heading>
                                    Все категории <Badge rounded="full" px="4" fontSize="0.8em" bg={"black"} color={"white"}>
                                    {categories.length}
                                </Badge>
                                </Heading>
                            </Box>
                        </Center>
                        <Center py={10}>
                            <SimpleGrid columns={[1, null, 3]} spacingX='120px'>
                                {
                                    categories.map((category,value)=>(
                                        <Box>
                                            <Category id={category.id} image={category.assets[0].url} name={category.name}/>
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
    const { data: categories } = await client.categories.list();

    return {
        props: {
            categories,
        },
    };
}

export default Categories