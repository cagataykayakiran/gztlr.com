package com.gztlr.dto.user.request;

import com.gztlr.dto.DtoEntity;
import lombok.Data;

import java.util.Set;

@Data
public class UserRegisterRequest implements DtoEntity {

    private String firstname;
    private String lastname;
    private String username;
    private String password;
}
