package com.pop.carmodel.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddCarDTO {
    private long ownerId;
    private String registrationNumber;
    private String vin;
}
