"use client";
import { hotelService } from "@/services/hotelService";
import { HotelDTO, PagedResponse } from "@/types/hotel";
import React, { createContext, useContext, useState, useCallback } from "react";

export interface Sorting {
	sortBy: string;
	sortDir: string;
}

const LoadingContext = createContext({
	isLoading: true,
	showLoading: () => { },
	hideLoading: () => { },
	fetchHotels: async (page = 0, size = 5, sortBy = 'id', sortDir = 'asc') => { },
	pageInfo: {} as PagedResponse<HotelDTO>,
	hotels: new Array<HotelDTO>(),
	updateHotels: (hotelsList: HotelDTO[]) => { },
	updatePageInfo: (pagedInfo: PagedResponse<HotelDTO>) => { },
	sorting: {} as Sorting,
	updateSorting: (sorting: Sorting) => { }
});

export function LoadingProvider({ children }: { children: React.ReactNode }) {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [sorting, setSorting] = useState<Sorting>({
		sortBy: "id",
		sortDir: "asc",
	})
	const [hotels, setHotels] = useState<HotelDTO[]>([]);
	const [pageInfo, setPageInfo] = useState<PagedResponse<HotelDTO>>({
		pageNumber: 0,
		pageSize: 5
	} as PagedResponse<HotelDTO>);

	const showLoading = useCallback(() => setIsLoading(true), []);
	const hideLoading = useCallback(() => setIsLoading(false), []);
	const updateHotels = useCallback((hotelsList: HotelDTO[]) => setHotels(hotelsList), [])
	const updatePageInfo = useCallback((pageInfo: PagedResponse<HotelDTO>) => setPageInfo(pageInfo), [])
	const updateSorting = useCallback((sorting: Sorting) => setSorting(sorting), [])

	const fetchHotels = useCallback(async (page = 0, size = 5, sortBy = sorting.sortBy, sortDir = sorting.sortDir) => {
		setIsLoading(true)
		try {
			const response = await hotelService.getAll(page, size, sortBy, sortDir);
			setHotels(response.content)
			setPageInfo(response)
			setIsLoading(false)
		}
		catch (e) {
			console.log(e)
			setIsLoading(false)
		}
	}, [sorting.sortBy, sorting.sortDir])

	return (
		<LoadingContext.Provider
			value={{
				isLoading,
				showLoading,
				hideLoading,
				fetchHotels,
				hotels,
				updateHotels,
				pageInfo,
				updatePageInfo,
				sorting,
				updateSorting
			}}>
			{children}
		</LoadingContext.Provider>
	);
}

export function useLoading() {
	const context = useContext(LoadingContext);
	if (!context) {
		throw new Error("useLoading must be used inside of LoadingProvider");
	}
	return context;
}
