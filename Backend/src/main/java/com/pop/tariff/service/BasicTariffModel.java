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
    private final RoadJpaRepository roadJpaRepository;

    @Override
    public List<TariffDTO> getTariffList() {
        return tariffJpaRepository.findAll().stream().map(this::map).collect(Collectors.toList());
    }

    @Override
    public boolean saveNewTariffData(TariffDTO tariffData) {
        Tariff tariff = new Tariff();
        tariff.setName(tariffData.getName());
        tariff.setValid(tariffData.isValid());
        List<TariffFee> rates = new ArrayList<>();
        tariffData.getRates().forEach((n,r)->{
            TariffFee tf = new TariffFee();
            tf.setRate(r);
            tf.setVehicleType(VehicleType.valueOf(n));
            rates.add(tf);
        });
        tariff.setFees(rates);
        List<Road> roads  = new ArrayList<>();
        tariffData.getRoadIds().forEach(roadId ->{
            roads.add(roadJpaRepository.findById(roadId).orElseThrow(
                    () -> new RuntimeException("Road with id " + roadId + " does not exist")
            ));
        });
        tariff.setRoads(roads);

        tariffJpaRepository.save(tariff);

        return true;
    }

    @Override
    public boolean saveTariffChangeData(TariffDTO tariffData) {
        return false;
    }

    private TariffDTO map(Tariff tariff){
        Map<String, BigDecimal> rates = new HashMap<>();
        tariff.getFees().forEach(r->{
            rates.put(r.getVehicleType().toString(),r.getRate());
        });
        return TariffDTO.builder()
                .id(tariff.getId())
                .name(tariff.getName())
                .isValid(tariff.isValid())
                .rates(rates)
                .roadIds(tariff.getRoads().stream().map(r -> r.getId()).collect(Collectors.toList()))
                .build();
    }
}
