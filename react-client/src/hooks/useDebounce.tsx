import { useEffect, useState } from "react";

/**
 * Retorna un valor que se actualiza solo después de un retraso determinado.
 * @param value Valor que se va a debouncear
 * @param delay Tiempo de espera (ms)
 */
export function useDebounce<T>(value: T, delay = 500): T {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => clearTimeout(timeout);
	}, [value, delay]);

	return debouncedValue;
}