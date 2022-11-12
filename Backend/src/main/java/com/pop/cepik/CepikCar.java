package com.pop.cepik;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CepikCar {
    private String registrationNumber;
    private String vin;
    private double engineCapacity;
    private double height;
    private double length;
    private String make;
    private String model;
    private int productionYear;
    private String carType;
    private double weight;
    private double width;
}