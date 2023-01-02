package com.pop.tariffmodel.domain;

import com.pop.mapmodel.domain.Road;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @ElementCollection
    @CollectionTable(name = "transit_rate", joinColumns = @JoinColumn(name = "tariff_id"))
    @MapKeyColumn(name = "vehicle_type")
    @MapKeyEnumerated(EnumType.STRING)
    @Column(name = "rate")
    private Map<VehicleType, BigDecimal> transitRates = new HashMap<>();

    @ElementCollection
    @CollectionTable(name = "road_pass_rate", joinColumns = @JoinColumn(name = "tariff_id"))
    @MapKeyColumn(name = "vehicle_type")
    @MapKeyEnumerated(EnumType.STRING)
    @Column(name = "rate")
    private Map<VehicleType, BigDecimal> roadPassRates = new HashMap<>();

    @OneToMany(
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "tariff_id")
    private List<Road> roads;

    public void updateTariffRates(Map<VehicleType, BigDecimal> updatedRates) {
        transitRates.clear();
        transitRates = updatedRates;
    }

    public void updateRoads(List<Road> updatedRoads) {
        roads.clear();
        roads.addAll(updatedRoads);
    }
}
