import { useAuth } from '@/context/authContext';
import { useLoading } from '@/context/loadingContext';
import { hotelService } from '@/services/hotelService';
import { HotelDTO } from '@/types/hotel';
import {
	Box,
	Button,
	ButtonGroup,
	Center,
	CloseButton,
	createListCollection,
	Dialog,
	Field,
	Fieldset,
	Heading,
	HStack,
	IconButton,
	Input,
	Pagination,
	Portal,
	Select,
	Stack,
	Table,
	useDisclosure,
	VStack
} from '@chakra-ui/react'
import { Saira } from 'next/font/google';
import React, { useCallback, useEffect, useState } from 'react'
import { IoTrash } from 'react-icons/io5';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { MdEdit } from 'react-icons/md';
import { toaster } from './ui/toaster';
import { AxiosError } from 'axios';
import { addressSchema, AddressSchema } from '@/validation/hotelSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const saira = Saira({
	subsets: ['latin']
})

const NothingToShow = () => {
	return <Box
		w={"60vw"} p={10}
		borderWidth={'2px'}
		bgColor={"green.50"}
		borderColor={"green.600"}
		borderRadius={'xl'}
		textAlign={"center"}
		mx={"auto"}
	>
		<Heading fontSize={'2xl'}
			className={saira.className}
		>
			There is nothing to show. Tap + to create a new hotel or populate the DB.
		</Heading>
	</Box>
}

const EditAddress = ({ hotel }: { hotel: HotelDTO }) => {
	const { open, setOpen } = useDisclosure();
	const { fetchHotels, pageInfo } = useLoading();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<AddressSchema>({
		resolver: zodResolver(addressSchema),
		mode: 'onBlur',
	});

	const handleEdit = async (data: AddressSchema) => {
		if (data.city !== hotel.address.city ||
			data.country !== hotel.address.country ||
			data.street !== hotel.address.street ||
			data.zipCode !== hotel.address.zipCode) {

			try {
				await hotelService.updateAddress(hotel.id, data)
				setOpen(false);
				await fetchHotels(pageInfo.pageNumber, pageInfo.pageSize)
				toaster.create({
					title: "Success",
					description: "Hotel address edited successfully",
					type: "success",
					duration: 3000,
				})
			} catch (e) {
				const error = e as AxiosError;
				toaster.create({
					title: "Error",
					description: "Error editing hotel address. " + (error?.message || "Unknown error"),
					type: "error",
					duration: 3000,
				})
			}
		} else {
			toaster.create({
				title: "Error",
				description: "Nothing to edit",
				type: "error",
				duration: 3000,
			})
		}

	}

	return (
		<Dialog.Root
			placement={"top"}
			motionPreset={"slide-in-bottom"}
			open={open}
			onOpenChange={(e) => setOpen(e.open)}
		>
			<Dialog.Trigger asChild>
				<IconButton
					variant={'outline'}
					colorPalette={'green'}
				>
					<MdEdit />
				</IconButton>
			</Dialog.Trigger>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content mt={10}>
						<Dialog.CloseTrigger />
						<Dialog.Body p={10} className={saira.className}>
							<Center>
								<Heading className={saira.className}>
									{`${hotel.name} • ${hotel.category} stars`}
								</Heading>
							</Center>
							<Box
								as="form"
								onSubmit={handleSubmit(handleEdit)}
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

											<Field.Root invalid={!!errors.street}>
												<Field.Label>Street</Field.Label>
												<Input
													defaultValue={hotel.address.street}
													{...register("street")}
													p={4}
												/>
												<Field.ErrorText>{errors.street?.message}</Field.ErrorText>
											</Field.Root>

											<Field.Root invalid={!!errors.city}>
												<Field.Label>City</Field.Label>
												<Input
													defaultValue={hotel.address.city}
													{...register("city")}
													p={4}
												/>
												<Field.ErrorText>{errors.city?.message}</Field.ErrorText>
											</Field.Root>

											<Field.Root invalid={!!errors.country}>
												<Field.Label>Country</Field.Label>
												<Input
													defaultValue={hotel.address.country}
													{...register("country")}
													p={4}
												/>
												<Field.ErrorText>{errors.country?.message}</Field.ErrorText>
											</Field.Root>

											<Field.Root invalid={!!errors.zipCode}>
												<Field.Label>Zip Code</Field.Label>
												<Input
													defaultValue={hotel.address.zipCode}
													{...register("zipCode")}
													p={4}
												/>
												<Field.ErrorText>{errors.zipCode?.message}</Field.ErrorText>
											</Field.Root>

										</Fieldset.Content>
									</Fieldset.Root>

									<Button
										colorPalette={'green'}
										loading={isSubmitting}
										type="submit"
										width="full"
									>
										Edit Address
									</Button>
								</VStack>
							</Box>
						</Dialog.Body>
						<Dialog.Footer />
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>)
}

