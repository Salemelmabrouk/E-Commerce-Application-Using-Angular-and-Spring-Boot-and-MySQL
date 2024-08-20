package com.Myproject.eCom.dto;

import com.Myproject.eCom.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private UserRole userRole;
    private String address;

}
