package com.pop.carmodel;

import java.util.List;

public interface ICarModel {

    boolean saveCar(CarDataDTO data);
    List<CarDataDTO> getListCar(long userId);
}
