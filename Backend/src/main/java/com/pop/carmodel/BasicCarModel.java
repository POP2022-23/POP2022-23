package com.pop.carmodel;

public class BasicCarModel implements ICarModel {

    private Object dataBase;

    @Override
    public boolean saveCar(CarDataDTO data) {
        return false;
    }
}
