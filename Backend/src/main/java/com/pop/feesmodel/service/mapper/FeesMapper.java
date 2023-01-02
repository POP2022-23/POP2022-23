package com.pop.feesmodel.service.mapper;

import com.pop.mapmodel.repository.RoadJpaRepository;
import com.pop.feesmodel.domain.Fee;
import com.pop.feesmodel.dto.FeesDTO;
import com.pop.mapmodel.domain.Road;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class FeesMapper {

    private final RoadJpaRepository roadJpaRepository;

    public FeesDTO mapFeeModelToFeesDto(Fee feeModel) {
        return new FeesDTO(feeModel.getId(), feeModel.getAmount(), feeModel.getExpirationDate(),
                feeModel.getIssueDate(), feeModel.getFeeType(), feeModel.isPaidUp(),
                null, feeModel.getVehicleType());
    }

    public List<Road> mapRoadIdsToRoadList(List<Long> roadIds) {
        List<Road> roads  = new ArrayList<>();
        roadIds.forEach(roadId ->{
            roads.add(roadJpaRepository.findById(roadId).orElseThrow(
                () -> new RuntimeException("Road with id " + roadId + " does not exist")
            ));
        });
        return roads;
    }
}
