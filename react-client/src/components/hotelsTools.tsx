import React, { useMemo } from 'react'
import { hotelSchema, HotelSchema } from '@/validation/hotelSchema'
import { Box, Button, Dialog, Field, Fieldset, Heading, HStack, IconButton, Input, Portal, useDisclosure, VStack } from '@chakra-ui/react'
import { Saira } from 'next/font/google'
import { IoAdd, IoSearch } from 'react-icons/io5'
import { toaster } from './ui/toaster'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { hotelService } from '@/services/hotelService'
import { HotelDTO } from '@/types/hotel'
import { useLoading } from '@/context/loadingContext'
import { BsDatabaseFillAdd } from 'react-icons/bs'

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
	const { open, setOpen } = useDisclosure();
	const { showLoading, hideLoading, fetchHotels, pageInfo } = useLoading()

	const createHotel = async (hotelSchema: HotelSchema) => {
		const hotel: HotelDTO = {
			name: hotelSchema.name,
			category: hotelSchema.category,
			address: {
				street: hotelSchema.address.street,
				city: hotelSchema.address.city,
				country: hotelSchema.address.country,
				zipCode: hotelSchema.address.zipCode
			}
		}
		const newHotel = await hotelService.create(hotel);
		return newHotel;
	}

	const handleCreate = async (data: HotelSchema) => {
		showLoading();
		try {
			await createHotel(data);
			await fetchHotels(pageInfo.pageNumber, pageInfo.pageSize);
			toaster.create({
				title: "Success!",
				description: "Hotel created successfully",
				type: "success",
				duration: 3000,
			});
			reset()
			setOpen(false)
			hideLoading()
		}
		catch (error) {
			toaster.create({
				title: "Error",
				description: error?.message || "Unknown error",
				type: "error",
				duration: 3000,
			});
			hideLoading()
		}
	};

	return <Dialog.Root
		placement={"center"}
		motionPreset={"slide-in-bottom"}
		lazyMount
		unmountOnExit
		onExitComplete={reset}
		open={open}
		onOpenChange={(e) => setOpen(e.open)}
	>
		<Dialog.Trigger asChild>
			<IconButton onClick={() => setOpen(true)}
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
									colorPalette={'green'}
									loading={isSubmitting}
									type="submit"
									width="full"
								>
									Create
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

const PopulateDb = ({ data }: { data: HotelDTO[] }) => {

	const { showLoading, fetchHotels, pageInfo, hideLoading } = useLoading()

	const handlePopulateDb = async () => {
		showLoading();

		for (let i = 0; i < data.length; i++) {
			const hotel = data[i];
			try {
				await hotelService.create(hotel)
			}
			catch {
				console.log("Error creating", hotel)
			}
		}

		await fetchHotels(pageInfo.pageNumber, pageInfo.pageSize)
		toaster.create({
			title: "Success!",
			description: "DB populated successfully",
			type: "success",
			duration: 3000,
		});
		hideLoading()
	}

	return <IconButton
		variant={"outline"}
		onClick={handlePopulateDb}
	>
		<BsDatabaseFillAdd />
	</IconButton>
}

