package com.pop.carmodel.dto;

import com.pop.carmodel.domain.CarType;
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

    public CarDataDTO(long ownerId, CepikCarDTO cepikCar) {
        this.driverId = ownerId;
        this.ownerId = ownerId;
        this.registrationNumber = cepikCar.getRegistrationNumber();
        this.details = new CarDetailsDTO(
                cepikCar.getEngineCapacity(), cepikCar.getHeight(), cepikCar.getLength(),
                cepikCar.getWeight(), cepikCar.getWidth(), cepikCar.getMake(), cepikCar.getModel(),
                cepikCar.getProductionYear(), CarType.valueOf(cepikCar.getCarType().toUpperCase())
        );
    }
}
