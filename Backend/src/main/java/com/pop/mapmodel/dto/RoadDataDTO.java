package com.pop.mapmodel.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class RoadDataDTO {

    private long id;
    private double length;
    private String name;
    private List<RoadNodeDTO> nodes;

}
