package com.pop.mapmodel.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class RoadNodeDTO {

    private long id;
    private double latitude;
    private double longitude;

}
