package com.pop.feesmodel.service.mapper;

import com.pop.feesmodel.domain.Fee;
import com.pop.feesmodel.dto.DriverDataDTO;
import com.pop.feesmodel.dto.FeeDetailsDTO;
import com.pop.feesmodel.dto.FeesDTO;
import com.pop.mapmodel.domain.Road;
import com.pop.mapmodel.repository.RoadJpaRepository;
import com.pop.tariffmodel.dto.TariffDTO;
import com.pop.user.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class FeesMapper {

    private final RoadJpaRepository roadJpaRepository;

    public FeesDTO mapFeeModelToFeesDto(Fee feeModel) {
        return new FeesDTO(feeModel.getId(), feeModel.getIssueDate(),
                feeModel.getTariff().getName(), feeModel.getVehicleType());
    }

    public FeeDetailsDTO mapFeeModelToFeeDetailsDto(Fee feeModel, TariffDTO tariffDTO) {
        DriverDataDTO driverData = mapDriverModelToDto(feeModel.getPayer());
        return new FeeDetailsDTO(feeModel.getId(), feeModel.getAmount(), feeModel.getExpirationDate(),
                feeModel.getIssueDate(), feeModel.getFeeType(), feeModel.getDescription(), feeModel.isPaidUp(), tariffDTO,
                feeModel.getVehicleType(), driverData);
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

    private DriverDataDTO mapDriverModelToDto(User user) {
        return new DriverDataDTO(user.getId(), user.getEmail(), user.getFirstName(),
                user.getLastName(), user.getPhoneNumber());
    }
}
