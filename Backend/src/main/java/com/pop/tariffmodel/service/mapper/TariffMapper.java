package com.pop.tariffmodel.service.mapper;

import com.pop.mapmodel.domain.Road;
import com.pop.mapmodel.repository.RoadJpaRepository;
import com.pop.tariffmodel.domain.Tariff;
import com.pop.tariffmodel.domain.VehicleType;
import com.pop.tariffmodel.dto.TariffDTO;
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
public class TariffMapper {

    private final RoadJpaRepository roadJpaRepository;

    public Tariff mapTariffDTOToModel(TariffDTO tariffDTO) {
        Tariff tariff = new Tariff();
        tariff.setName(tariffDTO.getName());
        tariff.setValid(tariffDTO.isValid());
        Map<VehicleType, BigDecimal> rates = new HashMap<>();
        tariffDTO.getRates().forEach((n, r)-> rates.put(VehicleType.valueOf(n), r));
        tariff.setRates(rates);
        List<Road> roads  = new ArrayList<>();
        tariffDTO.getRoadIds().forEach(roadId ->{
            roads.add(roadJpaRepository.findById(roadId).orElseThrow(
                    () -> new RuntimeException("Road with id " + roadId + " does not exist")
            ));
        });
        tariff.setRoads(roads);
        return tariff;
    }

    public TariffDTO mapTariffModelToDTO(Tariff tariffModel) {
        Map<String, BigDecimal> rates = new HashMap<>();
        tariffModel.getRates().forEach((vehicleType, rate) -> rates.put(vehicleType.name(), rate));

        return TariffDTO.builder()
                .id(tariffModel.getId())
                .name(tariffModel.getName())
                .isValid(tariffModel.isValid())
                .rates(rates)
                .roadIds(tariffModel.getRoads().stream().map(r -> r.getId()).collect(Collectors.toList()))
                .build();
    }
}
