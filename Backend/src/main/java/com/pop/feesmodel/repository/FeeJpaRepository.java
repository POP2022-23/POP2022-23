package com.pop.feesmodel.repository;

import com.pop.feesmodel.domain.Fee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.beans.Transient;
import java.util.List;

public interface FeeJpaRepository extends JpaRepository<Fee, Long> {

    @Query(
            nativeQuery = true,
            value = "SELECT * FROM fee AS f WHERE f.payer_id = ?1 AND f.is_paid_up = ?2"
    )
    List<Fee> findAllByUserId(long userId, boolean paidUp);

    @Modifying
    @Transactional
    @Query(
            nativeQuery = true,
            value = "UPDATE fee SET is_paid_up=true WHERE id = ?1"
    )
    void setRidePaymentAsPaid(long feeId);

}
