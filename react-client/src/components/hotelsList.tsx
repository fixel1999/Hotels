import { useAuth } from '@/context/authContext';
import { useLoading } from '@/context/loadingContext';
import { hotelService } from '@/services/hotelService';
import { HotelDTO } from '@/types/hotel';
import {
	Box,
	Button,
	ButtonGroup,
	CloseButton,
	createListCollection,
	Dialog,
	Heading,
	HStack,
	IconButton,
	Pagination,
	Portal,
	Select,
	Stack,
	Table,
	useDisclosure
} from '@chakra-ui/react'
import { Saira } from 'next/font/google';
import React, { useCallback, useEffect, useState } from 'react'
import { IoTrash } from 'react-icons/io5';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { MdEdit } from 'react-icons/md';
import { toaster } from './ui/toaster';
import { AxiosError } from 'axios';

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
					{hotels.map((h) => (
						<Table.Row key={`${h.id}-${h.name}-${h.address.zipCode}`} >
							<Table.Cell p={4}>{h.name}</Table.Cell>
							<Table.Cell px={4} textAlign={"center"}>{h.category}</Table.Cell>
							<Table.Cell px={4}>{h.address.street}</Table.Cell>
							<Table.Cell px={4}>{h.address.city}</Table.Cell>
							<Table.Cell px={4} textAlign={"center"}>{h.address.country}</Table.Cell>
							<Table.Cell px={4} textAlign={"center"}>{h.address.zipCode}</Table.Cell>
							<Table.Cell align='center'>
								<HStack gap={2} justifyContent={"center"} align={"center"}>
									<IconButton
										variant={'outline'}
										colorPalette={'green'}
									>
										<MdEdit />
									</IconButton>
									<DeleteHotel hotel={h} />
								</HStack>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>

			{hotels.length === 0 && <NothingToShow />}


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