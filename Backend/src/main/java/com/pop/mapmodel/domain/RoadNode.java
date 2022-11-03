package com.pop.mapmodel.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Table(name = "road_node")
@Entity
@NoArgsConstructor
@Getter
@Setter
public class RoadNode {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private double x;

    @Column
    private double y;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "road_id")
    private Road road;

    public RoadNode(double x, double y) {
        this.x = x;
        this.y = y;
    }
}
