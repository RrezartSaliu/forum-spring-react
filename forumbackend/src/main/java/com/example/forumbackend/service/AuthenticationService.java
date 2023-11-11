package com.example.forumbackend.service;

import com.example.forumbackend.model.ForumUser;

public interface AuthenticationService {
    ForumUser login(String email, String password);
}
