package com.pop.tariffmodel.repository;

import com.pop.feesmodel.domain.Fee;
import com.pop.tariffmodel.domain.Tariff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TariffFeeJpaRepository extends JpaRepository<Tariff, Long> {

    @Query(
            nativeQuery = true,
            value = "SELECT * from tariff"
    )
    List<Tariff> findSubscriptions();
}