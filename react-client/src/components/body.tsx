import { useAuth } from '@/context/authContext'
import React from 'react'
import HotelsList from './hotelsList'
import { AbsoluteCenter, Box, Heading } from '@chakra-ui/react'
import { Saira } from 'next/font/google'
import HotelTools from './hotelsTools'

const saira = Saira({
	subsets: ['latin']
})

const Body = () => {
	const { user } = useAuth();

	return (user
		?
		<>
			<HotelTools />
			<HotelsList />
		</>
		:
		<AbsoluteCenter>
			<Box
				w={"60vw"} p={10}
				borderWidth={'2px'}
				bgColor={"green.50"}
				borderColor={"green.600"}
				borderRadius={'xl'}
				textAlign={"center"}
			>
				<Heading fontSize={'2xl'}
					className={saira.className}
				>
					You need to log in to manage your data
				</Heading>
			</Box>
		</AbsoluteCenter>
	)
}

export default Body