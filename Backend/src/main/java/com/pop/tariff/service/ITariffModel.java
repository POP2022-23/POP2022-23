package com.pop.tariff.service;

import com.pop.tariff.dto.TariffDTO;

import java.util.List;

public interface ITariffModel {

    List<TariffDTO> getTariffList();

    boolean saveNewTariffData(TariffDTO tariffData);

    boolean saveTariffChangeData(TariffDTO tariffData);
}
