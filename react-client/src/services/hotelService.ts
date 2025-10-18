import { api } from './api';
import { HotelDTO } from '@/types/hotel';

export const hotelService = {
    getAll: async (): Promise<HotelDTO[]> => {
        const response = await api.get('/hotels');
        return response.data;
    },

    create: async (hotel: Omit<HotelDTO, 'id'>): Promise<HotelDTO> => {
        const response = await api.post('/hotels', hotel);
        return response.data;
    },

    updateAddress: async (id: number, address: HotelDTO['address']): Promise<HotelDTO> => {
        const response = await api.put(`/updateAddress/${id}`, address);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`/hotels/${id}`);
    },

    findByCity: async (city: string): Promise<HotelDTO[]> => {
        const response = await api.get(`/hotels/findByCity/${city}`);
        return response.data;
    },
};