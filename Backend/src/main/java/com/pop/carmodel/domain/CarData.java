package com.pop.carmodel.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Table
@Getter
@Setter
public class CarData {

    @Id
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "id")
    private Car car;

    @Column
    private double engineCapacity;

    @Column
    private double height;

    @Column
    private double length;

    @Column
    private String make;

    @Column
    private String model;

    @Column
    private Long productionYear;

    @Column
    @Enumerated(EnumType.STRING)
    private CarType type;

    @Column
    private double weight;

    @Column
    private double width;
}
