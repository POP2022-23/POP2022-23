package com.pop.feesmodel.service;

import com.pop.feesmodel.domain.Fee;
import com.pop.feesmodel.domain.FeeType;
import com.pop.feesmodel.dto.DriverDataDTO;
import com.pop.feesmodel.dto.FeesDTO;
import com.pop.feesmodel.repository.FeeJpaRepository;
import com.pop.feesmodel.service.mapper.FeesMapper;
import com.pop.feesmodel.service.validator.FeesValidator;
import com.pop.tariffmodel.domain.VehicleType;
import com.pop.tariffmodel.dto.TariffDTO;
import com.pop.tariffmodel.domain.Tariff;
import com.pop.tariffmodel.repository.TariffFeeJpaRepository;
import com.pop.tariffmodel.service.mapper.TariffMapper;
import com.pop.user.User;
import com.pop.user.UserJpaRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class BasicFeesModel implements IFeesModel {
    private FeesValidator feesValidator;
    private FeesMapper feesMapper;
    private TariffMapper tariffMapper;
    private FeeJpaRepository feeJpaRepository;
    private TariffFeeJpaRepository tariffJpaRepository;
    private UserJpaRepository userJpaRepository;
    private IPaymentService paymentService;

    @Override
    public List<FeesDTO> getPaidFeesList(long userId) {
        List<FeesDTO> feesList = new ArrayList<>();
        List<Fee> fees = feeJpaRepository.findAllByUserId(userId, true);
        for(Fee fee : fees) {
            FeesDTO feesDTO = feesMapper.mapFeeModelToFeesDto(fee);
            feesDTO.setTariff(tariffMapper.mapTariffModelToDTO(fee.getTariff()));
            feesList.add(feesDTO);
        }
        return feesList;
    }

    @Override
    public FeesDTO getFeeDetails(long feeId) {
        Fee feeEntity = feeJpaRepository.findById(feeId).orElseThrow();
        FeesDTO feeDto = feesMapper.mapFeeModelToFeesDto(feeEntity);
        return feeDto;
    }

    @Override
    public List<TariffDTO> getSubscriptionTariffsList() {
        List<TariffDTO> subscriptionsList = new ArrayList<>();
        List<Tariff> subscriptions = tariffJpaRepository.findSubscriptions();
        for(Tariff subscription: subscriptions) {
            TariffDTO subscriptionsDTO = tariffMapper.mapTariffModelToDTO(subscription);
            subscriptionsList.add(subscriptionsDTO);
        }
        return subscriptionsList;
    }

    @Override
    public List<FeesDTO> getUnpaidFeesList(long userId) {
        List<FeesDTO> unpaidFeesList = new ArrayList<>();
        List<Fee> unpaidFees = feeJpaRepository.findAllByUserId(userId, false);
        for (Fee fee : unpaidFees) {
            FeesDTO unpaidFeesDTO = feesMapper.mapFeeModelToFeesDto(fee);
            unpaidFeesDTO.setTariff(tariffMapper.mapTariffModelToDTO(fee.getTariff()));
            unpaidFeesList.add(unpaidFeesDTO);
        }
        return unpaidFeesList;
    }

    @Override
    public boolean redirectToRidePayment(long feeId, DriverDataDTO driverData, int paymentType) {
        if(!feesValidator.validate(driverData)) {
            return false;
        }
        boolean isPaymentSuccessful = paymentService.launchPayment(driverData.getId(), paymentType);
        if(isPaymentSuccessful) {
            feeJpaRepository.setRidePaymentAsPaid(feeId);
        }
        return isPaymentSuccessful;
    }

    @Override
    public boolean redirectToSubscriptionPayment(String vehicleType, long subTariffId,
                                                 int monthAmount, long driverId, int paymentType) {
        boolean isSubPaymentSuccessful = paymentService.launchPayment(driverId, paymentType);
        if(isSubPaymentSuccessful) {
            Tariff tariff = tariffJpaRepository.findById(subTariffId).orElseThrow();
            BigDecimal transitRate = tariff.getRoadPassRates().get(VehicleType.valueOf(vehicleType));
            Fee fee = new Fee();
            fee.setAmount(transitRate.multiply(BigDecimal.valueOf(monthAmount)));
            fee.setIssueDate(LocalDateTime.now());
            fee.setExpirationDate(LocalDateTime.now().plusMonths(monthAmount));
            fee.setPaidUp(true);
            fee.setFeeType(FeeType.ROAD_PASS);
            fee.setVehicleType(VehicleType.valueOf(vehicleType));
            User payer = userJpaRepository.findById(driverId).orElseThrow();
            fee.setPayer(payer);
            fee.setTariff(tariff);
            feeJpaRepository.save(fee);
        }
        return isSubPaymentSuccessful;
    }
}
