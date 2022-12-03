package com.pop.mapmodel.service;

import com.pop.mapmodel.dto.RoadDataDTO;

import java.util.List;

public interface IMapModel {

    List<RoadDataDTO> getRoadList();

    boolean saveRoadData(RoadDataDTO roadData);

    boolean updateRoad(RoadDataDTO roadData);
}
