package com.example.myapp.Entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
public enum Role {
    USER("USER", "일반사용자"),
    ADMIN("ADMIN", "운영자");

    private final String key;
    private final String title;

    Role(String key, String title) {
        this.key = key;
        this.title = title;
    }

}
