package com.gztlr.entity;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class Token {

    private String access_token;
    private String refresh_token;
    private long expires_in;
}
