package com.pop.tariff.service;

import com.pop.tariff.dto.TariffDTO;
import com.pop.tariff.repository.TariffJpaRepository;
import com.pop.tariff.service.mapper.TariffMapper;
import com.pop.tariff.service.validator.TariffValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BasicTariffModel implements ITariffModel {

    private final TariffJpaRepository tariffJpaRepository;
    private final TariffValidator tariffValidator;
    private final TariffMapper tariffMapper;

    @Override
    public List<TariffDTO> getTariffList() {
        return null;
    }

    @Override
    public boolean saveNewTariffData(TariffDTO tariffData) {
        return false;
    }

    @Override
    public boolean saveTariffChangeData(TariffDTO tariffData) {
        return false;
    }
}
