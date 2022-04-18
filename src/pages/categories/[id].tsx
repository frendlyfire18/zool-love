import React,{useState} from "react"
import Main from "../../layouts/Main";
import Cart from "../../component/Card"
import {SimpleGrid, Box, Heading, Center, Badge} from '@chakra-ui/react'

import client from "../../lib/Commerce";
import {useRouter} from "next/router";

const GoodsByCategory = ({data}) => {
    const router=useRouter();
    const [category,setCategory] = useState("")
    client.categories.retrieve(router.query.id).then((category) => setCategory(category.name));
    return (
        <>
            <>
                <Main>
                    <Box>
                        <Center>
                            <Box my={10} pt={10} width={"55%"}>
                                <Heading>
                                    Все товары по категории "{category}"<Badge rounded="full" px="4" fontSize="0.8em" bg={"black"} color={"white"}>
                                    {data?.length}
                                </Badge>
                                </Heading>
                            </Box>
                        </Center>
                        <Center>
                            <SimpleGrid columns={[1, null, 3]} spacingX='40px'>
                                {
                                    data?.map(product=>(
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

export async function getServerSideProps(resolvedUrl) {
    const {data} = await client.products.list({
        category_id:[resolvedUrl.query.id]
    });

    return {
        props: {
            data
        }
    };
}

export default GoodsByCategory