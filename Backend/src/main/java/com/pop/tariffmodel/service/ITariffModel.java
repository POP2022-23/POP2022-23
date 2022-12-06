package com.pop.tariffmodel.service;

import com.pop.tariffmodel.dto.TariffDTO;

import java.util.List;

public interface ITariffModel {

    List<TariffDTO> getTariffList();

    boolean saveNewTariffData(TariffDTO tariffData);

    boolean saveTariffChangeData(TariffDTO tariffData);
}
