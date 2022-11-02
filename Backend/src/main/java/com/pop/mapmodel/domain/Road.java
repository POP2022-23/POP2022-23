package com.pop.mapmodel.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Table
@Entity
@NoArgsConstructor
@Getter
public class Road {

    @Id
    private Long id;

    @OneToMany(mappedBy="road")
    private List<RoadNode> nodes;

    @Column
    private BigDecimal length;

    @Column
    private String name;

//    @OneToOne
//    private RoadNode startRoadNodeId;
//
//    @OneToOne
//    private RoadNode endRoadNodeId;

    public Road(List<RoadNode> nodes, BigDecimal length, String name) {
        this.nodes = nodes;
        this.length = length;
        this.name = name;
//        this.startRoadNodeId = nodes.get(0);
//        this.endRoadNodeId = nodes.get(nodes.size()-1);
    }
}
