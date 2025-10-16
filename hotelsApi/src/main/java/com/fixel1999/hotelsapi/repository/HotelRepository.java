package com.fixel1999.hotelsapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fixel1999.hotelsapi.model.Hotel;

import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
    List<Hotel> findByAddress_IgnoreCaseCity(String city);
   }



