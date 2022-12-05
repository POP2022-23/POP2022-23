package com.pop.tariff.service.mapper;

import com.pop.mapmodel.domain.Road;
import com.pop.mapmodel.repository.RoadJpaRepository;
import com.pop.tariff.domain.Tariff;
import com.pop.tariff.domain.TariffFee;
import com.pop.tariff.domain.VehicleType;
import com.pop.tariff.dto.TariffDTO;
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
        List<TariffFee> rates = mapRatesToTariffFeesList(tariffDTO.getRates());
        tariff.setFees(rates);
        List<Road> roads  = mapRoadIdsToRoadsList(tariffDTO.getRoadIds());
        tariff.setRoads(roads);
        return tariff;
    }

    public List<TariffFee> mapRatesToTariffFeesList(Map<String, BigDecimal> tariffRates) {
        List<TariffFee> rates = new ArrayList<>();
        tariffRates.forEach((n,r)->{
            TariffFee tf = new TariffFee();
            tf.setRate(r);
            tf.setVehicleType(VehicleType.valueOf(n));
            rates.add(tf);
        });
        return rates;
    }

    public List<Road> mapRoadIdsToRoadsList(List<Long> roadIds) {
        List<Road> roads  = new ArrayList<>();
        roadIds.forEach(roadId ->{
            roads.add(roadJpaRepository.findById(roadId).orElseThrow(
                    () -> new RuntimeException("Road with id " + roadId + " does not exist")
            ));
        });
        return roads;
    }

    public TariffDTO mapTariffModelToDTO(Tariff tariffModel) {
        Map<String, BigDecimal> rates = new HashMap<>();
        tariffModel.getFees().forEach(r->{
            rates.put(r.getVehicleType().toString(),r.getRate());
        });
        return TariffDTO.builder()
                .id(tariffModel.getId())
                .name(tariffModel.getName())
                .isValid(tariffModel.isValid())
                .rates(rates)
                .roadIds(tariffModel.getRoads().stream().map(r -> r.getId()).collect(Collectors.toList()))
                .build();
    }
}
