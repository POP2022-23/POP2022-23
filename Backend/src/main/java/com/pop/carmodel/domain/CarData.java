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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "car_id", referencedColumnName = "id")
    private Car car;

    @Column
    private double engineCapacity;

    @Column
    private double height;

    @Column
    private double length;

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
