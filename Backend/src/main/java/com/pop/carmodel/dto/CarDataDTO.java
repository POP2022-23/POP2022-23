package com.pop.carmodel.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CarDataDTO {
    private long driverId;
    private long ownerId;
    private long id;
    private String registrationNumber;
    private CarDetailsDTO details;
}
