package com.pop.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "app_user")
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    @Column(name="user_role")
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column(unique = true)
    private String phoneNumber;

    public User(String email, UserRole role, String firstName, String lastName, String phoneNumber) {
        this.email = email;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
    }
}
