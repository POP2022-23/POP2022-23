package com.pop.tariffmodel.service.validator;

import com.pop.tariffmodel.dto.TariffDTO;
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
