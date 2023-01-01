package com.pop.feesmodel.domain;

import com.pop.tariffmodel.domain.Tariff;
import com.pop.tariffmodel.domain.VehicleType;
import com.pop.user.User;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
public class Fee {
    private Long id;
    private BigDecimal amount;
    private LocalDateTime expirationDate;
    private FeeType feeType;
    private boolean isPaidUp;
    private LocalDateTime issueDate;
    private VehicleType vehicleType;
    private User user;
    private Tariff tariff;
}
