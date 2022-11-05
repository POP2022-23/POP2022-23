package com.pop.carmodel.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CarJpaRepository extends JpaRepository<Car, Long> {

    @Query("SELECT c FROM Car c WHERE c.owner_id = ?1")
    List<Car> findAllByOwnerId(long ownerId);
}

