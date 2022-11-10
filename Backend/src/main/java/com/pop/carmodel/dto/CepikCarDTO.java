package com.pop.carmodel.dto;

import com.pop.cepik.CepikCar;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CepikCarDTO {
    private String registrationNumber;
    private double engineCapacity;
    private double height;
    private double length;
    private String make;
    private String model;
    private int productionYear;
    private String carType;
    private double weight;
    private double width;

    public CepikCarDTO(CepikCar car) {
        this.registrationNumber = car.getRegistrationNumber();
        this.engineCapacity = car.getEngineCapacity();
        this.height = car.getHeight();
        this.length = car.getLength();
        this.make = car.getMake();
        this.model = car.getModel();
        this.productionYear = car.getProductionYear();
        this.carType = car.getCarType();
        this.weight = car.getWeight();
        this.width = car.getWidth();
    }
}
