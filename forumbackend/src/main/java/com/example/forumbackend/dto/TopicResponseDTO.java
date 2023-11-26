package com.example.forumbackend.dto;


import com.example.forumbackend.model.Comment;

import java.util.Date;
import java.util.List;

public class TopicResponseDTO {
    private Long topicId;
    private String title;
    private String body;
    private ForumUserResponseDTO author;
    private Integer likes;
    private Date creationDate;
    private List<Comment> comments;

    public TopicResponseDTO(Long topicId, String title, String body, ForumUserResponseDTO author, Integer likes, Date creationDate, List<Comment> comments) {
        this.topicId = topicId;
        this.title = title;
        this.body = body;
        this.author = author;
        this.likes = likes;
        this.creationDate = creationDate;
        this.comments = comments;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public String getTitle() {
        return title;
    }

    public Long getTopicId() {
        return topicId;
    }

    public void setTopicId(Long topicId) {
        this.topicId = topicId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public ForumUserResponseDTO getAuthor() {
        return author;
    }

    public void setAuthor(ForumUserResponseDTO author) {
        this.author = author;
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
