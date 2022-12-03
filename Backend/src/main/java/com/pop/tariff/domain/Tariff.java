package com.pop.tariff.domain;

import java.math.BigDecimal;
import java.util.Map;

public class Tariff {

    private Long id;
    private boolean isValid;
    private String name;
    private Map<VehicleType, BigDecimal> rates;
}
