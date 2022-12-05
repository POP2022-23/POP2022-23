package com.pop.tariff.service.validator;

import com.pop.tariff.domain.VehicleType;
import com.pop.tariff.dto.TariffDTO;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Map;

@Service
public class TariffValidator {

    public boolean validateTariff(TariffDTO tariff) {
        return isNameValid(tariff.getName()) && isRatesValid(tariff.getRates());
    }

    private boolean isNameValid(String tariffName) {
        return tariffName != null && !tariffName.equals("");
    }

    private boolean isRatesValid(Map<String, BigDecimal> rates) {
        if (rates == null || rates.size() == 0) {
            return false;
        }
        for (final BigDecimal num : rates.values()) {
            if (num == null || num.compareTo(BigDecimal.ZERO) <= 0) {
                return false;
            }
        }
        return true;
    }
}
