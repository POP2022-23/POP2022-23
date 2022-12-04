package com.pop.tariff.repository;

import com.pop.tariff.domain.Tariff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TariffFeeJpaRepository extends JpaRepository<Tariff, Long> {
}