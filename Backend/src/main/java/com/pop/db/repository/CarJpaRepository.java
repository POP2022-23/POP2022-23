package com.pop.db.repository;

import com.pop.db.domain.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarJpaRepository extends JpaRepository<Car, Long> {
}

