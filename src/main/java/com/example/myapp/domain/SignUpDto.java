package com.example.myapp.domain;

import com.example.myapp.Entity.Role;
import com.example.myapp.Entity.Model;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignUpDto {

    private String username;
    private String password;
    private String name;
    private String link;

    private List<String> roles = new ArrayList<>();

    public Model toEntity(String encodedPassword, List<String> roles) {

        return Model.builder()
                .userName(username)
                .password(encodedPassword)
                .name(name)
                .link(link)
                .roles(roles)
                .build();
    }
}