package com.example.forumbackend.service;

import com.example.forumbackend.model.Category;
import com.example.forumbackend.model.ForumUser;
import com.example.forumbackend.model.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TopicService {
    List<Topic> getAllTopics();
    Topic addNewTopic(Topic topic, ForumUser forumUser);
    Topic findById(Long id);
    Topic deleteTopic(Long id);
    List<Topic> getAllByForumUser (ForumUser forumUser);
    Topic updateTopic(Long id, String title, String body);
    List<Category> getCategories();
    List<Topic> getAllByCategory(Category category);
    List<Topic> getAllByCategorySorted (Category category, String order);
    Page<Topic> getLatestAuthorActivity (Long forumUserId, Integer page, Integer size);
    List<Topic> search(String titleQuery);
}
