package com.pop.db;

import com.pop.mapmodel.domain.Road;
import com.pop.mapmodel.domain.RoadNode;
import com.pop.mapmodel.repository.RoadJpaRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.persistence.EntityManager;
import javax.sql.DataSource;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


@DataJpaTest
public class RoadJpaRespositoryTest {
    @Autowired private DataSource dataSource;
    @Autowired private JdbcTemplate jdbcTemplate;
    @Autowired private EntityManager entityManager;
    @Autowired
    private RoadJpaRepository roadJpaRepository;

    @Test
    public void testCreateRoad(){
        List<RoadNode> nodes = new ArrayList<>();
        nodes.add(new RoadNode(new BigDecimal(4),new BigDecimal(4)));
        nodes.add(new RoadNode(new BigDecimal(5),new BigDecimal(5)));
        nodes.add(new RoadNode(new BigDecimal(6),new BigDecimal(6)));

        Road r1 = new Road(nodes,new BigDecimal(120),"road 1");

        Road result = roadJpaRepository.save(r1);

        assertTrue(result.getId() == 1L);
    }
}
