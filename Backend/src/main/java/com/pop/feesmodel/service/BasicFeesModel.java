package com.pop.feesmodel.service;

import com.pop.feesmodel.domain.Fee;
import com.pop.feesmodel.dto.DriverDataDTO;
import com.pop.feesmodel.dto.FeesDTO;
import com.pop.feesmodel.repository.FeeJpaRepository;
import com.pop.feesmodel.service.mapper.FeesMapper;
import com.pop.feesmodel.service.validator.FeesValidator;
import com.pop.tariffmodel.dto.TariffDTO;
import com.pop.tariffmodel.repository.TariffJpaRepository;
import com.pop.tariffmodel.service.mapper.TariffMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class BasicFeesModel implements IFeesModel {
    private FeesValidator feesValidator;
    private FeesMapper feesMapper;
    private TariffMapper tariffMapper;
    private FeeJpaRepository feeJpaRepository;
    private TariffJpaRepository tariffJpaRepository;

    @Override
    public List<FeesDTO> getPaidFeesList(long userId) {
        List<FeesDTO> feesList = new ArrayList<>();
        List<Fee> fees = feeJpaRepository.findAllByUserId(userId);
        for(Fee fee : fees) {
            FeesDTO feesDTO = feesMapper.mapFeeModelToFeesDto(fee);
            feesDTO.setTariff(tariffMapper.mapTariffModelToDTO(fee.getTariff()));
            feesList.add(feesDTO);
        }
        return feesList;
    }

    @Override
    public List<TariffDTO> getSubscriptionTariffsList() {
        List<TariffDTO> subscriptionsList = new ArrayList<>();
        List<Tariff> subscriptions = feeJpaRepository.findAllByUserId(userId);
        for(Tariff subscription: subscriptions) {
            TariffDTO subscriptionsDTO = tariffMapper.mapTariffModelToDTO(subscription);
            subscriptionsList.add(subscriptionsDTO);
        }
        return subscriptionsList;
    }

    @Override
    public List<FeesDTO> getUnpaidFeesList(long userId) {
        List<FeesDTO> unpaidFeesList = new ArrayList<>();
        List<Fee> unpaidFees = feeJpaRepository.findAllByUserId(userId);
        for (Fee fee : fees) {
            FeesDTO unpaidFeesDTO = feesMapper.mapFeeModelToFeesDto(fee);
            unpaidFeesDTO.setTariff(tariffMapper.mapTariffModelToDTO(fee.getTariff));
            if(unpaidFeesDTO.isPaidUp == false) {
               unpaidFeesList.add(unpaidFeesDTO);
           }
        }
        return unpaidFeesList;
    }

    @Override
    public boolean redirectToRidePayment(long feeId, DriverDataDTO driverData, int paymentType) {
        return false;
    }

    @Override
    public boolean redirectToSubscriptionPayment(long subTariffId, int monthAmount, long driverId, int paymentType) {
        return false;
    }
}
