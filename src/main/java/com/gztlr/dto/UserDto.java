package com.gztlr.dto;

import com.gztlr.enums.Role;
import lombok.*;

import java.util.Set;

@Getter @Setter @Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto implements DtoEntity {

    private Long id;
    private String name;
    private String lastname;
    private String username;
}
