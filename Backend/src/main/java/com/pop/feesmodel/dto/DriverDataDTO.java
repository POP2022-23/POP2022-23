package com.pop.feesmodel.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DriverDataDTO {
    private long id;
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
}
