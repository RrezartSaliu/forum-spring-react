package com.example.forumbackend.model;
import java.util.Date;
import java.util.List;
import javax.persistence.*;

@Entity
public class Topic {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Column(length = 2500)
    private String body;
    @ManyToOne
    private ForumUser author;
    private Integer likes;
    @OneToMany(fetch = FetchType.EAGER)
    private List<Comment> comments;
    private Date creationDate;
    @Enumerated(EnumType.STRING)
    private Category category;

    public Topic(Long id, String title, ForumUser author, Integer likes, List<Comment> comments, Date creationDate, Category category) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.likes = likes;
        this.comments = comments;
        this.creationDate = creationDate;
        this.category = category;
    }

    public Topic() {

    }


    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public ForumUser getAuthor() {
        return author;
    }

    public void setAuthor(ForumUser author) {
        this.author = author;
    }

    public Integer getLikes() {
        return likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
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
