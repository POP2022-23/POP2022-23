package com.pop.feesmodel.repository;

import com.pop.feesmodel.domain.Fee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FeeJpaRepository extends JpaRepository<Fee, Long> {

    @Query(
            nativeQuery = true,
            value = "SELECT * FROM Fee AS f WHERE f.payer_id = ?1"
    )
    List<Fee> findAllByUserId(long userId);

}
