package com.example.forumbackend.service;

import com.example.forumbackend.model.Comment;
import com.example.forumbackend.model.Topic;

import java.util.List;

public interface CommentService {
    List<Comment> getAllComments();
    Comment addNewComment(Comment comment, Long topicId);
    Comment findById(Long id);
    Comment deleteComment(Long id);
    List<Comment> getAllByTopic(Long topicId);
}
