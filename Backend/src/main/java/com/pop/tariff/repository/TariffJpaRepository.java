package com.pop.tariff.repository;

import com.pop.tariff.domain.Tariff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TariffJpaRepository extends JpaRepository<Tariff, Long> {
}
