package com.pop.tariffmodel.repository;

import com.pop.tariffmodel.domain.Tariff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TariffJpaRepository extends JpaRepository<Tariff, Long> {

    List<Tariff> findAll();
}
