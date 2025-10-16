package com.fixel1999.hotelsapi.model;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Embeddable
public class Address {
    private String street;
    private String city;
    private String country;
    private String zipCode;
}