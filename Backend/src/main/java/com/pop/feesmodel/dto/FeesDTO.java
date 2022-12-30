package com.pop.feesmodel.dto;

import com.pop.feesmodel.domain.FeeType;
import com.pop.tariffmodel.domain.VehicleType;
import com.pop.tariffmodel.dto.TariffDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class FeesDTO {
    private long id;
    private BigDecimal amount;
    private LocalDateTime expirationDate;
    private LocalDateTime issueDate;
    private FeeType feeType;
    private boolean isPaid;
    //roadIds chyba niepotrzebne, ta informacja jest w polu tariff
    private List<Long> roadIds;
    private TariffDTO tariff;
    private VehicleType vehicleType;
}
