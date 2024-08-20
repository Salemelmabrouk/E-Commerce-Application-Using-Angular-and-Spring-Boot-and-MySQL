package com.Myproject.eCom.services.auth;

import com.Myproject.eCom.dto.SignupRequest;
import com.Myproject.eCom.dto.UserDto;

public interface AuthService {
 UserDto createUser(SignupRequest signupRequest);

 Boolean hasUserWithEmail(String email);
}
