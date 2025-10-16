package com.fixel1999.hotelsapi.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer category;

    @Embedded
    private Address address;
}