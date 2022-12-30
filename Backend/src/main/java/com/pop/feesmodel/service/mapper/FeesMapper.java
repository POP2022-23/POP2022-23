package com.pop.feesmodel.service.mapper;

import com.pop.feesmodel.domain.Fee;
import com.pop.feesmodel.dto.FeesDTO;
import com.pop.mapmodel.domain.Road;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class FeesMapper {
    public FeesDTO mapFeeModelToFeesDto(Fee feeModel) {
        return new FeesDTO(feeModel.getId(), feeModel.getAmount(), feeModel.getExpirationDate(),
                feeModel.getIssueDate(), feeModel.getFeeType(), feeModel.isPaidUp(),
                null, null, feeModel.getVehicleType());
    }

    public BigDecimal mapFeesDtoAmountToFeesAmount(BigDecimal feesAmount) {
        return null;
    }

    public Fee mapFeesDtoToFeesModel(FeesDTO feesDTO) {
        return null;
    }

    public List<Road> mapRoadIdsToRoadList(List<Long> roadIds) {
        return null;
    }
}
