package com.pop.mapmodel.service.validator;

import com.pop.mapmodel.dto.RoadDataDTO;
import com.pop.mapmodel.dto.RoadNodeDTO;
import org.springframework.stereotype.Service;

@Service
public class RoadDataValidator {

    public void validate(RoadDataDTO road) {
        if (road.getLength() <= 0) {
            throw new IllegalArgumentException("Length must be positive");
        }
        if (road.getName() == null || road.getName().length() == 0) {
            throw new IllegalArgumentException("Name cannot be empty");
        }
        if (road.getNodes() == null || road.getNodes().size() < 2) {
            throw new IllegalArgumentException("Road must contain at least 2 nodes");
        }
    }

}
