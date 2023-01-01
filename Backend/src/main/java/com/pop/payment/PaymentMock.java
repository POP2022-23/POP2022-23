package com.pop.payment;

public class PaymentMock {
    public static boolean createPayment(int paymentType) {
        switch (paymentType) {
            case 1:
                return true;
            case 2:
                return (Math.random() < 0.75);
            case 3:
                return (Math.random() < 0.5);
            case 4:
                return (Math.random() < 0.25);
            default:
                return false;
        }
    }
}
