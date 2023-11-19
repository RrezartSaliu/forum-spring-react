package com.example.forumbackend.dto;

import com.example.forumbackend.model.ForumUser;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.Date;

public class MessageDTO {
    private Date date;
    private String link;
    private String content;
    private ForumUser sender;

    public MessageDTO(Date date, String link, String content, ForumUser sender) {
        this.date = date;
        this.link = link;
        this.content = content;
        this.sender = sender;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
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

    public ForumUser getSender() {
        return sender;
    }

    public void setSender(ForumUser sender) {
        this.sender = sender;
    }
}
