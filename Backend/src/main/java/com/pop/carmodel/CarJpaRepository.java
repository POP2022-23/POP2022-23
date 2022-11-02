package com.pop.carmodel;

import com.pop.carmodel.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarJpaRepository extends JpaRepository<Car, Long> {
}

