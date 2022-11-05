package com.pop.mapmodel.service;

import com.pop.mapmodel.dto.RoadDataDTO;

import java.util.List;

public interface IMapService {

    List<RoadDataDTO> getRoadList();

    boolean saveRoadData(RoadDataDTO road);

}
