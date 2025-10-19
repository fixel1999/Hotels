package com.fixel1999.hotelsapi.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

public record HotelDTO(
        @NotBlank(message = "Hotel name cannot be blank")
        @Size(max = 50)
        String name,

        @Min(value = 1, message = "Hotel category must be from 1 to 5")
        @Max(value = 5, message = "Hotel category must be from 1 to 5")
        Integer category,

        @NotNull(message = "Address cannot be null")
        @Valid
        AddressDTO address
) {}
