package com.example.forumbackend.service;

import com.example.forumbackend.model.ForumUser;
import com.example.forumbackend.model.Topic;
import java.util.List;

public interface TopicService {
    List<Topic> getAllTopics();
    Topic addNewTopic(Topic topic, ForumUser forumUser);
    Topic findById(Long id);
    Topic deleteTopic(Long id);
    List<Topic> getAllByForumUser (ForumUser forumUser);
    Topic updateTopic(Long id, String title, String body);
}
