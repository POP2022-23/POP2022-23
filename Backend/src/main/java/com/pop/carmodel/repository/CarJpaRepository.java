package com.pop.carmodel.repository;

import com.pop.carmodel.domain.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CarJpaRepository extends JpaRepository<Car, Long> {

    @Query(
            nativeQuery = true,
            value = "SELECT c.* FROM Car AS c INNER JOIN car_data AS cd ON cd.id = c.id WHERE c.owner_id = ?1 "
    )
    List<Car> findAllByOwnerId(long ownerId);
}
