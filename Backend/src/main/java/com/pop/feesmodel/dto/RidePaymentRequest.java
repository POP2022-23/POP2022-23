package com.pop.feesmodel.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RidePaymentRequest {
    private long feeId;
    private DriverDataDTO driverData;
    private int paymentType;
}