const DeleteHotel = ({ hotel }: { hotel: HotelDTO }) => {
	const { user } = useAuth();
	const [loading, setLoading] = useState(false);
	const { open, setOpen } = useDisclosure();
	const { fetchHotels, pageInfo } = useLoading();

	const handleDeleteHotel = async () => {
		setLoading(true)
		try {
			await hotelService.delete(hotel.id)
			setOpen(false);
			await fetchHotels(pageInfo.pageNumber, pageInfo.pageSize)
			toaster.create({
				title: "Success",
				description: "Hotel deleted successfully",
				type: "success",
				duration: 3000,
			})
			setLoading(false)
		}
		catch (e) {
			const error = e as AxiosError;
			toaster.create({
				title: "Error",
				description: "Error deleting hotel. " + (error?.message || "Unknown error"),
				type: "error",
				duration: 3000,
			})
			setLoading(false)
		}
	}

	return (
		<Dialog.Root
			role="alertdialog"
			open={open}
			onOpenChange={(e) => setOpen(e.open)}
		>
			<Dialog.Trigger asChild>
				<IconButton
					variant={'outline'}
					colorPalette={'red'}
					disabled={user?.role !== 'ADMIN'}
				>
					<IoTrash />
				</IconButton>
			</Dialog.Trigger>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner mt={"5vh"}>
					<Dialog.Content p={5} gap={4}>
						<Dialog.Header>
							<Dialog.Title className={saira.className}>Are you sure?</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body className={saira.className}>
							<p>
								{`This action cannot be undone. This will permanently delete the hotel ${hotel.name}.`}
							</p>
						</Dialog.Body>
						<Dialog.Footer>
							<Dialog.ActionTrigger asChild>
								<Button p={2} variant="outline">Cancel</Button>
							</Dialog.ActionTrigger>
							<Button
								p={2} colorPalette="red"
								onClick={handleDeleteHotel}
								loading={loading}
							>
								Delete
							</Button>
						</Dialog.Footer>
						<Dialog.CloseTrigger asChild>
							<CloseButton size="sm" />
						</Dialog.CloseTrigger>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	)
}

const HotelsList = () => {
	const { hotels, pageInfo, fetchHotels } = useLoading();

	const [page, setPage] = useState(pageInfo.pageNumber + 1);
	const [pageSize, setPageSize] = useState(pageInfo.pageSize);

	const itemsPerPage = createListCollection({
		items: [
			{ label: "3 items per page", value: 3 },
			{ label: "5 items per page", value: 5 },
			{ label: "10 items per page", value: 10 },
			{ label: "20 items per page", value: 20 },
		],
	})

	const handleFetchHotels = useCallback(async () => {
		fetchHotels(page - 1, pageSize)
	}, [page, pageSize, fetchHotels])

	useEffect(() => {
		handleFetchHotels()
	}, [page, pageSize, handleFetchHotels])

	return (
		<Stack maxW={"70vw"} mb={"10vw"} mx={"auto"} className={saira.className} gap={5}>
			<Table.Root size="md" variant="outline" w={"100%"} striped rounded={'md'}>
				<Table.Header fontSize={'lg'}>
					<Table.Row>
						<Table.ColumnHeader p={5}>Name</Table.ColumnHeader>
						<Table.ColumnHeader p={5} textAlign={"center"}>Stars</Table.ColumnHeader>
						<Table.ColumnHeader p={5}>Street</Table.ColumnHeader>
						<Table.ColumnHeader p={5}>City</Table.ColumnHeader>
						<Table.ColumnHeader p={5} textAlign={"center"}>Country</Table.ColumnHeader>
						<Table.ColumnHeader p={5} textAlign={"center"}>Zip Code</Table.ColumnHeader>
						<Table.ColumnHeader p={5} textAlign={"center"}>Actions</Table.ColumnHeader>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{hotels?.map((h) => (
						<Table.Row key={`${h.id}-${h.name}-${h.address.zipCode}`} >
							<Table.Cell p={4}>{h.name}</Table.Cell>
							<Table.Cell px={4} textAlign={"center"}>{h.category}</Table.Cell>
							<Table.Cell px={4}>{h.address.street}</Table.Cell>
							<Table.Cell px={4}>{h.address.city}</Table.Cell>
							<Table.Cell px={4} textAlign={"center"}>{h.address.country}</Table.Cell>
							<Table.Cell px={4} textAlign={"center"}>{h.address.zipCode}</Table.Cell>
							<Table.Cell align='center'>
								<HStack gap={2} justifyContent={"center"} align={"center"}>
									<EditAddress hotel={h} />
									<DeleteHotel hotel={h} />
								</HStack>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>

			{hotels?.length === 0 && <NothingToShow />}


			<HStack justifyContent={"space-between"}>

				<Pagination.Root
					count={pageInfo.totalElements}
					pageSize={pageSize}
					page={page}
					siblingCount={2}
					onPageChange={e => setPage(e.page)}
				>
					<ButtonGroup variant="ghost" size="sm" wrap="wrap">
						<Pagination.PrevTrigger asChild>
							<IconButton>
								<LuChevronLeft />
							</IconButton>
						</Pagination.PrevTrigger>

						<Pagination.Items
							render={(page) =>
							(<IconButton
								variant={{ base: "ghost", _selected: "outline" }}
							>
								{page.value}
							</IconButton>
							)
							}
						/>
						<Pagination.NextTrigger asChild>
							<IconButton>
								<LuChevronRight />
							</IconButton>
						</Pagination.NextTrigger>
					</ButtonGroup>
				</Pagination.Root>

				<Select.Root
					collection={itemsPerPage}
					size="sm" width="200px"
					multiple={false}
					value={[pageSize]}
					onValueChange={(e) => setPageSize(e.value[0])}
				>
					<Select.HiddenSelect />
					<Select.Control>
						<Select.Trigger p={2}>
							<Select.ValueText placeholder="Select items per page" />
						</Select.Trigger>
						<Select.IndicatorGroup>
							<Select.Indicator />
						</Select.IndicatorGroup>
					</Select.Control>
					<Portal>
						<Select.Positioner>
							<Select.Content>
								{itemsPerPage.items.map((item) => (
									<Select.Item item={item} key={item.value}>
										{item.label} per page
										<Select.ItemIndicator />
									</Select.Item>
								))}
							</Select.Content>
						</Select.Positioner>
					</Portal>
				</Select.Root>

			</HStack>
		</Stack >
	)
}

export default HotelsList