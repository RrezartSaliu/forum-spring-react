package com.example.forumbackend.repository;

import com.example.forumbackend.model.ForumUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForumUserRepository extends JpaRepository<ForumUser, Long> {
    ForumUser findByEmailAddress(String email);
    ForumUser findByEmailAddressAndPassword(String email, String password);
}
