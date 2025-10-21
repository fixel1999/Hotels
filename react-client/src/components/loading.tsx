"use client";
import React from "react";
import {
	Flex,
	Heading,
	Highlight,
	Spinner,
} from "@chakra-ui/react";
import { useLoading } from "@/context/loadingContext";
import { Saira } from "next/font/google";

const saira = Saira({
	subsets: ['latin']
})

export default function GlobalLoading() {
	const { isLoading } = useLoading();

	return (isLoading && (
		<Flex
			position="fixed"
			top={0}
			left={0}
			w="100vw"
			h="100vh"
			zIndex={9999}
			bg={"#ceffde"}
			backdropFilter="blur(5px)"
			align="center"
			justify="center"
			direction="column"
			color={"green.500"}
			gap={5}
		>
			<Heading className={saira.className} size={"5xl"} cursor={"pointer"} color={"#031621"}>
				<Highlight query="Hotels" styles={{ color: "green.500" }}>Hotels Management</Highlight>
			</Heading>
			<Spinner
				size="xl"
				borderWidth={'4px'}
				animationDuration={"0.5s"}
			/>
		</Flex>
	));
}
