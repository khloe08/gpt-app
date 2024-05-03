package com.example.myapp.repository;


import com.example.myapp.Entity.Model;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
public class CustomUserRepositoryImpl implements CustomUserRepository{

    @PersistenceContext
    private EntityManager em;


    public Optional<Model> findOneByEmail(String email) {
        return em.createQuery("select u from User u where u.email = :email", Model.class)
                .setParameter("email", email)
                .getResultList()
                .stream().findAny();
    }


    public Model saveUser(Model model) {
        if (model.getId() == null) {
            em.persist(model);
        } else {
            em.merge(model);
        }
        return model;
    }



}




