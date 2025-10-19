package com.fixel1999.hotelsapi.dto;

import jakarta.validation.constraints.*;

public record AddressDTO(
        @NotBlank(message = "Street cannot be blank")
        String street,
        @NotBlank(message = "City cannot be blank")
        String city,
        @NotBlank(message = "Country cannot be blank")
        String country,
        @NotBlank(message = "Zip code cannot be blank")
        String zipCode
) {}
