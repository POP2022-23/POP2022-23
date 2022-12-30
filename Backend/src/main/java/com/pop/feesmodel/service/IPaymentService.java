package com.pop.feesmodel.service;

public interface IPaymentService {
    /*
        Szansa na udaną płatnośc zależna od wartości paymentType:
        1 - 100% szans na udaną płatność
        2 - 75% szans
        3 - 50% szans
        4 - 25% szans
        Pozostałe wartości - 0% szans (zawsze nieudana)
     */
    boolean launchPayment(long driverId, int paymentType);
}
