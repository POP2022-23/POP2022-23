package com.pop.carmodel.domain;

import com.pop.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 8)
    private String registrationNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToOne(mappedBy = "car", cascade = CascadeType.ALL, fetch = FetchType.EAGER, optional = false)
    private CarData carData;

    public Car(String registrationNumber, User owner, CarData carData) {
        this.registrationNumber = registrationNumber;
        this.owner = owner;
        this.carData = carData;
    }
}
