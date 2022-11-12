package com.pop.cepik;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CepikMockController {

    private final List<CepikCar> mockedCars = List.of(
            new CepikCar("WWE 5H61", "2C3CDXCTXEH349769", 5700.0, 1.479, 5.04,
                    "Dodge", "Charger", 2014, "Sedan", 1934, 1.905),
            new CepikCar("NEL 98AM", "2HGES267X5H581074", 1700.0, 1.375, 4.395,
                    "Honda", "Civic", 2005, "Sedan", 1595, 1.695),
            new CepikCar("ZS 844WV", "3VWLL7AJ9BM053541", 1968.00, 1.459, 4.554,
                    "Volkswagen", "Jetta", 2011, "Sedan", 1411 , 1.781),
            new CepikCar("SG 3F332", "VNKKC96360A225126", 1364.0, 1.53, 3.785,
                    "Toyota", "Yaris", 2009, "Hatchback", 1055, 1.695));

    public CepikCar getCar(String registrationNumber, String vin) {
        return mockedCars
                .stream()
                .filter(car -> car.getRegistrationNumber().equals(registrationNumber) &&
                        car.getVin().equals(vin))
                .findFirst()
                .orElse(null);
    }
}
