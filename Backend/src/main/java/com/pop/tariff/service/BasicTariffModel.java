package com.pop.tariff.service;

import com.pop.mapmodel.domain.Road;
import com.pop.mapmodel.repository.RoadJpaRepository;
import com.pop.tariff.domain.Tariff;
import com.pop.tariff.domain.TariffFee;
import com.pop.tariff.domain.VehicleType;
import com.pop.tariff.dto.TariffDTO;
import com.pop.tariff.repository.TariffJpaRepository;
import com.pop.tariff.service.mapper.TariffMapper;
import com.pop.tariff.service.validator.TariffValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BasicTariffModel implements ITariffModel {

    private final TariffJpaRepository tariffJpaRepository;
    private final TariffValidator tariffValidator;
    private final TariffMapper tariffMapper;

    @Override
    public List<TariffDTO> getTariffList() {
        return tariffJpaRepository.findAll().stream()
                .map(tariffMapper::mapTariffModelToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public boolean saveNewTariffData(TariffDTO tariffData) {
        if(!tariffValidator.validateTariff(tariffData)) {
            return false;
        }
        Tariff tariff = tariffMapper.mapTariffDTOToModel(tariffData);
        tariffJpaRepository.save(tariff);
        return true;
    }

    @Override
    public boolean saveTariffChangeData(TariffDTO tariffData) {
        return false;
    }

}
