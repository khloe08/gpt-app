package com.example.myapp.domain;

import com.example.myapp.Entity.Model;
import lombok.*;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {

    private Long id;
    private String username;
    private String name;
    private String link;

    static public UserDto toDto(Model member) {
        return UserDto.builder()
                .username(member.getUsername())
                .name(member.getName())
                .link(member.getLink())
                .build();
    }

    public Model toEntity() {
        return Model.builder()
                .id(id)
                .userName(username)
                .name(name)
                .link(link)
                .build();
    }
}
