package com.pop.feesmodel.service;

import com.pop.feesmodel.domain.Fee;
import com.pop.feesmodel.dto.DriverDataDTO;
import com.pop.feesmodel.dto.FeesDTO;
import com.pop.tariffmodel.dto.TariffDTO;

import java.util.List;

public interface IFeesModel {
    List<FeesDTO> getPaidFeesList(long userId);
    FeesDTO getFeeDetails(long feeId);
    List<TariffDTO> getSubscriptionTariffsList();
    List<FeesDTO> getUnpaidFeesList(long userId);
    boolean redirectToRidePayment(long feeId, DriverDataDTO driverData, int paymentType);
    boolean redirectToSubscriptionPayment(String vehicleType, long subTariffId, int monthAmount, long driverId, int paymentType);
}
