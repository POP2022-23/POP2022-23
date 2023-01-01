package com.pop.feesmodel.service;

import com.pop.feesmodel.dto.DriverDataDTO;
import com.pop.feesmodel.dto.FeesDTO;
import com.pop.tariffmodel.dto.TariffDTO;

import java.util.List;

public interface IFeesModel {
    List<FeesDTO> getPaidFeesList(long userId);
    List<TariffDTO> getSubscriptionTariffsList();
    List<FeesDTO> getUnpaidFeesList(long userId);
    boolean redirectToRidePayment(long feeId, DriverDataDTO driverData, int paymentType);
    boolean redirectToSubscriptionPayment(long subTariffId, int monthAmount, long driverId, int paymentType);
}
