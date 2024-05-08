package com.example.myapp.domain;

import com.example.myapp.Entity.Model;
import lombok.Getter;
@Getter
public class SessionUser {   //인증된 사용자 정보를 저장하는 클래스, User 클래스 내에 세션 정보를 가질 수 없는 이유

    private String username;
    private String name;


    public SessionUser(Model model){
        this.username = model.getUsername();
        this.name = model.getName();

    }


}