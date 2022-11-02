package com.pop.db.domain;

import javax.persistence.*;
import java.math.BigDecimal;


@Entity
@Table
public class CarData {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "car_id", referencedColumnName = "id")
    private Car car;

    @Column
    private BigDecimal engineCapacity;

    @Column
    private BigDecimal height;

    @Column
    private BigDecimal length;

    @Column
    private String model;

    @Column
    private Long productionYear;

    @Column
    @Enumerated(EnumType.STRING)
    private CarType type;

    @Column
    private BigDecimal weight;

    @Column
    private BigDecimal width;




}
