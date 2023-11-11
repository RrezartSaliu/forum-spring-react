package com.example.forumbackend.model;


import javax.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "comments")
public class Comment {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne (fetch = FetchType.EAGER)
    private ForumUser author;
    @ManyToOne (fetch = FetchType.EAGER)
    private Topic topic;
    @OneToMany (fetch = FetchType.EAGER)
    private List<Comment> comments;
    @Column (length = 1500)
    private String commentBody;
    private Integer likes;
    private Date creationDate;

    public Comment(Long id, ForumUser author, Topic topic, List<Comment> comments, Integer likes, Date creationDate) {
        this.id = id;
        this.author = author;
        this.topic = topic;
        this.comments = comments;
        this.likes = likes;
        this.creationDate = creationDate;
    }

    public Comment() {

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

    public ForumUser getAuthor() {
        return author;
    }

    public void setAuthor(ForumUser author) {
        this.author = author;
    }

    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
