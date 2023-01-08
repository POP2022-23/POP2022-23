package com.pop.tariffmodel.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Getter
@Builder
public class TariffDTO {
    private long id;
    private boolean isValid;
    private String name;
    private Map<String, BigDecimal> transitRates;
    private Map<String, BigDecimal> roadPassRates;
    private List<Long> roadIds;
}
