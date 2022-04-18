import {Input, InputGroup, InputRightElement} from "@chakra-ui/input";
import {Button} from "@chakra-ui/button";

function PasswordInput() {

    return (
        <InputGroup size='md'>
            <Input
                pr='4.5rem'
                type={'text'}
                placeholder='Enter password'
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm'>
                    Поиск
                </Button>
            </InputRightElement>
        </InputGroup>
    )
}