import { api } from './api';
import { AddressDTO, HotelDTO, PagedResponse } from '@/types/hotel';

export const hotelService = {
    getAll: async (page = 0, size = 5, sortBy = 'id', sortDir = 'asc', city = ''): Promise<PagedResponse<HotelDTO>> => {
        const response = await api.get('/hotels', {
            params: { page, size, sortBy, sortDir, city }
        });
        const pagedResponse = {
            content: response.data.content,
            pageNumber: response.data.number,
            pageSize: response.data.size,
            totalElements: response.data.totalElements,
            totalPages: response.data.totalPages,

        } as PagedResponse<HotelDTO>;
        return pagedResponse;
    },

    create: async (hotel: Omit<HotelDTO, 'id'>): Promise<HotelDTO> => {
        const response = await api.post('/hotels', hotel);
        return response.data;
    },

    updateAddress: async (id: number, address: AddressDTO): Promise<HotelDTO> => {
        const response = await api.put(`hotels/updateAddress/${id}`, address);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`/hotels/delete/${id}`);
    },
};