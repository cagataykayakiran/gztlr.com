package com.gztlr.dto;

import com.gztlr.entity.User;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UserLoginResponse {

    private User userInfo;
    private List<String> token;
}
