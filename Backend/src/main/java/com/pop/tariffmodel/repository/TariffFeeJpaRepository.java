package com.pop.tariffmodel.repository;

import com.pop.tariffmodel.domain.Tariff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TariffFeeJpaRepository extends JpaRepository<Tariff, Long> {
}