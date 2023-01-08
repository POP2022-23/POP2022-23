package com.pop.feesmodel.controller;

import com.pop.feesmodel.dto.FeesDTO;
import com.pop.feesmodel.dto.RidePaymentRequest;
import com.pop.feesmodel.dto.SubscriptionPaymentRequest;
import com.pop.feesmodel.service.IFeesModel;
import com.pop.tariffmodel.dto.TariffDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fees")
@AllArgsConstructor
@CrossOrigin(maxAge = 3600)
public class FeesModelRestController {
    private IFeesModel feesModel;

    @GetMapping("/{userId}/paid")
    public ResponseEntity<List<FeesDTO>> getPaidFeesList(@PathVariable long userId) {
        try {
            List<FeesDTO> listOfFees = feesModel.getPaidFeesList(userId);
            return new ResponseEntity<>(listOfFees, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{feeId}")
    public ResponseEntity<FeesDTO> getFeeDetails(@PathVariable long feeId) {
        try {
            FeesDTO feeDetails = feesModel.getFeeDetails(feeId);
            return new ResponseEntity<>(feeDetails, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<TariffDTO>> getSubscriptionTariffsList() {
        try {
            List<TariffDTO> listOfSubscriptions = feesModel.getSubscriptionTariffsList();
            return new ResponseEntity<>(listOfSubscriptions, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }      
    }

    @GetMapping("/{userId}/unpaid")
    public ResponseEntity<List<FeesDTO>> getUnpaidFeesList(@PathVariable long userId) {
        try {
            List<FeesDTO> listOfUnpaidFees = feesModel.getUnpaidFeesList(userId);
            return new ResponseEntity<>(listOfUnpaidFees, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }      
    }

    @PostMapping("/transit")
    public ResponseEntity<Boolean> redirectToRidePayment(@RequestBody RidePaymentRequest paymentRequest) {
        try {
            Boolean isRidePaymentSuccessful = feesModel.redirectToRidePayment
                    (paymentRequest.getFeeId(), paymentRequest.getDriverData(), paymentRequest.getPaymentType());
            return new ResponseEntity<>(isRidePaymentSuccessful, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/roadpass")
    public ResponseEntity<Boolean> redirectToSubscriptionPayment(@RequestBody SubscriptionPaymentRequest paymentRequest) {
        try {
            Boolean isSubPaymentSuccessful = feesModel.redirectToSubscriptionPayment
                    (paymentRequest.getVehicleType(), paymentRequest.getSubTariffId(), paymentRequest.getMonthAmount(),
                            paymentRequest.getDriverId(), paymentRequest.getPaymentType());
            return new ResponseEntity<>(isSubPaymentSuccessful, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
