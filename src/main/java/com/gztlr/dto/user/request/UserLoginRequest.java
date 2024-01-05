package com.gztlr.dto.user.request;

import lombok.Data;

@Data
public class UserLoginRequest {

    private String username;
    private String password;
}
