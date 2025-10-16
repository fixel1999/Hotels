package com.fixel1999.hotelsapi.dto;

import jakarta.validation.constraints.*;

public record HotelDTO(
        @NotBlank @Size(max = 100) String name,
        @Min(1) @Max(5) Integer category,
        @NotBlank String street,
        @NotBlank String city,
        @NotBlank String country,
        @NotBlank String zipCode
) {}
