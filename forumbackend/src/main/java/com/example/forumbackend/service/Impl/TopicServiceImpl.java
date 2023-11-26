package com.example.forumbackend.service.Impl;

import com.example.forumbackend.model.Category;
import com.example.forumbackend.model.ForumUser;
import com.example.forumbackend.model.Topic;
import com.example.forumbackend.repository.ForumUserRepository;
import com.example.forumbackend.repository.TopicRepository;
import com.example.forumbackend.service.TopicService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TopicServiceImpl implements TopicService {
    private final TopicRepository topicRepository;
    private final ForumUserRepository forumUserRepository;

    public TopicServiceImpl(TopicRepository topicRepository, ForumUserRepository forumUserRepository) {
        this.topicRepository = topicRepository;
        this.forumUserRepository = forumUserRepository;
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

    @Override
    public List<Topic> getAllByCategorySorted(Category category, String order) {

        switch (order){
            case "most-liked": {
                List<Topic> byLikes = topicRepository.getAllByCategoryOrderByLikes(category);
                Collections.reverse(byLikes);
                return byLikes;
            }
            case "oldest": return topicRepository.getAllByCategoryOrderByCreationDate(category);
            case "newest": {
                List<Topic> byDate = topicRepository.getAllByCategoryOrderByCreationDate(category);
                Collections.reverse(byDate);
                return byDate;
            }
        }
        return null;
    }

    @Override
    public Page<Topic> getLatestAuthorActivity(Long forumUserId, Integer page, Integer size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return topicRepository.findAllByAuthorOrderByCreationDateDesc(forumUserRepository.findById(forumUserId).orElseThrow(), pageRequest);

    }

    @Override
    public List<Topic> search(String titleQuery) {
        return topicRepository.findAllByTitleContainingIgnoreCase(titleQuery);
    }

}
