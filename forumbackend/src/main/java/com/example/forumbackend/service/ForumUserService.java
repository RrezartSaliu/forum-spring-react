package com.example.forumbackend.service;

import com.example.forumbackend.model.ForumUser;

import java.util.Date;
import java.util.List;

public interface ForumUserService {
    List<ForumUser> getAllForumUsers();
    ForumUser addNewForumUser(ForumUser forumUser);
    ForumUser findById(Long id);
    ForumUser findByEmail(String email);
    ForumUser updateForumUser(Long ForumUserId, String firstName, String lastName, Date dateOfBirth, String bio);
    void likeTopic(Long forumUserId, Long topicId);
    void unlikeTopic(Long forumUserId, Long topicId);
    void sendFriendRequest(Long senderId, Long receiverId);
    void acceptFriendRequest(Long receiverId, Long senderId);
}
