package com.pop.db.domain;

import javax.persistence.OneToMany;
import java.util.List;

public class CarOwner extends User{

    @OneToMany(mappedBy = "owner")
    private List<Car> cars;
}
