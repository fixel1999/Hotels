"use client";
import React from "react";
import {
	Flex,
	Spinner,
} from "@chakra-ui/react";
import { useLoading } from "@/context/loadingContext";


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
			bg={"#ceffdea6"}
			backdropFilter="blur(5px)"
			align="center"
			justify="center"
			direction="column"
			color={"green.500"}
		>
			<Spinner
				size="xl"
				borderWidth={'4px'}
				animationDuration={"0.5s"}
			/>
		</Flex>
	));
}
