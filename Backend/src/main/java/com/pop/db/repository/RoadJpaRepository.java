package com.pop.db.repository;

import com.pop.db.domain.Road;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface RoadJpaRepository extends JpaRepository<Road, Long> {
}
