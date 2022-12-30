package com.pop.feesmodel.service;

public interface IPaymentService {
    boolean launchPayment(long driverId, int paymentType);
}
