import React from 'react'
import { hotelSchema, HotelSchema } from '@/validation/hotelSchema'
import { Box, Button, Dialog, Field, Fieldset, Heading, HStack, IconButton, Input, Portal, VStack } from '@chakra-ui/react'
import { Saira } from 'next/font/google'
import { IoAdd, IoSearch } from 'react-icons/io5'
import { toaster } from './ui/toaster'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const saira = Saira({
	subsets: ['latin']
})

const CreateHotel = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<HotelSchema>({
		resolver: zodResolver(hotelSchema),
		mode: 'onBlur',
	});

	const createHotel = (hotelSchema: HotelSchema) => {
		console.log("creating hotel:", hotelSchema)
	}

	const handleCreate = async (data: HotelSchema) => {
		try {
			await createHotel(data);
			toaster.create({
				title: "Logged in successfully",
				type: "success",
				duration: 3000,
			});
		} catch (error) {
			toaster.create({
				title: "Error",
				description: error?.message || "Unknown error",
				type: "error",
				duration: 3000,
			});
		}
	};

	return <Dialog.Root
		placement={"center"}
		motionPreset={"slide-in-bottom"}
		lazyMount
		unmountOnExit
		onExitComplete={reset}
	>
		<Dialog.Trigger asChild>
			<IconButton
				variant={'outline'}>
				<IoAdd />
			</IconButton>
		</Dialog.Trigger>
		<Portal>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content p={5}>
					<Dialog.CloseTrigger />
					<Dialog.Header alignItems={"center"} justifyContent={"center"}>
						<Heading className={saira.className} fontSize={'3xl'}>
							Create new hotel
						</Heading>
					</Dialog.Header>
					<Dialog.Body p={10} pt={0} className={saira.className}>
						<Box
							as="form"
							onSubmit={handleSubmit(handleCreate)}
							p={6}
							borderWidth="1px"
							borderRadius="lg"
							shadow="md"
							bg="white"
							maxW="sm"
							mx="auto"
							mt={10}
						>
							<VStack gap={4}>
								<Fieldset.Root>
									<Fieldset.Content>
										<Field.Root invalid={!!errors.name}>
											<Field.Label>Hotel Name</Field.Label>
											<Input
												{...register("name")}
												p={4}
											/>
											<Field.ErrorText>{errors.name?.message}</Field.ErrorText>
										</Field.Root>

										<Field.Root invalid={!!errors.category}>
											<Field.Label>Category</Field.Label>
											<Input
												{...register("category", { valueAsNumber: true })}
												p={4}
												type='number'
												min={1}
												max={5}
											/>
											<Field.ErrorText>{errors.category?.message}</Field.ErrorText>
										</Field.Root>

										<Field.Root invalid={!!errors.address?.street}>
											<Field.Label>Street</Field.Label>
											<Input
												{...register("address.street")}
												p={4}
											/>
											<Field.ErrorText>{errors.address?.street?.message}</Field.ErrorText>
										</Field.Root>

										<Field.Root invalid={!!errors.address?.city}>
											<Field.Label>City</Field.Label>
											<Input
												{...register("address.city")}
												p={4}
											/>
											<Field.ErrorText>{errors.address?.city?.message}</Field.ErrorText>
										</Field.Root>

										<Field.Root invalid={!!errors.address?.country}>
											<Field.Label>Country</Field.Label>
											<Input
												{...register("address.country")}
												p={4}
											/>
											<Field.ErrorText>{errors.address?.country?.message}</Field.ErrorText>
										</Field.Root>

										<Field.Root invalid={!!errors.address?.zipCode}>
											<Field.Label>Zip Code</Field.Label>
											<Input
												{...register("address.zipCode")}
												p={4}
											/>
											<Field.ErrorText>{errors.address?.zipCode?.message}</Field.ErrorText>
										</Field.Root>

									</Fieldset.Content>
								</Fieldset.Root>

								<Button
									colorScheme="teal"
									loading={isSubmitting}
									type="submit"
									width="full"
								>
									Log in
								</Button>
							</VStack>
						</Box>
					</Dialog.Body>
					<Dialog.Footer />
				</Dialog.Content>
			</Dialog.Positioner>
		</Portal>
	</Dialog.Root>

}

const HotelTools = () => {
	return (
		<HStack
			mt={"15vh"}
			mb={4}
			maxW={"68vw"} mx={"auto"}
			justifyContent={"space-between"}
		>
			<Heading fontSize={'2xl'}
				className={saira.className}
			>
				Hotels
			</Heading>
			<HStack gap={2}>
				<CreateHotel />
				<IconButton
					variant={'outline'}>
					<IoSearch />
				</IconButton>
				<Button
					variant={'outline'}
					p={2}
					className={saira.className}
				>
					Sort By
				</Button>
			</HStack>

		</HStack>
	)
}

export default HotelTools