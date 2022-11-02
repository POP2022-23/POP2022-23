package com.pop.carmodel;

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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(length = 8)
    private String registrationNumber;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private User owner;

    @OneToOne(mappedBy = "car")
    private CarData carData;

    public Car(String registrationNumber, User owner, CarData carData) {
        this.registrationNumber = registrationNumber;
        this.owner = owner;
        this.carData = carData;
    }
}
