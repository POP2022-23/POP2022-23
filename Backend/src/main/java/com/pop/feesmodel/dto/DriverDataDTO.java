package com.pop.feesmodel.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DriverDataDTO {
    private long id;
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
}
