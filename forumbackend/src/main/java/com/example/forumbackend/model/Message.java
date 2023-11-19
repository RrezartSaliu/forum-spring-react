package com.example.forumbackend.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Message {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date date;
    private String link;
    @Column(length = 255)
    private String content;
    @ManyToOne
    @JoinColumn(name = "sender_id")
    private ForumUser sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private ForumUser receiver;

    public Message(String link, String content) {
        this.link = link;
        this.content = content;
    }

    public Message() {

    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public ForumUser getSender() {
        return sender;
    }

    public void setSender(ForumUser sender) {
        this.sender = sender;
    }

    public ForumUser getReceiver() {
        return receiver;
    }

    public void setReceiver(ForumUser receiver) {
        this.receiver = receiver;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
