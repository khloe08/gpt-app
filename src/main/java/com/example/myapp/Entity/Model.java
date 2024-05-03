package com.example.myapp.Entity;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;


@Entity
@Data
@Table(name="user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Model implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

   @Column(nullable = false)
    private String userName;
    @Column(nullable = false)
    private String password;

    private String name;


    private String link;

    // 사용자의 역할을 나타내는 필드
//    @Enumerated(EnumType.STRING)
//    private Role role;


    // getters and setters
    public Model update(String name) {
        this.name = name;
        return this;
    }

    @Builder
    public Model(String userName, String password, String name,String link) {
        this.userName = userName;
        this.password = password;
        this.name = name;
        this.link = userName.contains("@naver.com") ? "naver" : "other";
    //    if(role == null){this.role = Role.USER;}
      //  else{this.role = role;}
    }

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    public String getUserName(){
        return this.userName;
    }
    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }


}