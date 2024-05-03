package com.example.myapp.repository;

import com.example.myapp.Entity.Model;

import java.util.Optional;

public interface CustomUserRepository {

    Optional<Model> findOneByEmail(String email);
    public Model saveUser(Model model);



}
