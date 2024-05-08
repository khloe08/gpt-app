package com.example.myapp.domain;

import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

@Component
public class UserRequestMapper {
    public UserDto toDto(OAuth2User oAuth2User) {
        var attributes = oAuth2User.getAttributes();
        return UserDto.builder()
                .username((String) attributes.get("userName"))
                .name((String) attributes.get("name"))
                .link((String) attributes.get("link"))
                .build();
    }
}