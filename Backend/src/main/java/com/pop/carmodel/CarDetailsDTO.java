package com.pop.carmodel;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CarDetailsDTO {
    private double engineCapacity;
    private double height;
    private double length;
    private double weight;
    private double width;
    private String make;
    private String model;
    private int productionYear;
    private CarType type;
}
