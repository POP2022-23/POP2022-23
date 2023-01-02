package com.pop.feesmodel.controller;

import com.pop.feesmodel.dto.FeesDTO;
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
    public ResponseEntity<List<FeesDTO>> getPaidFeesList(long userId) {
        try {
            List<FeesDTO> listOfFees = feesModel.getPaidFeesList(userId);
            return new ResponseEntity<>(listOfFees, HttpStatus.OK);
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
    public ResponseEntity<List<FeesDTO>> getUnpaidFeesList(long userId) {
        try {
            List<FeesDTO> listOfUnpaidFees = feesModel.getUnpaidFeesList(userId);
            return new ResponseEntity<>(listOfUnpaidFees, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }      
    }

    @PostMapping("/ride")
    public ResponseEntity<Boolean> redirectToRidePayment() {
        Boolean isRidePaymentSuccessful = true;
        return new ResponseEntity<>(isRidePaymentSuccessful, HttpStatus.OK);
    }

    @PostMapping("/subscription")
    public ResponseEntity<Boolean> redirectToSubscriptionPayment() {
        Boolean isSubscriptionPaymentSuccessful = true;
        return new ResponseEntity<>(isSubscriptionPaymentSuccessful, HttpStatus.OK);
    }
}
