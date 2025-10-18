import { Box, Heading, Highlight, HStack } from '@chakra-ui/react'
import { Saira } from 'next/font/google'
import React from 'react'
import LoginSignUp from './loginSignUp'

const saira = Saira({
	subsets: ['latin']
})

const Navbar = () => {
	return (
		<Box
			className={saira.className}
			as="nav"
			position="fixed"
			top="0"
			left="0"
			w="100%"
			h={"8vh"}
			bg={"gray.200"}
			boxShadow={"md"}
			zIndex={1000}
			px={"10vw"}
			color={"#031621"}
		>
			<HStack justify={"space-between"} alignItems={"center"} h={"100%"}>
				<Heading className={saira.className} size={"3xl"} cursor={"pointer"} color={"#031621"}>
					<Highlight query="Hotels" styles={{ color: "green.500" }}>Hotels Management</Highlight>
				</Heading>
				<LoginSignUp />
			</HStack>
		</Box >
	)
}

export default Navbar;