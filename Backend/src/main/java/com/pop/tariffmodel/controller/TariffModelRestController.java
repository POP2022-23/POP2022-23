package com.pop.tariffmodel.controller;

import com.pop.tariffmodel.dto.TariffDTO;
import com.pop.tariffmodel.service.ITariffModel;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tariff")
@AllArgsConstructor
@CrossOrigin(maxAge = 3600)
public class TariffModelRestController {

    private final ITariffModel tariffModel;

    @GetMapping
    public ResponseEntity<List<TariffDTO>> getListOfTariffs() {
        List<TariffDTO> tariffs = tariffModel.getTariffList();
        return ResponseEntity.ok(tariffs);
    }

    @PostMapping
    public ResponseEntity<Boolean> saveNewTariff(@RequestBody TariffDTO tariffData) {
        try {
            if (tariffModel.saveNewTariffData(tariffData)) {
                return new ResponseEntity<>(true, HttpStatus.CREATED);
            }
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping
    public ResponseEntity<Boolean> saveTariffChangeData(@RequestBody final TariffDTO tariffData) {
        try {
            if (tariffModel.saveTariffChangeData(tariffData)) {
                return new ResponseEntity<>(true, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
            }
        } catch (final Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
