package com.example.forumbackend.service.Impl;

import com.example.forumbackend.model.Comment;
import com.example.forumbackend.model.Topic;
import com.example.forumbackend.repository.CommentRepository;
import com.example.forumbackend.repository.TopicRepository;
import com.example.forumbackend.service.CommentService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final TopicRepository topicRepository;

    public CommentServiceImpl(CommentRepository commentRepository, TopicRepository topicRepository) {
        this.commentRepository = commentRepository;
        this.topicRepository = topicRepository;
    }

    @Override
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    @Override
    public Comment addNewComment(Comment comment, Long topicId) {
        comment.setComments(new ArrayList<>());
        comment.setCreationDate(new Date());
        comment.setLikes(0);
        comment.setTopic(topicRepository.findById(topicId).orElseThrow());
        return commentRepository.save(comment);
    }

    @Override
    public Comment findById(Long id) {
        return commentRepository.findById(id).orElseThrow();
    }

    @Override
    public Comment deleteComment(Long id) {
        Comment commentToDelete = findById(id);
        commentRepository.delete(commentToDelete);
        return commentToDelete;
    }

    @Override
    public List<Comment> getAllByTopic(Long topicId) {
        Topic topic = topicRepository.findById(topicId).orElseThrow();
        return commentRepository.getAllByTopic(topic);
    }
}
