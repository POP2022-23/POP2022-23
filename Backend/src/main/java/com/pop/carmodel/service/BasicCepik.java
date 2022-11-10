package com.pop.carmodel.service;

import com.pop.carmodel.dto.CepikCarDTO;
import com.pop.cepik.CepikCar;
import com.pop.cepik.CepikMockController;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BasicCepik implements ICepik {

    private final CepikMockController cepikController;

    @Override
    public CepikCarDTO getCarFromCepik(String registrationNumber, String vin) {
        CepikCar cepikCar = cepikController.getCar(registrationNumber, vin);
        if(cepikCar == null) {
            throw new IllegalArgumentException("No car with given registration or vin");
        }
        return new CepikCarDTO(cepikCar);
    }
}
