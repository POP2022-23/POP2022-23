package com.pop.CarModel;

public class BasicCarModel implements ICarModel {

    private Object dataBase;

    @Override
    public boolean saveCar(CarDataDTO data) {
        return false;
    }
}
