export interface AddressDTO {
    street: string;
    city: string;
    country: string;
    zipCode: string;
}

export interface HotelDTO {
    id: number;
    name: string;
    category: number;
    address: AddressDTO;
}

export interface PagedResponse<T> {
    content: T[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
}