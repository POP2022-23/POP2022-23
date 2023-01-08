package com.pop.feesmodel.service.validator;

import com.pop.feesmodel.domain.Fee;
import com.pop.feesmodel.dto.DriverDataDTO;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Service
public class FeesValidator {
    public boolean validate(DriverDataDTO driverData) {
        return isEmailValid(driverData.getEmail()) && isFirstNameValid(driverData.getFirstName())
                && isLastNameValid(driverData.getLastName()) && isPhoneNumberValid(driverData.getPhoneNumber());
    }

    private boolean isEmailValid(String email) {
        return email.contains("@");
    }
        
    private boolean isFirstNameValid(String firstName) {
        return firstName.matches("[A-Z][a-z]+");
    }

    private boolean isLastNameValid (String lastName) {
        return lastName.matches("[A-Z][a-z]+");
    }

    private boolean isPhoneNumberValid (String phoneNumber) {
        return (phoneNumber.length() == 9) || !phoneNumber.matches("[0-9]+");
    }
}
