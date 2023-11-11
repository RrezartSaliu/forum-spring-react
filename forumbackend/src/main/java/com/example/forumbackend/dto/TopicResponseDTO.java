package com.example.forumbackend.dto;


import java.util.Date;

public class TopicResponseDTO {
    private Long topicId;
    private String title;
    private String body;
    private ForumUserResponseDTO author;
    private Integer likes;
    private Date creationDate;

    public TopicResponseDTO(Long topicId, String title, String body, ForumUserResponseDTO author, Integer likes, Date creationDate) {
        this.topicId = topicId;
        this.title = title;
        this.body = body;
        this.author = author;
        this.likes = likes;
        this.creationDate = creationDate;
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
