package com.gztlr.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserRegisterResponse {

    private String token;
}
