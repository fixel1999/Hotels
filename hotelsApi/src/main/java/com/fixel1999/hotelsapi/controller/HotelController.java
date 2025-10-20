package com.fixel1999.hotelsapi.controller;

import com.fixel1999.hotelsapi.model.Address;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.fixel1999.hotelsapi.dto.HotelDTO;
import com.fixel1999.hotelsapi.service.HotelService;
import com.fixel1999.hotelsapi.model.Hotel;


import java.util.List;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {

    private final HotelService hotelService;

    public HotelController(HotelService service) {
        this.hotelService = service;
    }

    @PostMapping
    public ResponseEntity<Hotel> createHotel(@Valid @RequestBody HotelDTO hotelDto) {
        return ResponseEntity.ok(hotelService.createHotel(hotelDto));
    }

    @GetMapping
    public ResponseEntity<Page<Hotel>> listHotels(@RequestParam(defaultValue = "0") int page,
                                                  @RequestParam(defaultValue = "5") int size,
                                                  @RequestParam(defaultValue = "id") String sortBy,
                                                  @RequestParam(defaultValue = "asc") String sortDir,
                                                  @RequestParam(defaultValue = "") String city) {
        Page<Hotel> hotels = hotelService.getAll(page, size, sortBy, sortDir, city);
        return ResponseEntity.ok(hotels);
    }


    @PutMapping("/updateAddress/{id}")
    public ResponseEntity<Hotel> updateAddress(@PathVariable Long id, @RequestBody Address address) {
        return ResponseEntity.ok(hotelService.updateAddress(id, address));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        hotelService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
