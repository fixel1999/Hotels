package com.fixel1999.hotelsapi.service;

import com.fixel1999.hotelsapi.model.Address;
import com.fixel1999.hotelsapi.model.Hotel;
import com.fixel1999.hotelsapi.repository.HotelRepository;
import com.fixel1999.hotelsapi.dto.HotelDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {

    private final HotelRepository hotelRepo;

    public HotelService(HotelRepository repo) {
        this.hotelRepo = repo;
    }

    public Hotel createHotel(HotelDTO dto) {
        Hotel h = new Hotel();
        h.setName(dto.name());
        h.setCategory(dto.category());
        h.setAddress(new Address());
        return hotelRepo.save(h);
    }

    public List<Hotel> getAll() {
        return hotelRepo.findAll();
    }

    public List<Hotel> findByCity(String city) {
        return hotelRepo.findByAddress_IgnoreCaseCity(city);
    }

    public Hotel updateAddress(Long id, Address address) {
        Hotel h = hotelRepo.findById(id).orElseThrow();
        h.setAddress(address);
        return hotelRepo.save(h);
    }

    public void delete(Long id) {
        hotelRepo.deleteById(id);
    }
}