const HotelTools = () => {
	const fakeHotels = useMemo(() => [
		{
			id: 1,
			name: "Hotel Gran Canaria",
			category: 5,
			address: {
				street: "Av. de Las Canteras 123",
				city: "Las Palmas de Gran Canaria",
				country: "España",
				zipCode: "35010",
			},
		},
		{
			id: 2,
			name: "Hotel Costa del Sol",
			category: 4,
			address: {
				street: "Paseo Marítimo 45",
				city: "Málaga",
				country: "España",
				zipCode: "29016",
			},
		},
		{
			id: 3,
			name: "Hotel Montserrat",
			category: 3,
			address: {
				street: "Carrer de la Abadía 8",
				city: "Barcelona",
				country: "España",
				zipCode: "08035",
			},
		},
		{
			id: 4,
			name: "Hotel Prado Palace",
			category: 5,
			address: {
				street: "Calle de Felipe IV 6",
				city: "Madrid",
				country: "España",
				zipCode: "28014",
			},
		},
		{
			id: 5,
			name: "Hotel Atlántico",
			category: 4,
			address: {
				street: "Rúa do Mar 22",
				city: "A Coruña",
				country: "España",
				zipCode: "15001",
			},
		},
		{
			id: 6,
			name: "Hotel Sierra Nevada",
			category: 3,
			address: {
				street: "Av. de la Montaña 55",
				city: "Granada",
				country: "España",
				zipCode: "18008",
			},
		},
		{
			id: 7,
			name: "Hotel Valencia Beach",
			category: 4,
			address: {
				street: "Calle del Mediterráneo 120",
				city: "Valencia",
				country: "España",
				zipCode: "46011",
			},
		},
		{
			id: 8,
			name: "Hotel Bilbao Center",
			category: 4,
			address: {
				street: "Plaza Moyúa 3",
				city: "Bilbao",
				country: "España",
				zipCode: "48009",
			},
		},
		{
			id: 9,
			name: "Hotel Sevilla Real",
			category: 5,
			address: {
				street: "Av. de la Constitución 25",
				city: "Sevilla",
				country: "España",
				zipCode: "41004",
			},
		},
		{
			id: 10,
			name: "Hotel Santiago View",
			category: 3,
			address: {
				street: "Rúa do Franco 19",
				city: "Santiago de Compostela",
				country: "España",
				zipCode: "15702",
			},
		},
		{
			id: 11,
			name: "Hotel Córdoba Patio",
			category: 4,
			address: {
				street: "Calle de las Flores 7",
				city: "Córdoba",
				country: "España",
				zipCode: "14003",
			},
		},
		{
			id: 12,
			name: "Hotel Zaragoza Plaza",
			category: 3,
			address: {
				street: "Paseo de la Independencia 10",
				city: "Zaragoza",
				country: "España",
				zipCode: "50004",
			},
		},
		{
			id: 13,
			name: "Hotel Toledo Imperial",
			category: 4,
			address: {
				street: "Calle del Alcázar 14",
				city: "Toledo",
				country: "España",
				zipCode: "45001",
			},
		},
		{
			id: 14,
			name: "Hotel Oviedo Park",
			category: 3,
			address: {
				street: "Calle Uría 60",
				city: "Oviedo",
				country: "España",
				zipCode: "33003",
			},
		},
		{
			id: 15,
			name: "Hotel Burgos Catedral",
			category: 4,
			address: {
				street: "Plaza Santa María 9",
				city: "Burgos",
				country: "España",
				zipCode: "09003",
			},
		},
		{
			id: 16,
			name: "Hotel Salamanca Plaza Mayor",
			category: 5,
			address: {
				street: "Plaza Mayor 12",
				city: "Salamanca",
				country: "España",
				zipCode: "37002",
			},
		},
		{
			id: 17,
			name: "Hotel Pamplona Camino",
			category: 3,
			address: {
				street: "Av. de Navarra 18",
				city: "Pamplona",
				country: "España",
				zipCode: "31002",
			},
		},
		{
			id: 18,
			name: "Hotel Alicante Marina",
			category: 4,
			address: {
				street: "Paseo de la Explanada 5",
				city: "Alicante",
				country: "España",
				zipCode: "03001",
			},
		},
		{
			id: 19,
			name: "Hotel León Dorado",
			category: 3,
			address: {
				street: "Av. de la Catedral 9",
				city: "León",
				country: "España",
				zipCode: "24003",
			},
		},
		{
			id: 20,
			name: "Hotel Tenerife Sur",
			category: 5,
			address: {
				street: "Av. del Atlántico 101",
				city: "Santa Cruz de Tenerife",
				country: "España",
				zipCode: "38003",
			},
		},
	], [])

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
				<PopulateDb data={fakeHotels} />
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