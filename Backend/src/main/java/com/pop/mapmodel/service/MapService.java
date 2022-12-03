package com.pop.mapmodel.service;

import com.pop.mapmodel.domain.Road;
import com.pop.mapmodel.domain.RoadNode;
import com.pop.mapmodel.repository.RoadJpaRepository;
import com.pop.mapmodel.dto.RoadDataDTO;
import com.pop.mapmodel.service.mapper.RoadDataMapper;
import com.pop.mapmodel.service.validator.RoadDataValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MapService implements IMapModel {

    private final RoadJpaRepository roadRepository;
    private final RoadDataMapper roadDataMapper;
    private final RoadDataValidator roadDataValidator;

    @Override
    public List<RoadDataDTO> getRoadList() {
        List<Road> roads = roadRepository.findAll();

        return roadDataMapper.mapToDTO(roads);
    }

    @Override
    public boolean saveRoadData(RoadDataDTO roadData) {
        try {
            roadDataValidator.validate(roadData);
            Road road = roadDataMapper.mapFromDTO(roadData);
            roadRepository.save(road);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

    @Override
    public boolean updateRoad(final RoadDataDTO roadData) {
        try {
            roadDataValidator.validate(roadData);
            final Road road = roadRepository.findById(roadData.getId()).orElse(null);
            if(road == null) {
                return false;
            }
            road.setLength(roadData.getLength());
            road.setName(roadData.getName());
            road.updateNodes(roadDataMapper.mapFromDTO(roadData.getNodes(), road));
            roadRepository.save(road);
            return true;
        } catch (final IllegalArgumentException e) {
            return false;
        }
    }
}
