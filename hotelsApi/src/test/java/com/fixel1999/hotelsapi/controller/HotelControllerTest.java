package com.fixel1999.hotelsapi.controller;

import com.fixel1999.hotelsapi.dto.AddressDTO;
import com.fixel1999.hotelsapi.dto.HotelDTO;
import com.fixel1999.hotelsapi.model.Address;
import com.fixel1999.hotelsapi.model.Hotel;
import com.fixel1999.hotelsapi.security.SecurityConfig;
import com.fixel1999.hotelsapi.security.jwt.JwtAuthenticationFilter;
import com.fixel1999.hotelsapi.service.HotelService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.reset;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = HotelController.class,
        excludeFilters = {
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, value = SecurityConfig.class),
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, value = JwtAuthenticationFilter.class)
        })
@AutoConfigureMockMvc(addFilters = false)

class HotelControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private HotelService hotelService;

    @BeforeEach
    void setUp() {
        reset(hotelService);
    }

    @Test
    void shouldReturnListOfHotels() throws Exception {
        Address address1 = new Address();
        address1.setStreet("Street1");
        address1.setCity("City1");
        address1.setCountry("Country1");
        address1.setZipCode("12345");

        Address address2 = new Address();
        address2.setStreet("Street2");
        address2.setCity("City2");
        address2.setCountry("Country2");
        address2.setZipCode("67890");

        Hotel hotel1 = new Hotel();
        hotel1.setName("Hotel Paradise");
        hotel1.setCategory(3);
        hotel1.setAddress(address1);

        Hotel hotel2 = new Hotel();
        hotel2.setName("Hotel Mars");
        hotel2.setCategory(5);
        hotel2.setAddress(address2);

        List<Hotel> hotels = Arrays.asList(hotel1, hotel2);
        Page<Hotel> page = new PageImpl<>(hotels);

        when(hotelService.getAll(0, 5, "id", "asc", "")).thenReturn(page);

        mockMvc.perform(get("/api/hotels")
                        .param("page", "0")
                        .param("size", "5")
                        .param("sortBy", "id")
                        .param("sortDir", "asc")
                        .param("city", "")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].name").value("Hotel Paradise"))
                .andExpect(jsonPath("$.content[1].address.city").value("City2"));
    }

    @Test
    void shouldCreateHotel() throws Exception {
        HotelDTO request = new HotelDTO("Hotel Paradise", 3, new AddressDTO("Street1", "City1", "Country1", "12345"));

        Address address1 = new Address();
        address1.setStreet("Street1");
        address1.setCity("City1");
        address1.setCountry("Country1");
        address1.setZipCode("12345");

        Hotel response = new Hotel();
        response.setName("Hotel Paradise");
        response.setCategory(3);
        response.setAddress(address1);
        when(hotelService.createHotel(request)).thenReturn(response);

        mockMvc.perform(post("/api/hotels")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Hotel Paradise"));
    }

    @Test
    void shouldUpdateHotel() throws Exception {
        Address oldAddress = new Address();
        oldAddress.setStreet("Street1");
        oldAddress.setCity("City1");
        oldAddress.setCountry("Country1");
        oldAddress.setZipCode("12345");

        Hotel hotel1 = new Hotel();
        hotel1.setName("Hotel Paradise");
        hotel1.setCategory(3);
        hotel1.setAddress(oldAddress);

        HotelDTO request = new HotelDTO("Hotel Paradise", 3, new AddressDTO("Street1", "City1", "Country1", "12345"));

        when(hotelService.createHotel(request)).thenReturn(hotel1);

        Address address1 = new Address();
        address1.setStreet("StreetUpdated");
        address1.setCity("CityUpdated");
        address1.setCountry("CountryUpdated");
        address1.setZipCode("67890");

        hotel1.setAddress(address1);

        when(hotelService.updateAddress(1L, address1)).thenReturn(hotel1);

        mockMvc.perform(post("/api/hotels")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Hotel Paradise"));

        mockMvc.perform(put("/api/hotels/updateAddress/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(address1)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Hotel Paradise"))
                .andExpect(jsonPath("$.address.city").value("CityUpdated"))
                .andExpect(jsonPath("$.address.zipCode").value("67890"));
    }

    @Test
    void shouldDeleteHotel() throws Exception {
        HotelDTO request = new HotelDTO("Hotel Paradise", 3, new AddressDTO("Street1", "City1", "Country1", "12345"));

        Address address1 = new Address();
        address1.setStreet("Street1");
        address1.setCity("City1");
        address1.setCountry("Country1");
        address1.setZipCode("12345");

        Hotel response = new Hotel();
        response.setName("Hotel Paradise");
        response.setCategory(3);
        response.setAddress(address1);
        when(hotelService.createHotel(request)).thenReturn(response);

        mockMvc.perform(post("/api/hotels")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Hotel Paradise"));

        mockMvc.perform(delete("/api/hotels/delete/1"))
                .andExpect(status().isNoContent());
    }
}
