package com.pop.feesmodel.service.validator;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Service
public class FeesValidator {
    List<String> months = Arrays.asList("styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec",
    "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień");

    private void isEmailValid(String email) {
        if(!email.contains("@")) {
            throw new IllegalArgumentException("Incorrect email address entered.");
        }
    }
        
    private void isFirstNameValid(String firstName) {
        if(!firstName.matches("[A-Z][a-z]+")) {
            throw new IllegalArgumentException("Incorrect first name entered.");
        } 
    }

    private void isMonthValid (LocalDateTime month) {
        if(!months.contains(month)) {
            throw new IllegalArgumentException("Incorrect name of the month.");
        }
    }

    private void isLastNameValid (String lastName) {
        if(!lastName.matches("[A-Z][a-z]+")) {
            throw new IllegalArgumentException("Incorrect last name entered.");
        }
    }

    private void isPhoneNumberValid (String phoneNumber) {
        if(!(phoneNumber.length() == 9) || !phoneNumber.matches("[0-9]+")) {
            throw new IllegalArgumentException("Incorrect last name entered.");
        }    
    }
}
