package com.pop.tariff.domain;

import com.pop.mapmodel.domain.Road;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
public class Tariff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private boolean isValid;

    @Column
    private String name;

    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<TariffFee> fees;

    @OneToMany(
            cascade = CascadeType.ALL,

            orphanRemoval = true
    )
    private List<Road> roads;
}
