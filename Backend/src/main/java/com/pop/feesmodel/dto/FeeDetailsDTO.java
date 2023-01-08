package com.pop.feesmodel.dto;

import com.pop.feesmodel.domain.FeeType;
import com.pop.tariffmodel.domain.VehicleType;
import com.pop.tariffmodel.dto.TariffDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Setter
public class FeeDetailsDTO {
    private long id;
    private BigDecimal amount;
    private LocalDateTime expirationDate;
    private LocalDateTime issueDate;
    private FeeType feeType;
    private String description;
    private boolean isPaid;
    private TariffDTO tariff;
    private VehicleType vehicleType;
    private DriverDataDTO driverData;
}
