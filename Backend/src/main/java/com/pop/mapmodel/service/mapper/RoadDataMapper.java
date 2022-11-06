package com.pop.mapmodel.service.mapper;

import com.pop.mapmodel.domain.Road;
import com.pop.mapmodel.domain.RoadNode;
import com.pop.mapmodel.dto.RoadDataDTO;
import com.pop.mapmodel.dto.RoadNodeDTO;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoadDataMapper {

    public Road mapFromDTO(RoadDataDTO road) {
        if (road == null) {
            return null;
        }
        Road mappedRoad = Road.builder()
                .length(road.getLength())
                .name(road.getName())
                .build();
        mappedRoad.setNodes(mapFromDTO(road.getNodes(), mappedRoad));

        return mappedRoad;
    }

    public List<RoadNode> mapFromDTO(List<RoadNodeDTO> nodes, Road road) {
        if (nodes == null) {
            return null;
        }
        return nodes.stream()
                .map(node -> this.mapFromDTO(node, road))
                .collect(Collectors.toList());
    }

    public RoadNode mapFromDTO(RoadNodeDTO node, Road road) {
        if (node == null) {
            return null;
        }
        return RoadNode.builder()
                .x(node.getLongitude())
                .y(node.getLatitude())
                .road(road)
                .build();
    }

    public List<RoadDataDTO> mapToDTO(List<Road> roads) {
        if (roads == null) {
            return null;
        }
        return roads.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public RoadDataDTO mapToDTO(Road road) {
        if (road == null) {
            return null;
        }
        return RoadDataDTO.builder()
                .id(road.getId())
                .length(road.getLength())
                .name(road.getName())
                .nodes(mapNodeToDTO(road.getNodes()))
                .build();
    }

    public List<RoadNodeDTO> mapNodeToDTO(List<RoadNode> nodes) {
        if (nodes == null) {
            return null;
        }
        return nodes.stream()
                .map(this::mapNodeToDTO)
                .collect(Collectors.toList());
    }

    public RoadNodeDTO mapNodeToDTO(RoadNode node) {
        if (node == null) {
            return null;
        }
        return RoadNodeDTO.builder()
                .id(node.getId())
                .longitude(node.getX())
                .latitude(node.getY())
                .build();
    }

}
