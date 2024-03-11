import { Flex, Box, Button } from "@chakra-ui/react"

export const NavBar = () => {
    return (
        <Flex py={4} px={10} align="center" justify="space-between" h={16}>
            <Box>
                <h1>ProgHub</h1>
            </Box>
            <Flex gap={5} align="center">
                <Box>
                    <Button variant="ghost" size="sm">
                        Sign in
                    </Button>
                    <Button variant="solid" size="sm">
                        Sign up
                    </Button>
                </Box>
            </Flex>
        </Flex>
    )
}

