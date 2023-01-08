package com.pop.tariffmodel.repository;

import com.pop.feesmodel.domain.Fee;
import com.pop.tariffmodel.domain.Tariff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TariffFeeJpaRepository extends JpaRepository<Tariff, Long> {

    @Query(
            nativeQuery = true,
            value = "SELECT * from road_pass_rate AS r INNER JOIN tariff AS t ON t.id = r.tariff_id"
    )
    List<Tariff> findSubscriptions();
}