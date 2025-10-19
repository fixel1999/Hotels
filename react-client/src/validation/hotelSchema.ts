import { z } from 'zod'

export const addressSchema = z.object({
	street: z
		.string()
		.min(1, "Street is required")
		.max(100, "Street field must have less than 100 chars"),
	city: z
		.string()
		.min(1, "City is required")
		.max(30, "City must have less than 30 chars"),
	country: z
		.string()
		.min(1, "Country is required")
		.max(30, "Country must have less than 30 chars"),
	zipCode: z
		.string()
		.min(3, "Zip Code must have at least 3 chars")
		.max(10, "Zip Code must have less than 10 chars"),
});

export const hotelSchema = z.object({
	id: z.number().optional(),
	name: z
		.string()
		.min(1, "Hotel name is required")
		.max(30, "Hotel name must have less than 30 chars"),
	category: z
		.int("Category must be a number")
		.min(1, "Category is required")
		.max(5, "Category must be from 1 to 5"),
	address: addressSchema,
});

export type AddressSchema = z.infer<typeof addressSchema>;
export type HotelSchema = z.infer<typeof hotelSchema>;