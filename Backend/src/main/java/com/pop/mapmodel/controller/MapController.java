package com.pop.mapmodel.controller;

import com.pop.mapmodel.dto.RoadDataDTO;
import com.pop.mapmodel.service.IMapService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/map")
@AllArgsConstructor
public class MapController {

    private final IMapService mapService;

    @GetMapping
    public ResponseEntity<List<RoadDataDTO>> getRoads() {
        try {
            List<RoadDataDTO> roads = mapService.getRoadList();
            return ResponseEntity.ok(roads);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<Boolean> saveRoadData(@RequestBody RoadDataDTO road) {
        try {
            if (mapService.saveRoadData(road)) {
                return new ResponseEntity<>(true, HttpStatus.CREATED);
            }
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
