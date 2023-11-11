package com.example.forumbackend.service.Impl;

import com.example.forumbackend.model.ForumUser;
import com.example.forumbackend.model.exceptions.InvalidArgumentsException;
import com.example.forumbackend.repository.ForumUserRepository;
import com.example.forumbackend.service.AuthenticationService;

public class AuthenticationServiceImpl implements AuthenticationService {
    private final ForumUserRepository forumUserRepository;

    public AuthenticationServiceImpl(ForumUserRepository forumUserRepository) {
        this.forumUserRepository = forumUserRepository;
    }

    @Override
    public ForumUser login(String email, String password) {
        if(email == null || email.isEmpty() || password == null || password.isEmpty())
            throw new InvalidArgumentsException();

        return null;
    }
}
