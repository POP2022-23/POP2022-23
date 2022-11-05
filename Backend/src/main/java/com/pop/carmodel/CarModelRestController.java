package com.pop.carmodel;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CarModelRestController {

    @GetMapping("/")
    public String index() {
        return "<h1>teścik agreścik</h1>";
    }
}
