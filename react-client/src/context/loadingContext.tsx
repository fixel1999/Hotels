"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

const LoadingContext = createContext({
	isLoading: true,
	showLoading: () => { },
	hideLoading: () => { }
});

export function LoadingProvider({ children }: { children: React.ReactNode }) {
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const showLoading = useCallback(() => setIsLoading(true), []);
	const hideLoading = useCallback(() => setIsLoading(false), []);

	return (
		<LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
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
