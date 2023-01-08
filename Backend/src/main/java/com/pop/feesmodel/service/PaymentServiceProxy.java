package com.pop.feesmodel.service;

import com.pop.payment.PaymentMock;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceProxy implements IPaymentService {

    @Override
    public boolean launchPayment(long driverId, int paymentType) {
        return PaymentMock.createPayment(paymentType);
    }
}
