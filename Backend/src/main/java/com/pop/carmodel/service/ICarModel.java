package com.pop.carmodel.service;

import com.pop.carmodel.dto.AddCarDTO;
import com.pop.carmodel.dto.CarDataDTO;

import java.util.List;

public interface ICarModel {

    boolean saveCar(AddCarDTO data);
    List<CarDataDTO> getListCar(long userId);
}
