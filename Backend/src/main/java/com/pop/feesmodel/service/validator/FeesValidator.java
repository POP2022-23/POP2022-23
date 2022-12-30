package com.pop.feesmodel.service.validator;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class FeesValidator {
    public boolean validate() {
        return false;
    }

    private boolean isEmailValid(String email) {
        return false;
    }

    private boolean isFirstNameValid(String firstName) {
        return false;
    }

    private boolean isFromDateValid (LocalDateTime fromDate) {
        return false;
    }

    private boolean isLastNameValid (String lastName) {
        return false;
    }

    private boolean isPhoneNumberValid (String phoneNumber) {
        return false;
    }

    private boolean isToDateValid (LocalDateTime toDate) {
        return false;
    }
}
