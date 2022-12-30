package com.pop.feesmodel.service;

public class PaymentServiceProxy implements IPaymentService {

    @Override
    public boolean launchPayment(long driverId, int paymentType) {
        return false;
    }
}
