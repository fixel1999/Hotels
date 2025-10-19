"use client";
import { hotelService } from "@/services/hotelService";
import { HotelDTO, PagedResponse } from "@/types/hotel";
import React, { createContext, useContext, useState, useCallback } from "react";

const LoadingContext = createContext({
	isLoading: true,
	showLoading: () => { },
	hideLoading: () => { },
	fetchHotels: async (page = 0, size = 5, sortBy = 'id', sortDir = 'asc') => { },
	pageInfo: {} as PagedResponse<HotelDTO>,
	hotels: new Array<HotelDTO>(),
	updateHotels: (hotelsList: HotelDTO[]) => { }
});

export function LoadingProvider({ children }: { children: React.ReactNode }) {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [hotels, setHotels] = useState<HotelDTO[]>([]);
	const [pageInfo, setPageInfo] = useState<PagedResponse<HotelDTO>>({
		pageNumber: 0,
		pageSize: 5
	} as PagedResponse<HotelDTO>);

	const showLoading = useCallback(() => setIsLoading(true), []);
	const hideLoading = useCallback(() => setIsLoading(false), []);
	const updateHotels = useCallback((hotelsList: HotelDTO[]) => setHotels(hotelsList), [])

	const fetchHotels = useCallback(async (page = 0, size = 5, sortBy = 'id', sortDir = 'asc') => {
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
	}, [])

	return (
		<LoadingContext.Provider value={{ isLoading, showLoading, hideLoading, fetchHotels, hotels, updateHotels, pageInfo }}>
			{children}
		</LoadingContext.Provider>
	);
}

export function useLoading() {
	const context = useContext(LoadingContext);
	if (!context) {
		throw new Error("useLoading debe usarse dentro de un LoadingProvider");
	}
	return context;
}
