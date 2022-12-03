package com.pop.tariff.dto;

import com.pop.tariff.domain.VehicleType;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.Map;

@Getter
public class TariffDTO {
    private long id;
    private boolean isValid;
    private String name;
    private Map<VehicleType, BigDecimal> rates;
}
