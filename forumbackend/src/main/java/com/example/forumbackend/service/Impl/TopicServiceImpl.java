package com.example.forumbackend.service.Impl;

import com.example.forumbackend.model.Category;
import com.example.forumbackend.model.ForumUser;
import com.example.forumbackend.model.Topic;
import com.example.forumbackend.repository.TopicRepository;
import com.example.forumbackend.service.TopicService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class TopicServiceImpl implements TopicService {
    private final TopicRepository topicRepository;

    public TopicServiceImpl(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    @Override
    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }

    @Override
    public Topic addNewTopic(Topic topic, ForumUser forumUser) {
        topic.setAuthor(forumUser);
        topic.setComments(new ArrayList<>());
        return topicRepository.save(topic);
    }

    @Override
    public Topic findById(Long id) {
        return topicRepository.findById(id).orElseThrow();
    }

    @Override
    public Topic deleteTopic(Long id) {
        Topic topicToDelete = findById(id);
        topicRepository.delete(topicToDelete);
        return topicToDelete;
    }

    @Override
    public List<Topic> getAllByForumUser(ForumUser forumUser) {
        return topicRepository.getAllByAuthor(forumUser);
    }

    @Override
    public Topic updateTopic(Long id, String title, String body) {
        Topic topic = this.findById(id);
        topic.setTitle(title);
        topic.setBody(body);
        return topicRepository.save(topic);
    }

    @Override
    public List<Category> getCategories() {
        return Arrays.stream(Category.values()).toList();
    }

    @Override
    public List<Topic> getAllByCategory(Category category) {
        return topicRepository.getAllByCategory(category);
    }


}
