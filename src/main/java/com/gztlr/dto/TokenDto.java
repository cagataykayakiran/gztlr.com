package com.gztlr.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TokenDto implements DtoEntity{

    private String access_token;
    private String refresh_token;
    private long expires_in;
}
