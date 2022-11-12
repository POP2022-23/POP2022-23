package com.pop.carmodel.service;

import com.pop.carmodel.dto.CepikCarDTO;

public interface ICepik {

    CepikCarDTO getCarFromCepik(String registrationNumber, String vin);
}
