package com.pop.feesmodel.dto;

import com.pop.tariffmodel.domain.VehicleType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Setter
public class FeesDTO {
    private long id;
    private LocalDateTime issueDate;
    private String tariffName;
    private VehicleType vehicleType;
}
