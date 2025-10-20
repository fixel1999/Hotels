package com.fixel1999.hotelsapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.fixel1999.hotelsapi.model.Hotel;


public interface HotelRepository extends JpaRepository<Hotel, Long> {
    Page<Hotel> findByAddress_CityContainingIgnoreCase(String city, Pageable pageable);
   }



