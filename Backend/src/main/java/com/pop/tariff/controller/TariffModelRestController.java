package com.pop.tariff.controller;

import com.pop.tariff.dto.TariffDTO;
import com.pop.tariff.service.ITariffModel;
import lombok.AllArgsConstructor;
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
        return null;
    }

    @PostMapping
    public ResponseEntity<Boolean> saveNewTariff(@RequestBody TariffDTO tariffData) {
        return null;
    }

    @PutMapping
    public ResponseEntity<Boolean> saveTariffChangeData(@RequestBody TariffDTO tariffData) {
        return null;
    }
}
