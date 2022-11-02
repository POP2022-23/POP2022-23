package com.pop.mapmodel.domain;

import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Table
@Entity
@NoArgsConstructor
public class RoadNode {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private BigDecimal x;

    @Column
    private BigDecimal y;

    @ManyToOne
    @JoinColumn(name="road_id", nullable=false)
    private Road road;

    public RoadNode(BigDecimal x, BigDecimal y) {
        this.x = x;
        this.y = y;
    }
}
