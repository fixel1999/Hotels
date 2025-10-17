package com.fixel1999.hotelsapi.controller;

import com.fixel1999.hotelsapi.model.Address;
import jakarta.validation.Valid;
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
    public List<Hotel> listHotels() {
        return hotelService.getAll();
    }

    @GetMapping("/findByCity/{city}")
    public List<Hotel> findByCity(@PathVariable String city) {
        return hotelService.findByCity(city);
    }

    @PutMapping("/updateAddress/{id}")
    public ResponseEntity<Hotel> updateAddress(@PathVariable Long id, @RequestBody Address address) {
        return ResponseEntity.ok(hotelService.updateAddress(id, address));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        hotelService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
