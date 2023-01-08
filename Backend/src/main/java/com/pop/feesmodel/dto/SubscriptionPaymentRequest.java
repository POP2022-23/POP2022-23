package com.pop.feesmodel.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubscriptionPaymentRequest {
    private long subTariffId;
    private int monthAmount;
    private long driverId;
    private int paymentType;
    private String vehicleType;
}
