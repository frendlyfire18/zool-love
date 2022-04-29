import React, {useState} from 'react';
import Main from "../layouts/Main";
import {Center, Heading, Box, Button,Link} from "@chakra-ui/react"
import {withUrqlClient} from "next-urql";
import {CreateURQLClient} from "../utils/CreateURQLClient";
import InputField from "../component/Inputs/InputFIeld";
import {Form, Formik} from "formik";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";
import {useRouter} from "next/router";
import Head from "next/head";

function Enter(props) {
    const router = useRouter();
    const [isClicked,click] = useState(false)
    return (
        <div>
            <Head>
                <title>{!isClicked?"Вход":"Зарегестрироваться"}</title>
            </Head>
            <Main>
                <Center my={10}>
                    <Box my={10} width={{base:"250px", md:"800px"}} borderRadius={"lg"} bg={"black"}>
                        <Center>
                            <Heading py={5} color={"white"}>
                                {!isClicked?"Вход":"Регистрация"}
                            </Heading>
                        </Center>
                        <Box borderRadius={"lg"} bg={"black"} color={"white"}>
                            <Center>
                                <Formik
                                    initialValues={
                                        {
                                            login:'',
                                            email:'',
                                            password:''
                                        }}
                                    onSubmit={async (values, actions) => {
                                            if(isClicked){
                                                router.push("/")
                                            }else if(!isClicked && (values.login === "admin"&&values.password === "admin")){
                                                router.push("/admin")
                                            }
                                    }}
                                >
                                    {(props) => (
                                        <Form
                                        >
                                            <InputField
                                                placeholder={"Логин"}
                                                label={"Введите Логин"}
                                                name={"login"}
                                                type={"name"}
                                                width={{base:"225px",md:"650px"} as never}
                                            />
                                            {
                                                isClicked
                                                &&
                                                <InputField
                                                    placeholder={"Почта"}
                                                    label={"Введите Почту"}
                                                    name={"email"}
                                                    type={"email"}
                                                    width={{base:"225px",md:"650px"} as never}
                                                />
                                            }
                                            <InputField
                                                placeholder={"Пароль"}
                                                label={"Введите Пароль"}
                                                name={"password"}
                                                type={"password"}
                                                width={{base:"225px",md:"650px"} as never}
                                            />
                                            <Box mt={5}>
                                                <Link onClick={()=>click(!isClicked)} color={"hsl(317 100% 54%)"} textShadow={"0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em"}>
                                                    Регистрация
                                                </Link>
                                            </Box>
                                            <Button isLoading={props.isSubmitting} my={10} width={{base:"225px",md:"650px"} as never} p={2} _hover={{
                                                background:"hsl(317 100% 54%)",
                                                color:"black",
                                                textShadow:"none",
                                            }} sx={{
                                                '@media screen and (max-width: 540px) ':{
                                                    width:"25px",
                                                    height:"25px"
                                                },
                                                background:"hsl(323 21% 16%)",
                                                color:"hsl(317 100% 54%)",
                                                border:"hsl(317 100% 54%) 0.125em solid",
                                                textShadow:"0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em",
                                                boxShadow:"inset 0 0 0.5em 0 hsl(317 100% 54%), 0 0 0.5em 0 hsl(317 100% 54%)",
                                            }}
                                            type='submit'
                                            >
                                                {!isClicked?"Вход":"Регистрация"}
                                            </Button>
                                        </Form>
                                    )}
                                </Formik>
                            </Center>
                        </Box>
                    </Box>
                </Center>
            </Main>
        </div>
    );
}

export default withUrqlClient(CreateURQLClient,{ssr:false})(Enter);