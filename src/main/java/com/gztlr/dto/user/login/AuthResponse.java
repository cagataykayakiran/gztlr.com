package com.gztlr.dto.user.login;

import com.gztlr.dto.DtoEntity;
import com.gztlr.dto.TokenDto;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AuthResponse implements DtoEntity {

    private DtoEntity user;
    private TokenDto token;
}
