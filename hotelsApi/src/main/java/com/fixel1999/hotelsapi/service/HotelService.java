package com.fixel1999.hotelsapi.service;

import com.fixel1999.hotelsapi.model.Address;
import com.fixel1999.hotelsapi.model.Hotel;
import com.fixel1999.hotelsapi.repository.HotelRepository;
import com.fixel1999.hotelsapi.dto.HotelDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
        Address address = new Address();
        address.setStreet(dto.address().street());
        address.setCity(dto.address().city());
        address.setCountry(dto.address().country());
        address.setZipCode(dto.address().zipCode());
        h.setAddress(address);

        return hotelRepo.save(h);
    }

    public Page<Hotel> getAll(int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);
        return hotelRepo.findAll(pageable);
    }

    public Page<Hotel> findByCity(String city, int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return hotelRepo.findByAddress_IgnoreCaseCity(city, pageable);
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
