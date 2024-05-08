package com.example.myapp.repository;

import com.example.myapp.Entity.Model;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Model, Long>,CustomUserRepository {

    Optional<Model> findByUserName(String userName);
    Model save(Model model);


    boolean existsByUserName(String userName);
}
