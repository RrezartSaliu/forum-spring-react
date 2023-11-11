package com.example.forumbackend.dto;

import com.example.forumbackend.model.Comment;
import com.example.forumbackend.model.ForumUser;
import com.example.forumbackend.model.Topic;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.Date;
import java.util.List;

public class CommentResponseDTO {
    private Long id;
    private ForumUser author;
    private TopicResponseDTO topic;
    private List<CommentResponseDTO> comments;
    private String commentBody;
    private Integer likes;
    private Date creationDate;

    public CommentResponseDTO(Long id, ForumUser author, TopicResponseDTO topic, List<CommentResponseDTO> comments, String commentBody, Integer likes, Date creationDate) {
        this.id = id;
        this.author = author;
        this.topic = topic;
        this.comments = comments;
        this.commentBody = commentBody;
        this.likes = likes;
        this.creationDate = creationDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ForumUser getAuthor() {
        return author;
    }

    public void setAuthor(ForumUser author) {
        this.author = author;
    }

    public TopicResponseDTO getTopic() {
        return topic;
    }

    public void setTopic(TopicResponseDTO topic) {
        this.topic = topic;
    }

    public List<CommentResponseDTO> getComments() {
        return comments;
    }

    public void setComments(List<CommentResponseDTO> comments) {
        this.comments = comments;
    }

    public String getCommentBody() {
        return commentBody;
    }

    public void setCommentBody(String commentBody) {
        this.commentBody = commentBody;
    }

    public Integer getLikes() {
        return likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }
}
