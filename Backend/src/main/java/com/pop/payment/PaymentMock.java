package com.pop.payment;

public class PaymentMock {
    public static boolean createPayment(int paymentType) {
        switch (paymentType) {
            case 1:
                return true;
            default:
                return false;
        }
    }
}
