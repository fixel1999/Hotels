import {
	ButtonGroup,
	createListCollection,
	HStack,
	IconButton,
	Pagination,
	Portal,
	Select,
	Stack,
	Table
} from '@chakra-ui/react'
import { Saira } from 'next/font/google';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { IoAdd, IoPencil, IoTrash } from 'react-icons/io5';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

const saira = Saira({
	subsets: ['latin']
})

const HotelsList = () => {
	const hotels = useMemo(() => [
		{
			id: 1,
			name: "Hotel Gran Canaria",
			stars: 5,
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
			stars: 4,
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
			stars: 3,
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
			stars: 5,
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
			stars: 4,
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
			stars: 3,
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
			stars: 4,
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
			stars: 4,
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
			stars: 5,
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
			stars: 3,
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
			stars: 4,
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
			stars: 3,
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
			stars: 4,
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
			stars: 3,
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
			stars: 4,
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
			stars: 5,
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
			stars: 3,
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
			stars: 4,
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
			stars: 3,
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
			stars: 5,
			address: {
				street: "Av. del Atlántico 101",
				city: "Santa Cruz de Tenerife",
				country: "España",
				zipCode: "38003",
			},
		},
	], [])

	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [items, setItems] = useState(hotels.slice(page - 1, pageSize))

	const itemsPerPage = createListCollection({
		items: [
			{ label: "3 items per page", value: 3 },
			{ label: "5 items per page", value: 5 },
			{ label: "10 items per page", value: 10 },
			{ label: "20 items per page", value: 20 },
		],
	})

	const fetchHotels = useCallback((page: number) => {
		setItems(hotels.slice((page - 1) * pageSize, ((page - 1) * pageSize) + pageSize))
	}, [hotels, pageSize])

	useEffect(() => {
		fetchHotels(page)
	}, [page, fetchHotels])

	return (
		<Stack maxW={"70vw"} mb={"10vw"} mx={"auto"} className={saira.className} gap={5}>
			<Table.Root size="md" variant="outline" w={"100%"} striped rounded={'md'}>
				<Table.Header fontSize={'lg'}>
					<Table.Row>
						<Table.ColumnHeader p={5}>Name</Table.ColumnHeader>
						<Table.ColumnHeader p={5}>Stars</Table.ColumnHeader>
						<Table.ColumnHeader p={5}>Street</Table.ColumnHeader>
						<Table.ColumnHeader p={5}>City</Table.ColumnHeader>
						<Table.ColumnHeader p={5}>Country</Table.ColumnHeader>
						<Table.ColumnHeader p={5} textAlign={"center"}>Zip Code</Table.ColumnHeader>
						<Table.ColumnHeader p={5} textAlign={"center"}>Actions</Table.ColumnHeader>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{items.map((h) => (
						<Table.Row key={`${h.name}-${h.address.zipCode}`} >
							<Table.Cell p={4}>{h.name}</Table.Cell>
							<Table.Cell px={4} textAlign={"center"}>{h.stars}</Table.Cell>
							<Table.Cell px={4}>{h.address.street}</Table.Cell>
							<Table.Cell px={4}>{h.address.city}</Table.Cell>
							<Table.Cell px={4} textAlign={"center"}>{h.address.country}</Table.Cell>
							<Table.Cell px={4} textAlign={"center"}>{h.address.zipCode}</Table.Cell>
							<Table.Cell>
								<HStack gap={2} justifyContent={"center"} align={"center"}>
									<IconButton
										variant={'outline'}
										colorPalette={'blue'}
									>
										<IoPencil />
									</IconButton>
									<IconButton
										variant={'outline'}
										colorPalette={'red'}
									>
										<IoTrash />
									</IconButton>
								</HStack>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>

			<HStack justifyContent={"space-between"}>

				<Pagination.Root
					count={hotels.length}
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