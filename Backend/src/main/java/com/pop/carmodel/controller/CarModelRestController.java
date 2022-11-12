package com.pop.carmodel.controller;

import com.pop.carmodel.dto.AddCarDTO;
import com.pop.carmodel.dto.CarDataDTO;
import com.pop.carmodel.service.ICarModel;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/car")
@AllArgsConstructor
@CrossOrigin(maxAge = 3600)
public class CarModelRestController {
    private final ICarModel carModel;

    @GetMapping("/{userId}")
    public ResponseEntity<List<CarDataDTO>> getListOfCars(@PathVariable long userId) {
        try {
            List<CarDataDTO> cars = carModel.getListCar(userId);
            return ResponseEntity.ok(cars);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<Boolean> saveCar(@RequestBody AddCarDTO carData) {
        try {
            if (carModel.saveCar(carData)) {
                return new ResponseEntity<>(true, HttpStatus.CREATED);
            }
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
